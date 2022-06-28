import { useState, useEffect } from "react"

import Card from "../layout/Card"
import SubmitButton from "../form/SubmitButton"
import styles from "./styles/AlterarViagem.module.css"
import NavbarInter from "../layout/NavbarInter"
import {FaCity, FaTruck, FaMoneyBill, FaRoad, FaTape, FaWeightHanging} from "react-icons/fa"

function AlterarViagem(){
    //CONSOME A API DE EXIBIR VIAGEM

    const [indentifica, setIdentifica] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/viagem/exibir", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((resp) => resp.json())
    .then((data) => {
        setIdentifica (data)
    })
    .catch((err) => console.log(err))
    },[])

    //CONSOME A API DE CONSULTA DE VEICULO
    const [veiculos, setVeiculos] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/user/veiculo/consulta", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((resp) => resp.json())
    .then((data) => {
        setVeiculos (data)
    })
    .catch((err) => console.log(err))
    },[])
    
    return(
        <>
        <NavbarInter/>
        <Card customClass='cardDarkGray'>
        <div className={styles.cardRegister}>
        <h2 className={styles.titulo}>Alterar Viagem</h2>
        <form action="http://localhost:5000/viagem/atualiza" method="post">
            <div className={styles.linha}>
            <div className={styles.item}>
                <FaCity/>
                <input type="text" name="cidade_origem" placeholder="Cidade de Partida" required/>
            </div>
            <div className={styles.item}>
                <FaCity/>
                <input type="text" name="cidade_destino" placeholder="Cidade de Destino" required/>
            </div>
            </div>
           
            <div className={styles.linha}>
            <div className={styles.item}>
            <FaWeightHanging/>
                <input type="text" name="kg_max" placeholder="Peso Máximo" required/>
            </div>
            <div className={styles.item}>
            <FaTape/>
                <input type="text" name="espaco"  placeholder="Metros Disponíveis" required/>
            </div>
            </div>

            <div className={styles.linha}>
            <div className={styles.item}>
            <FaRoad/>
                <input type="number" name="km_percorrido" placeholder="KM que será percorrido" required/>
            </div>
            <div className={styles.item}>
            <FaMoneyBill/>
                <input type="number" name="valor_km"  placeholder="Valor por Km" required/>
            </div>
            </div>

            <div className={styles.linha}>
            <div className={styles.item}>
                <label>Horário de Saida:</label>
                <input type="time" name="horario" min='00:00' max='23:59' required/>
            </div>
            <div className={styles.item}>
            <label>Data de Saida:</label>
                <input type="date" name="data" required/>
            </div>
            </div>
            <div className={styles.item}>
            <FaTruck/>
            <label>Selecione o Veículo:</label>
           <select name="veiculo">
            <option value="" selected disabled >Selecione</option>
            {veiculos.map((selecionado) => (
                 <option value={selecionado.id_veiculo} key={selecionado.id_veiculo}>{selecionado.veiculo}</option>
               
            ))}
            </select>
            </div>
            <div className={styles.item}>
            <FaRoad/>
            <label>Selecione uma viagem:</label>
            <select name="viagem">
            <option value="" selected disabled >Selecione</option>
            {indentifica.map((selecionado) => (
                    <option value={selecionado.id_viagem} key={selecionado.id_viagem}>{selecionado.cidade_origem} para {selecionado.cidade_destino}</option>
                
           ))}
           </select>
            
                </div>
        <SubmitButton text='Alterar'/>
        </form>
    </div>
        </Card>
        </>
        
    )}

export default AlterarViagem