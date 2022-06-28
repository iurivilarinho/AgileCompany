import {Link} from "react-router-dom"
import logo from "../../assets/logo.png"
import styles from "./styles/NavbarInter.module.css"

import {useState, useEffect} from "react"

function NavbarInter(){
    const [logado, setLogado] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/user/logado", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((resp) => resp.json())
    .then((data) => {
        setLogado (data)
        console.log(data)
    })
    .catch((err) => console.log(err))
    },[])

    return(
    <nav className={styles.nav}>
    <Link to='/'><img src={logo} alt="Agile Company"></img></Link>
    <ul className={styles.list}>
    <li className={styles.item}><Link to='/'>Home</Link></li>
    <li className={styles.item}><Link to='/anunciar'>Anunciar</Link></li>
    <li className={styles.item}><Link to='/veiculos'>Veículos</Link></li>
    <li className={styles.item}><Link to='/login'>Logout</Link></li>
    <div className={styles.usuario}>
    {logado.map((user) => (
        <div className={styles.perfil}>
            <p> {user.nome}</p>
        <img src={user.imagem_cliente} alt='teste'/>
        </div>
    ))}
    </div>
    </ul>
    </nav>
    )}

export default NavbarInter