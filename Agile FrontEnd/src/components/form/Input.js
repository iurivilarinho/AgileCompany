import styles from "./styles/Input.module.css"
function Input({type, name, placeholder, handleOnChange, value}){
    return(
        <div className={styles.item}>
                <input type={type} name={name} placeholder={placeholder} onChange={handleOnChange} value={value}></input>
        </div>
    )}
export default Input