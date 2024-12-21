import React, { useState, useEffect } from "react";
import NavbarInterna from './assets/navbarInterna';
import './Style/carrinho.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Carrinho() {
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const { currentUser } = useSelector((state) => state.userReducer); // Obtém o usuário atual do Redux
  const navigate = useNavigate();

  useEffect(() => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')); // Obtém os itens do carrinho armazenados
    if (carrinho) {
      setItensCarrinho(carrinho);
    }
  }, []);

  const handleRemover = (index) => {
    const newCarrinho = itensCarrinho.filter((_, i) => i !== index);
    setItensCarrinho(newCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(newCarrinho)); // Atualiza o localStorage
  };

  const handlequantidade = (index, quantity) => {
    const updatedCarrinho = [...itensCarrinho];
    updatedCarrinho[index].quantidade = quantity; // Atualiza a quantidade no estado
    setItensCarrinho(updatedCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(updatedCarrinho)); // Atualiza o localStorage
  };

  const handlplataforma = (index, plataforma) => {
    const updatedCarrinho = [...itensCarrinho];
    updatedCarrinho[index].plataforma = plataforma; // Atualiza a plataforma
    setItensCarrinho(updatedCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(updatedCarrinho));
  };

  const calcularTotal = () => {
    const total = itensCarrinho.reduce(
      (acc, item) => acc + (parseFloat((item.preco)/10) * (item.quantidade || 1)),
      0
    ).toFixed(2);
    // Salva o valor total no localStorage para acesso na página de pagamento
    localStorage.setItem('totalCarrinho', total);
    return total;
  };

  const handlePagamento = () => {
    if (!currentUser) {
      navigate("/login"); // Redireciona para a página de login se o usuário não estiver logado
    } else {
      navigate("/pagamento"); // Redireciona para a página de pagamento
    }
  };

  return (
    <div>
      <NavbarInterna />

      <div className="container text-center" id="containercarinho">
        <h1 style={{color: "white"}}>MEU CARRINHO</h1>

        <div>
          <table className="table" id="carinhodejogos">
            <thead>
              <tr>
                <th id="colunafoto">Foto</th>
                <th>Nome</th>
                <th id="colunaplataforma">Plataforma</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itensCarrinho.length === 0 ? (
                <tr>
                  <td colSpan="6" id="carrinho-vazio">
                    Ainda não há itens no seu carrinho!!
                  </td>
                </tr>
              ) : (
                itensCarrinho.map((item, index) => (
                  <tr key={index}>
                    <td id="colunaimagem">
                      <img src={item.imagem} alt={item.nome} width="50" />
                    </td>
                    <td id="colunanome">{item.nome}</td>
                    <td id="colunaplataforma">
                      {item.plataforma ? (
                        item.plataforma
                      ) : (
                        <select
                          onChange={(e) => handlplataforma(index, e.target.value)}
                          defaultValue=""
                          required
                        >
                          <option value="" disabled>
                            Escolha
                          </option>
                          {item.quantidade_ps5 > 0 && <option value="PS5">PS5</option>}
                          {item.quantidade_xbox > 0 && <option value="Xbox">Xbox</option>}
                          {item.quantidade_pc > 0 && <option value="PC">PC</option>}
                        </select>
                      )}
                    </td>
                    <td id="colunaquantidade">
                      <input
                        id="colunaquantidade2"
                        type="number"
                        min="1"
                        value={item.quantidade || 1}
                        onChange={(e) => handlequantidade(index, parseInt(e.target.value))}
                      />
                    </td>
                    <td id="colunapreco">
                      R$ {((item.preco / 10) * (item.quantidade || 1)).toFixed(2)}
                    </td>
                    <td id="colunaexcluir">
                      <button type="button" onClick={() => handleRemover(index)}>
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <table className="table" id="valortotal">
            <thead>
              <tr>
                <th>Valor Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>R$ {calcularTotal()}</td>
              </tr>
            </tbody>
          </table>

          <div className="pagamento">
            <button
              className="btn btn-outline-success"
              id="botaopagamento"
              onClick={handlePagamento}
            >
              Seguir para pagamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrinho;
