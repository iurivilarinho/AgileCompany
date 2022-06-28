import {Link} from "react-router-dom"
import logo from "../../assets/logo.png"
import styles from "./styles/Navbar.module.css"

function Navbar(){
    return(
    <nav className={styles.nav}>
    <Link to='/viagens'><img src={logo} alt="Agile Company"></img></Link>
    <ul className={styles.list}>
    <li className={styles.item}><Link to='/viagens'>Home</Link></li>
    <li className={styles.item}><Link to='/login'>Login</Link></li>
    <li className={styles.item}><Link to='/cadastro'>Cadastre-se</Link></li>
    </ul>
    </nav>
    )}

export default Navbar