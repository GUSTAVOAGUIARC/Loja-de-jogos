import Navbar from "./assets/navbar";
import React, { useState, useEffect } from "react";
import CardProduto from './assets/CardProduto';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function JogosXbox() {

  const { currentUser } = useSelector((state) => state.userReducer); // Usuário atual
  const ID = currentUser?._id;
  const navigate = useNavigate();
  const API_URL = "https://localhost:5000/carrinhos"; // Atualize a URL conforme necessário

  function notify() {

    toast.success("Jogo adicionado no carrinho!", {
      position: "top-center", 
      autoClose: 2500, 
      theme: "dark", 
    });
  }

  const [pesquisa, setPesquisa] = useState("");
  const [plataforma, setPlataforma] = useState("xbox"); // define qual plataforma sera mostrado na pagina

  

  // Função de busca
  const busca = (Texto) => {
    setPesquisa(Texto);
  };

  // Função de adicionar ao carrinho
  const addToCart = async (jogo) => {
    if (!ID) {
      navigate('/login'); // Redireciona para a página de login
    return;}
    
    const dadosjogo = {
      idUsuario: ID,
      jogo: [{ jogoid: jogo._id, quantidade: 1 }],
    };
  
    try {
      // Verificar se o carrinho já existe no banco de dados
      const response = await axios.get(`${API_URL}/${ID}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
  
      // Se o carrinho já existir
      if (response.status === 200) {
        const carrinhoId = response.data._id;
  
        // Adiciona o novo jogo ao carrinho
        await axios.put(
          `${API_URL}/${carrinhoId}`,
          { jogo: [{ jogoid: jogo._id, quantidade: 1 }] },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      }
    } catch (error) {
      // Se o carrinho não existir (404), cria um novo
      if (error.response?.status === 404) {
        await axios.post(`${API_URL}`, dadosjogo, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
        console.error("Erro ao adicionar jogo ao carrinho:", error);
      }
    }
    notify();
  };

  return (
    <div id="JogoPcConteiner">
      <Navbar onSearch={busca} />
      <h1 style={{ fontSize: '35px', fontWeight: 'bold', textAlign: 'center' , color:"#ff7f26"}}>Jogos para Xbox Series X/S</h1>
      {/* Passando a plataforma como prop para CardProduto */}
      <CardProduto 
        pesquisa={pesquisa} 
        addToCart={addToCart} 
        plataforma={plataforma} // Passando plataforma como parametro
      />
      <ToastContainer />
    </div>
  );
}

export default JogosXbox;
