import NavbarInter from "../layout/NavbarInter"
import styles from "./styles/Home.module.css"
import Card from "../layout/Card"
import { Link } from "react-router-dom"

import {useState, useEffect} from "react"
function Home(){
    const [viagens, setViagens] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/viagem/exibir", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((resp) => resp.json())
    .then((data) => {
        setViagens (data)
    })
    .catch((err) => console.log(err))
    },[])

    
    return(
        <>
        <NavbarInter/>
        <div className={styles.submenu}>
    
        <Link to='/alterarViagem'>Alterar Viagem</Link>
        </div>
        <div className={styles.content}>
        {viagens.map((descricao) => (
            <div className={styles.custom}>
            <Card customClass='cardDarkGray' key={descricao.id_viagem}>
            <div className={styles.about}>
            <img src={descricao.imagem} alt='veiculo'/>
            <div className={styles.description}>
            <p><span> Veiculo: </span>{descricao.veiculo}<span> - Ano: </span>{descricao.ano}</p>
            <p><span> Saindo de: </span>{descricao.cidade_origem}</p>
            <p><span> Para: </span>{descricao.cidade_destino}</p>
            <p><span> Data: </span>{descricao.data}<span> Horário: </span>{descricao.horario}</p>
            <p><span> Valor km: </span>{descricao.valor_km}<span> Reais</span></p>
            <p><span> Metros: </span>{descricao.espaco}<span> m² - Peso: </span>{descricao.kg_max} Kg</p>
            <div className={styles.user}>
            <p><span> Nome: </span>{descricao.nome}<span> Telefone: </span>{descricao.telefone}</p>
            </div>
            </div> 


        <div className={styles.options}>
        <form action="http://localhost:5000/user/viagem/deletar" method="POST">
            <input value={descricao.id_viagem} name="viagem"></input>
            <button type="submit" href="#" class="btn btn-primary">Deletar</button>
        </form> 

        
        {/* <form action="http://localhost:5000/viagem/alterar" method="GET">
            
            
            <button type="submit" href="#" class="btn btn-primary">Alterar</button>
        </form> */}

        </div>
 
            </div> 
            </Card> 
            </div>   
        ))}
       

        </div> 
                
        </>

    )
}

export default Home