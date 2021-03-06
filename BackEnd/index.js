const express = require('express') //IMPORTANDO A FRAMEORK EXPRESS
const bodyparser = require('body-parser') //IMPORTANDO O BODY-PARSER
const app = express() //ATRIBUINDO O EXPRESS A VARIAVEL APP
const port = 5000; //DEFININDO EM QUAL PORTA IRA RODAR O SERVIDOR
const axios = require('axios');
const cors = require('cors');
const { json } = require('express/lib/response');
//const { query } = require('express');



app.use(cors())
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json()) //TRANSFORMA OS DADOS DO BODY EM JSON
app.use(express.json()); //APLICANDO EXPRESS NO PROJETO

// CONEXÃO COM BANCO DE DADOS
async function conecta() {
  if ( global.conexao && global.conexao.state !== 'disconnected' ) {
    return global.conexao;
  }

  const mysql = require('mysql2/promise'); //IMPORTANDO MYSQL2 PARA O PROJETO
  const conexao = await mysql.createConnection('mysql://root:@localhost:3306/mydb'); //DEFININDO ROTA DO BANCO DE DADOS
  console.log('Mysql conectado.');

  global.conexao = conexao;
  return conexao;
}

  
app.post('/login', async (req, res)=>{
    const conn = await conecta(); //CONECTANDO AO BANDO DE DADOS
    const {email, senha} = req.body; // RECEBENDO INFORMAÇÕES DA TELA DE LOGIN

    //SELECIONANDO TABELA CLIENTE E VERIFICANDO SE EXISTE EMAIL E SENHA INFORMADOS E ATRIBUINDO DADOS DO USUARIO A VARIAVEL SESSION CASO A CONSULTA ENCONTRE RESULTADOS
    var [session] = await conn.query(`SELECT * FROM cliente WHERE email = '${email}' and senha = '${senha}' `)
  
  
//PERCORRENDO O VETOR SESSION E ATRIBUINDO SEUS DADOS A VARIAVEL SESSAO
  for(let i = 0; i < session.length; i++) {

    if(session[i].email == email  && session[i].senha == senha){
     
       sessao = session[i]
    
       //ENVIANDO DADOS DO USUARIO PARA A ROTA LOGIN
       app.get('/login', async (req,res)=>{
        return res.json( sessao)

       })
      
    }console.log("logado")
     return res.redirect('http://localhost:3000/') && res.json({message:"ok"})
    

  } 

})

//ENCONTRA E ARMAZENA OS DADOS ENVIADOS A ROTA GET LOGIN
async function logado(){
  try {

    //ATRIBUINDO VALORES DA ROTA A VARIAVEL DATA
    const {data} = await axios('http://localhost:5000/login');
    return data;
        
  } catch (error) {
      console.log('erro')
    }

}//

// TESTE DE CONEXÃO SERVIDOR
app.get('/', async function (req, res) {
    const conn = conecta(); //CONECTANDO AO BANDO DE DADOS A ROTA TESTE
    res.send('servidor rodando');
  
});


// CONSULTA TODOS OS USUARIOS
app.get('/user', async function (req, res) {
    const conn = await conecta();//CONECTANDO AO BANDO DE DADOS

  //SELECIONANDO TODOS OS CLIENTES 
    const [cliente] = await conn.query(`SELECT * FROM cliente `)

    //ENVIANDO DADOS DOS CLIENTES EM JSON PARA A ROTA GET USER
    return res.json( cliente)
    
});

// CONSULTA USUARIOS POR ID
app.get('/user/logado',async (req, res)=>{
    const sessao = await logado();
    const id = sessao.idcliente;
    const conn  = await conecta(); //CONECTANDO AO BANDO DE DADOS
    //SELECIONA CLIENTE REFERENTE AO ID INFORMADO
    const [cliente] = await conn.query(`SELECT * FROM cliente WHERE idcliente = '${id}'`)
    //ENVIANDO DADOS DO CLIENTE EM JSON PARA A ROTA GET USER/ID
    return res.json( cliente)

})
// CADASTRA UM USUARIO
app.post('/user/cadastro' , async (req, res)=> {
  
    const conn = await conecta();//CONECTANDO AO BANDO DE DADOS


    //RECEBENDO VALORES INFORMAS NO BODY(FRONTEND) REFERENCIADOS COM NAME PARA SEREM RECEBIDOS COM req.body.campoDesejao
    const {nome, cpf, telefone, sexo, email, senha, usuario, imagem_cliente} = req.body

    //INSERE DADOS NA TABELA CLIENTE
    const sql = `INSERT INTO cliente(nome, cpf, telefone, sexo, email, usuario, senha, imagem_cliente) VALUES('${nome}','${cpf}','${telefone}','${sexo}','${email}','${usuario}','${senha}','${imagem_cliente}')`;
    
   
    //GRAVA OS DADOS NA RESPECTIVAS TABELAS CLIENTE E CLIENTE_END
    return await conn.query(sql) && res.redirect('http://localhost:3000/login') &&  res.json({message:"CADASTRO EFETUADO"})            
    
});

//CADASTRA O ENDEREÇO DO USUARIO
app.post('/user/cadastro/endereco' , async (req, res)=> {
  
  const conn = await conecta();//CONECTANDO AO BANDO DE DADOS
  const sessao = await logado();
  const id = sessao.idcliente;

  //RECEBENDO VALORES INFORMAS NO BODY(FRONTEND) REFERENCIADOS COM NAME PARA SEREM RECEBIDOS COM req.body.campoDesejao
  const {numero, cidade, uf, cep, rua, bairro } = req.body

//INSERE DADOS NA TABELA CLIENTE _END
  const sql = `INSERT INTO end_cliente(cidade,uf, cep, bairro, numero, rua, cliente_id) VALUES('${cidade}','${uf}','${cep}','${bairro}','${numero}','${rua}', '${id}')`;
  
  //GRAVA OS DADOS NA TABELA CLIENTE_END
  return await conn.query(sql) && res.redirect('http://localhost:3000/') && res.json({message:"CADASTRO EFETUADO"})            
  
});

// ALTERA UM USUARIO
app.post('/user/:id' , async (req, res)=> {
    const {id} = req.params
    const conn = await conecta(); //CONECTANDO AO BANDO DE DADOS

    //RECEBENDO VALORES INFORMAS NO BODY(FRONTEND) REFERENCIADOS COM NAME PARA SEREM RECEBIDOS COM req.body.campoDesejao
    const {nome, cpf, telefone, sexo, email, senha, usuario, numero, cidade, uf, cep, rua, bairro } = req.body
    //SELECIONA  TABELA CLIENTE PARA ATUALIZAR USUARIO
    const sql = `UPDATE cliente SET nome = '${nome}', cpf ='${cpf}', telefone = '${telefone}', sexo = '${sexo}', email = '${email}', usuario = '${usuario}', senha = '${senha}' WHERE idcliente = '${id}'`;

    //SELECIONA  TABELA END_CLIENTE PARA ATUALIZAR ENDEREÇO DE USUARIO SELECIONADO
    const sql2 = `UPDATE end_cliente SET cidade = '${cidade}', uf = '${uf}', cep = '${cep}', bairro = '${bairro}', numero = '${numero}', rua = '${rua}' WHERE cliente_idcliente = '${id}'`;
            
    return await conn.query(sql) && conn.query(sql2) && res.json({message:"Alteração bem suscessedida"})


});

// DELETA UM USUARIO
app.delete('/user/:id' , async (req, res)=> {
    const {id} = req.params
    const conn = await conecta(); //CONECTANDO AO BANDO DE DADOS

    //SELECIONA USUARIO A SER DELETADO
    const sql = `DELETE FROM cliente WHERE idcliente = '${id}'`;
    //EXECUTA O DELETE NA TABELA CLIENTE
    return await conn.query(sql) && res.json({mensagem: "Cliente excluido com sucesso" })
    
});

//METODOS VEICULO______________________________

//CONSULTA VEICULO DO USUARIO LOCAL
app.get('/user/veiculo/consulta', async function (req, res) {
    const conn = await conecta();//CONECTANDO AO BANDO DE DADOS
    const sessao = await logado();//IMPORTANDO DADOS DO USUARIO LOGADO
    const id = sessao.idcliente;//ATRIBUINDO O ID DO USUARIO LOGADO A VARIAVEL ID

    //SELECIONA OS VEICULOS CORRESPONDENTES AO USUARIO LOGADO
    const [veiculo] = await conn.query(`SELECT * FROM veiculo where cliente_idcliente = '${id}' `)
    //ENVIA OS DADOS PARA A ROTA GET USER/VEICULO/CONSULTA
    return res.json( veiculo)
    
});
// CADASTRA UM VEICULO
app.post('/user/veiculo/cadastro' , async (req, res)=> {
    const conn = await conecta(); //CONECTANDO AO BANDO DE DADOS
    const sessao = await logado(); //IMPORTANDO DADOS DO USUARIO LOGADO
    const id = sessao.idcliente; //ATRIBUINDO O ID DO USUARIO LOGADO A VARIAVEL ID

    //RECEBENDO VALORES INFORMAS NO BODY(FRONTEND) REFERENCIADOS COM NAME PARA SEREM RECEBIDOS COM req.body.campoDesejado
    const {veiculo, marca, ano, placa, modelo, imagem} = req.body
    
    //SELECIONA  TABELA VEICULO PARA INSERÇÃO DE NOVO VEICULO DO USUARIO
    const sql = `INSERT INTO veiculo(veiculo, marca, ano, placa, modelo, imagem, cliente_idcliente) VALUES('${veiculo}','${marca}','${ano}','${placa}','${modelo}','${imagem}','${id}')`;
    //EXECUTA O UPDATE NA TABELA VEICULO
    return await conn.query(sql) && res.redirect('http://localhost:3000/veiculos') && res.json({mensagem: "Cadastro de Veiculo Efetuado!" });
            

});

//ALTERA UM VEICULO REFERENTE AO USUARIO 
app.get('/user/veiculo/alterar' , async (req, res)=> {
  
  return await res.redirect('http://localhost:3000/alterarVeiculo')

});

app.post('/user/veiculo/atualiza' , async (req, res)=> {
    const conn = await conecta(); //CONECTANDO AO BANDO DE DADOS
    const sessao = await logado(); //IMPORTANDO DADOS DO USUARIO LOGADO
    const id = sessao.idcliente; //ATRIBUINDO O ID DO USUARIO LOGADO A VARIAVEL ID

    //RECEBENDO VALORES INFORMAS NO BODY(FRONTEND) REFERENCIADOS COM NAME PARA SEREM RECEBIDOS COM req.body.campoDesejao
    const {id_veiculo, veiculo, marca, ano, placa, modelo, imagem} = req.body

    //SELECIONA  TABELA VEICULO PARA ALTERAÇÃO DO VEICULO DO USUARIO
    const sql = `UPDATE veiculo SET veiculo = '${veiculo}', marca = '${marca}', ano = '${ano}', placa = '${placa}', modelo = '${modelo}', imagem = '${imagem}' where cliente_idcliente = '${id}' AND id_veiculo = '${id_veiculo}'`;
    console.log(id_veiculo, id)
    //EXECUTA A ALTERAÇÃO NA TABELA VEICULO
    return await conn.query (sql) && res.redirect('http://localhost:3000/veiculos') && res.json({mensagem: "Ateração concluida" });

});

//DELETA UM VEICULO REFERENTE AO USUARIO CADASTRADOe E ID DO VEICULO SELECIONADO
app.post('/user/veiculo/deletar' , async (req, res)=> {
    const conn = await conecta(); //CONECTANDO AO BANDO DE DADOS
    const sessao = await logado(); //IMPORTANDO DADOS DO USUARIO LOGADO
    const id = sessao.idcliente; //ATRIBUINDO O ID DO USUARIO LOGADO A VARIAVEL ID

    const {veiculo} = req.body
    //SELECIONA USUARIO A SER DELETADO
    const sql = `DELETE FROM veiculo WHERE cliente_idcliente = '${id}' and id_veiculo = ${veiculo}`;
    //EXECUTA O DELETE NA TABELA VEICULO
    return await conn.query(sql) && res.redirect('http://localhost:3000/veiculos') && res.json({mensagem: "veiculo excluido com sucesso" });

});


// INFORMA EM QUAL PORTA ESTA RODANDO O SERVIDOR NO CONSOLE DO VISUAL STUDIO
app.listen(port, () => {
    console.log(`Exemplo app node rodando no endereço http://localhost:${port}`);
});

//ROTAS VIAGEM __________________________________

//ENVIA OS VEICULOS PARA A TELA DE CADASTRO PARA O USUARIO SELECIONAR
app.get('/viagem/cadastro', async (req,res)=>{

  conn = await conecta()
  sessao = await logado()
  const id = sessao.idcliente;
  const transport = await conn.query(`SELECT * FROM veiculo WHERE cliente_idcliente = '${id}'`)
  
  
  //PERCORRENDO O VETOR TRASNPORT E ATRIBUINDO SEUS DADOS A VARIAVEL SESSAO
    for(let i = 0; i < transport.length; i++) {
       
        transport2 = transport[i]
        return res.json(transport2)
        
      }
    
})


//listar viagem
app.get('/viagem/exibir', async (req,res)=>{

  conn = await conecta()
  sessao = await logado()
  const id = sessao.idcliente;

  const [viagem] = await conn.query(` 
  select horario, data,espaco, kg_max, valor_km, id_viagem,
  veiculo, marca,imagem, ano, modelo, placa, id_veiculo,
  cidade_origem,
  cidade_destino, 
  nome, telefone, email from viagem vi
inner join veiculo ve on vi.veiculo_id_veiculo = ve.id_veiculo
inner join cliente cl on vi.viagem_idcliente = cl.idcliente
where vi.viagem_idcliente = '${id}'`);
  
console.log(viagem)
  
   

   return await res.json(viagem)  
  
})


//CADASTRA UMA VIAGEM
app.post('/viagem/cadastro' , async (req, res)=> {
  
  const conn = await conecta();//CONECTANDO AO BANDO DE DADOS
  const sessao = await logado(); //IMPORTANDO DADOS DO USUARIO LOGADO
  const id = sessao.idcliente; //ATRIBUINDO O ID DO USUARIO LOGADO A VARIAVEL ID

  //RECEBENDO VALORES INFORMAS NO BODY(FRONTEND) REFERENCIADOS COM NAME PARA SEREM RECEBIDOS COM req.body.campoDesejao
  const {horario_partida, data_partida, kg_max, espaco, km_percorrido,valor_km, veiculo, cidade_origem, cidade_destino} = req.body //tabela viagem

console.log(horario_partida, data_partida, kg_max, espaco, km_percorrido,valor_km, veiculo, cidade_origem, cidade_destino)
  //INSERE DADOS NA TABELA VIAGEM
  const sql = `INSERT INTO viagem(viagem_idcliente, horario, data, espaco, kg_max, valor_km, distancia_perc, veiculo_id_veiculo, cidade_origem, cidade_destino) VALUES('${id}','${horario_partida}','${data_partida}','${espaco}','${kg_max}','${valor_km}','${km_percorrido}','${veiculo}','${cidade_origem}','${cidade_destino}')`;

  //GRAVA OS DADOS NA RESPECTIVAS TABELAS CLIENTE E CLIENTE_END
  return await conn.query(sql) && res.redirect('http://localhost:3000/') && res.json({message:"CADASTRO EFETUADO"})            

});


//CADASTRA ORIGEM E DESTINO DA VIAGEM
app.post('/user/viagem/deletar' , async (req, res)=> {
  const conn = await conecta(); //CONECTANDO AO BANDO DE DADOS
  const sessao = await logado(); //IMPORTANDO DADOS DO USUARIO LOGADO
  const id = sessao.idcliente; //ATRIBUINDO O ID DO USUARIO LOGADO A VARIAVEL ID

  const {viagem} = req.body
  //SELECIONA VIAGEM A SER DELETADA
  const sql = `DELETE FROM viagem WHERE viagem_idcliente = '${id}' and id_viagem = ${viagem}`;
  //EXECUTA O DELETE NA TABELA VIAGEM
  return await conn.query(sql) && res.redirect('http://localhost:3000/') && res.json({mensagem: "viagem excluida com sucesso" });

});
//
// app.get('/viagem/alterar' , async (req, res)=> {
  
//   return res.redirect('http://localhost:3000/alterarViagem')
  
// });

//ALTERA VIAGEM
app.post('/viagem/atualiza' , async (req, res)=> {
    //ATRIBUINDO VALORES DA ROTA A VARIAVEL DATA
   
  
  const conn = await conecta();//CONECTANDO AO BANDO DE DADOS
  const sessao = await logado(); //IMPORTANDO DADOS DO USUARIO LOGADO
  const id = sessao.idcliente; //ATRIBUINDO O ID DO USUARIO LOGADO A VARIAVEL ID

  //RECEBENDO VALORES INFORMAS NO BODY(FRONTEND) REFERENCIADOS COM NAME PARA SEREM RECEBIDOS COM req.body.campoDesejao
  const {viagem, horario, data, kg_max, espaco, km_percorrido,valor_km, veiculo, cidade_origem, cidade_destino} = req.body //tabela viagem

console.log(horario, data, kg_max, espaco, km_percorrido,valor_km, veiculo, cidade_origem, cidade_destino)
  //INSERE DADOS NA TABELA VIAGEM
  const sql = `UPDATE viagem SET horario = '${horario}', data = '${data}', espaco = '${espaco}', kg_max = '${kg_max}', valor_km = '${valor_km}', distancia_perc = '${km_percorrido}', veiculo_id_veiculo = '${veiculo}', cidade_origem = '${cidade_origem}', cidade_destino = '${cidade_destino}' where viagem_idcliente = '${id}' AND id_viagem = '${viagem}'`;

  //GRAVA OS DADOS NA RESPECTIVAS TABELAS CLIENTE E CLIENTE_END
  return await conn.query(sql) && res.redirect('http://localhost:3000/') && res.json({message:"CADASTRO EFETUADO"})            

});

// app.post('/viagemid', async (req,res)=> {
//   const {viagem} = req.body;
  // const viagem = 12
  // app.get('/viagemid2', (req,res)=>{
  //   const viagem2 = {
  //     id: viagem
  //   }
  //   console.log(viagem2)
  //   return res.json(viagem2) && res.redirect('http://localhost:3000/alterarViagem')
  // })
  // return res.json({message:"ok"})

// })