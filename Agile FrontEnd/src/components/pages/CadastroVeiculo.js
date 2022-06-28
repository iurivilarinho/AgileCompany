import styles from "./styles/CadastroVeiculo.module.css"

import { FaTruck, FaCalendarAlt, FaCamera} from "react-icons/fa"
import NavbarInter from "../layout/NavbarInter";
import Card from "../layout/Card";

function CadastroVeiculo(){
    return(
        <>
        <NavbarInter/>
        <Card customClass='cardDarkGray'>
        <div className={styles.cardRegister}>
        <h2 className={styles.titulo}>Cadastre seu Veículo</h2>
        <form action="http://localhost:5000/user/veiculo/cadastro" method="post">
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

            <div className={styles.register}>
                <input type="submit"  value="Cadastrar"/>
            </div>
            
        </form>       
        </div>
        </Card>
        
        </>
    )
}
export default CadastroVeiculo