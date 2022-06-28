//context de login
//hooks
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
//paginas
import Login from "./components/pages/Login"
import Cadastro from "./components/pages/Cadastro"
import CadastroEndereco from "./components/pages/CadastroEndereco"
import CadastroVeiculo from "./components/pages/CadastroVeiculo"
import Anunciar from "./components/pages/Anunciar"
import Contratar from "./components/pages/Contratar"
import Home from "./components/pages/Home"
import Viagens from "./components/pages/Viagens"
import Veiculos from "./components/pages/Veiculos"
import AlterarVeiculo from "./components/pages/AlterarVeiculo"
import AlterarViagem from "./components/pages/AlterarViagem"

// contexto
import { useContext } from "react"
import { AuthProvider, AuthContext } from "./contexts/Auth"


function AppRoutes (){
    const Private = ({children}) => {
        const { authenticated, loading} = useContext(AuthContext)
        //messagem caso login demorar 
        if (loading){
            return <div className="loading">carregando..</div>
        }
        //se usuario nâo estiver autenticado retorna para o login
        if (!authenticated){
            return <Navigate to="/login"/>
        }
        return children
    }

    return(
        //define as rotas do site (públicas e privadas)
        // cpv anunciar
        <Router>
        <AuthProvider>
            <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/cadastro" element={<Cadastro/>}/>
            <Route exact path="/anunciar" element={<Anunciar/>}/>
            <Route exact path="/contratar" element={<Contratar/>}/>
            <Route exact path="/cadastroEndereco" element={<CadastroEndereco/>}/>
            <Route exact path="/cadastroVeiculo" element={<CadastroVeiculo/>}/>
            <Route exact path="/alterarVeiculo" element={<AlterarVeiculo/>}/>
            <Route exact path="/alterarViagem" element={<AlterarViagem/>}/>
            <Route exact path="/viagens" element={<Viagens/>}/>
            <Route exact path="/veiculos" element={<Veiculos/>}/>
            
            </Routes>
        </AuthProvider>
        </Router>

    )}

export default AppRoutes