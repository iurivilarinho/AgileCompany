import styles from "./styles/Select.module.css"
function Select({text, name, options, handleOnChange, value}){
    return(
        <div className={styles.item}>
                <label htmlFor={name}>{text}:</label>
                <Select name={name} id={name} >
                <option selected >Selecione</option>
                </Select>
        </div>
    )}
export default Select