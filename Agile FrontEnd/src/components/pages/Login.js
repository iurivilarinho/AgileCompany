//css
import styles from "./styles/Login.module.css"
//assets
import logo from "../../assets/logo.png"
//componentes
import { Link } from "react-router-dom"
import {FaUser, FaLock} from "react-icons/fa"
import Card from "../layout/Card"


function Login(){
    return(
        <Card customClass='cardRed'>
        <div className={styles.cardImage}>
        <div className={styles.imageBackground}>
        <img src={logo} alt="Agile Company"></img>
        </div>
        </div>
        <div className={styles.cardLogin}>
            <h2 className={styles.titulo}>Bem Vindo de Volta!</h2>
            <p className={styles.subtitulo}>Acesse sua conta agora mesmo.</p>
            <form action="http://localhost:5000/login" method="post" >
                <div className={styles.item}>
                    <FaUser/>
                    <input type="text" name="email" placeholder="Usuário"  required></input>
                </div>
                <div className={styles.item}>
                    <FaLock/>
                    <input type="password" name="senha" placeholder="Senha"  required></input>
                </div>
                <div className={styles.sign}>
                    <input type="submit"  value="Entrar"></input> 
                </div>
                    <p className={styles.quest}>Não tem cadastro? <span><Link to="/cadastro">Cadastre-se</Link></span>
                     </p>
            </form>
        </div>
        
        </Card>
        
    )}

export default Login