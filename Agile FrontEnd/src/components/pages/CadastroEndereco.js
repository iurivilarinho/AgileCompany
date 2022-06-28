import styles from "./styles/CadastroEndereco.module.css"
import {FaMap, FaRoad, FaSortNumericDown, FaStreetView, FaCity} from "react-icons/fa"
import Card from "../layout/Card"
import { useState, useEffect } from "react"
import NavbarInter from "../layout/NavbarInter";

function CadastroEndreco (){
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");

    // listagem de estados
    const [estados, setEstados] = useState([])

    useEffect(() => {
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((resp) => resp.json())
    .then((data) => {
        setEstados (data)
    })
    .catch((err) => console.log(err))
    },[])

    //viacep autocomplete
    
    const [cep, setCep] = useState([])

    const checkCep = (e) => {
        const cep = e.target.value.replace(/\D/g, '')
        console.log(cep)
        fetch(`https://viacep.com.br/ws/${cep}/json/`).then((resp) => resp.json())
        .then((data) =>{
            setCep(data)
            console.log(data)
        })
        .catch((err) => console.log(err))
    }

    return(
        <>
        <NavbarInter/>
        <Card customClass='cardDarkGray'>
        <div className={styles.cardRegister}>
        <h2 className={styles.titulo}>Cadastre seu Endereço</h2>
        <form action="http://localhost:5000/user/cadastro/endereco" method="post">
        <div className={styles.linha}>
            <div className={styles.item}>
                <FaMap/>
                <input type="text" name="cep" placeholder="Cep" onBlur={checkCep} value={cep.cep} onChange={(e) => setCep(e.target.value)} required/>
            </div>
            <div className={styles.item}>
                <FaRoad/>
                <input type="text" name="rua" placeholder="Rua" value={cep.logradouro} onChange={(e) => setRua(e.target.value)} required/>
            </div>
            <div className={styles.item}>
                <FaSortNumericDown/>
                <input type="number" name="numero" placeholder="Número" required/>
            </div>
            </div>

            <div className={styles.linha}>
            <div className={styles.item}>
                <FaStreetView/>
                <input type="text" name="bairro" placeholder="Bairro" value={cep.bairro} onChange={(e) => setBairro(e.target.value)} required/>
            </div>
            <div className={styles.item}>
                <FaCity/>
                <input type="city" name="cidade" placeholder="Cidade" value={cep.localidade} onChange={(e) => setCidade(e.target.value)} required/>
            </div>
            <div className={styles.item}>
                <FaMap/>
                <label>UF:</label>
                <select name="uf" id="uf" required>
                <option>{cep.uf}</option>
                {estados.map((option) => (
                    <option value={option.id} key={option.id}>{option.sigla} </option>
                ))}
                </select>
            </div>
            </div>

            <div className={styles.register}>
                <input type="submit"  value="Cadastrar"/>
            </div>
        </form>    
        </div>
        
        </Card>
        </>
        
    )
}

export default CadastroEndreco