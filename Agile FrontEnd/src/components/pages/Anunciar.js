import { useState, useEffect } from "react"

import Card from "../layout/Card"
import SubmitButton from "../form/SubmitButton"
import styles from "./styles/Anunciar.module.css"

import {FaCity, FaTruck, FaMoneyBill, FaRoad, FaTape, FaWeightHanging} from "react-icons/fa"
import NavbarInter from "../layout/NavbarInter"

function Anunciar(){

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
        <h2 className={styles.titulo}>Anunciar Frete</h2>
        <form action="http://localhost:5000/viagem/cadastro" method="post">
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
                <input type="number" name="kg_max" placeholder="Peso Máximo" required/>
            </div>
            <div className={styles.item}>
            <FaTape/>
                <input type="number" name="espaco"  placeholder="Metros Disponíveis" required/>
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
                <input type="time" name="horario_partida" min='00:00' max='23:59' required/>
            </div>
            <div className={styles.item}>
            <label>Data de Saida:</label>
                <input type="date" name="data_partida" required/>
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
        <SubmitButton text='Anunciar'/>
        </form>
    </div>
        </Card>
        </>
        
    )}

export default Anunciar