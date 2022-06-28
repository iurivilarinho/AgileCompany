import Navbar from "../layout/Navbar"
import styles from "./styles/Viagens.module.css"
import Card from "../layout/Card"

import {useState, useEffect} from "react"
function Viagens(){
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
        <Navbar/>

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
            </div> 
            </Card> 
            </div>   
        ))}
        </div> 
                
        </>

    )
}

export default Viagens