import styles from "./styles/Card.module.css"

export default function Card(props) {
    return(<div className={`${styles.cardPrincipal} ${styles[props.customClass]}`}>
    {props.children}</div>)
    
}