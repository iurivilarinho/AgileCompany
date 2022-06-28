import styles from "./styles/AlterarVeiculo.module.css"
import {useState, useEffect} from "react"
import { FaTruck, FaCalendarAlt, FaCamera} from "react-icons/fa"
import NavbarInter from "../layout/NavbarInter";
import Card from "../layout/Card";
import Globais from "../Globais";
function AlterarVeiculo(){
    const [veiculo, setVeiculo] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/user/veiculo/consulta", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((resp) => resp.json())
    .then((data) => {
        setVeiculo (data)
        console.log(data)
    })
    .catch((err) => console.log(err))
    },[])
    return(
        <>
        <NavbarInter/>
        <Card customClass='cardDarkGray'>
        <div className={styles.cardRegister}>
        <h2 className={styles.titulo}>Alterar Veículo</h2>
        <form action="http://localhost:5000/user/veiculo/atualiza" method="post">
        <div className={styles.linha}>
            <div className={styles.item}>
                <FaTruck/>
                <input type="text" name="veiculo" placeholder="Tipo veiculo" required/>
            </div>
            <div className={styles.item}>
                <FaTruck/>
                <input type="text" name="marca" placeholder="Marca" required/>
            </div>
            <div className={styles.item}>
                <FaTruck/>
                <input type="text" name="modelo" placeholder="Modelo" required/>
            </div>
            </div>

            <div className={styles.linha}>
            <div className={styles.item}>
                <FaCalendarAlt/>
                <input type="number" name="ano" placeholder="Ano" required/>
            </div>
            <div className={styles.item}>
                <FaTruck/>
                <input type="text" name="placa" placeholder="Placa" required/>
            </div>
            <div className={styles.item}>
                <FaCamera/>
                <input type="url" name="imagem" placeholder="Url da Imagem" required/>
            </div>
            </div>
            <div className={styles.item}>
            <label>Selecione um veiculo:</label>
            <select name="id_veiculo">
            <option value="" selected disabled >Selecione</option>
            {veiculo.map((transporte) => (
                    <option value={transporte.id_veiculo} key={transporte.id_veiculo}>{transporte.veiculo}</option>
                
           ))}
           </select>
           </div>
            <div className={styles.register}>
                <input type="submit"  value="Alterar"/>
            </div>
           
            
            
        </form>       
        </div>
        </Card>
        
        </>
    )
}
export default AlterarVeiculo