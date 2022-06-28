import Card from "../layout/Card"
import NavbarInter from "../layout/NavbarInter"
import styles from "./styles/Veiculos.module.css"

import {useState, useEffect} from "react"
import { Link } from "react-router-dom"

function Veiculos(){
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
<div className={styles.submenu}>
<Link to='/cadastroVeiculo'>Cadastrar Veículo</Link>
<Link to='/AlterarVeiculo'>Alterar Veículo</Link>
</div>

<div className={styles.principal}>
<h2>Veículos Cadastrados</h2>

<div className={styles.content}>
{veiculo.map((trasporte) => (
    <div className={styles.custom}>
    <Card customClass='cardDarkGray' key={trasporte.id_veiculo}>
    <di className={styles.about}>
    <img src={trasporte.imagem} alt='veiculo'/>
    <p><span>Veiculo:</span>  {trasporte.veiculo}</p>
    <p><span>Marca:</span> {trasporte.marca}</p>
    <p><span>Modelo:</span> {trasporte.modelo}</p>
    <p><span>Ano:</span> {trasporte.ano} <span>Placa:</span> {trasporte.placa}</p>


    <div className={styles.options}>
<form action="http://localhost:5000/user/veiculo/deletar" method="POST">
    <input value={trasporte.id_veiculo} name="veiculo"></input>
    <button type="submit" href="#" class="btn btn-primary">Deletar</button>
</form>  

{/* <form action="http://localhost:5000/user/veiculo/alterar" method="GET">
<button type="submit" href="#" class="btn btn-primary">Alterar</button>
</form> */}
</div>
    </di> 
    </Card>
    </div>
       
))}
</div>

</div>
</>
    )
}
export default Veiculos