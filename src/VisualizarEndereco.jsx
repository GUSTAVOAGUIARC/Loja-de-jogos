import React, { useEffect, useState } from "react"; 
import axios from "axios"; 
import NavbarInterna from "./assets/navbarInterna.jsx";
import { useParams } from "react-router-dom";
import "./Style/main.css";
import "./Style/navbarInterna.css";

function VisualizarEndereco() {
  const { usuarioId } = useParams(); // Obter o ID do usuário da URL
  const [enderecos, setEnderecos] = useState([]); 

  useEffect(() => {
    const fetchEnderecos = async () => {
      try {
        const response = await axios.get(`https://localhost:5000/endereco/${usuarioId}`); // Ajuste a URL conforme necessário
        setEnderecos(response.data); 
      } catch (error) {
 console.error("Erro ao buscar os endereços:", error);
      }
    };

    fetchEnderecos(); 
  }, [usuarioId]); 

  return (
    <>
      <NavbarInterna />

      <div className="card" style={{ height: "100px" }}>
        <div
          className="card-body"
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "white",
            fontSize: "xx-large",
          }}
        >
          Visualizar Endereços
        </div>
      </div>

      <div className="container" style={{ margin: "auto", maxWidth: "700px" }}>
        {enderecos.map((endereco) => (
          <div className="card" key={endereco.id} style={{ margin: "10px 0" }}>
            <div className="card-header" style={{color:"white", backgroundColor:"hsl(235, 60%, 8%)"}}>
              Endereço ID: {endereco.id}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black"}}>
                Estado: {endereco.estado}
              </li>
              <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 22%)", color: "white", borderColor: "black"}}>
                Cidade: {endereco.cidade}
              </li>
              <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black"}}>
                Rua: {endereco.rua}
              </li>
              <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 22%)", color: "white", borderColor: "black"}}>
                Número: {endereco.numero}
              </li>
              <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black"}}>
                CEP: {endereco.cep}
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="container" style={{ margin: "auto", maxWidth: "700px", marginTop: "20px" }}>
        <a href={`/PerfilUsuario/${usuarioId}`} className="btn btn-danger">
          Voltar
        </a>
      </div>
    </>
  );
}

export default VisualizarEndereco;