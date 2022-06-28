//css
import styles from "./styles/Cadastro.module.css"
//componentes
import {FaUser, FaLock, FaVenusMars, FaIdCard, FaPhoneAlt, FaEnvelopeOpenText, FaCamera} from "react-icons/fa"
import Card from "../layout/Card"
import Navbar from "../layout/Navbar"

function Cadastro(){
    return(
        // retorna os valores dos campos
        <>
        <Navbar/>
        <Card customClass='cardDarkGray'>
        <div className={styles.cardRegister}>
        <h2 className={styles.titulo}>Cadastre-se</h2>
        <form action="http://localhost:5000/user/cadastro" method="post">
        <div className={styles.linha}>
            <div className={styles.item}>
                <FaUser/>
                <input type="text" name="nome" placeholder="Nome Completo" required/>
            </div>
            <div className={styles.item}>
                <FaUser/>
                <input type="text" name="usuario" placeholder="Usuário" required/>
            </div>
            </div>

            <div className={styles.linha}>
            <div className={styles.item}>
            <FaVenusMars/>
                <label>Sexo:</label>
                <select id="sexo" name="sexo" required>
                <option value="" selected disabled >Selecione</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                </select>
            </div>
            <div className={styles.item}>
                <FaIdCard/>
                <input type="text" name="cpf" placeholder="Cpf" required/>
            </div>
            <div className={styles.item}>
                <FaPhoneAlt/>
                <input type="tel" name="telefone" placeholder="Telefone" required/>
            </div>
            </div>

            <div className={styles.linha}>
            <div className={styles.item}>
                <FaEnvelopeOpenText/>
                <input type="email" name="email" placeholder="Email" required/>
            </div>
            <div className={styles.item}>
                <FaLock/>
                <input type="password" name="senha" placeholder="Senha" required/>
            </div>
            </div>
            <div className={styles.item}>
                <FaCamera/>
                <input type="url" name="imagem_cliente" placeholder="Url da Imagem" />
            </div>

            <div className={styles.register}>
            <input type="submit"  value="Cadastrar"/>
            </div>

        </form>
    </div>
    </Card>
        </>
        
        
        
    )}

export default Cadastro