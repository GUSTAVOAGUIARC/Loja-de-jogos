import React from 'react';
import Home from '../Home';
import Login from '../Login';
import Cadastro from '../Cadastro';
import GerirJogos from '../GerirJogos';
import Carrinho from '../carrinho';
import JogosPc from '../JogosPc';
import JogosXbox from '../jogosXbox';
import JogosPs5 from '../jogosPs5';
import JogoDetalhes from '../JogoDetalhes';
import Comprar from '../Comprar';
import PerfilUsuario from '../PerfilUsuario';
import Pagamentos from '../GerirPagamentos';
import EditarUsuario from '../EditarUsuario';
import HistoricoCompras from '../HistoricoCompras';
import MaisVendidos from '../MaisVendidos';





import { BrowserRouter as Router,
        Routes,
        Route,
        Navigate
        } from "react-router-dom";
import GerirEnderecos from '../GerirEndereco';


function Adm() {
  
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/" />}/> {/* qualquer url inexistente será tranferida para home*/}
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path='/GerirJogos' element={<GerirJogos/>} />
        <Route path="/Carrinho" element={<Carrinho/>}/>
        <Route path="/JogoPc" element={<JogosPc/>}/>
        <Route path="/JogoXbox" element={<JogosXbox/>}/>
        <Route path="/JogoPs5" element={<JogosPs5/>}/>
        <Route path="/jogo/:_id" element={<JogoDetalhes />} />
        <Route path="/Comprar" element={<Comprar />} />
        <Route path="/PerfilUsuario" element={<PerfilUsuario/>}/>
        <Route path="/Pagamentos" element={<Pagamentos/>}/>
        <Route path="/GerirEndereco" element={<GerirEnderecos />}/>
        <Route path="/EditarUsuario" element={<EditarUsuario />} />
        <Route path="/HistoricoCompras" element={<HistoricoCompras />} />
        <Route path='/MaisVendidos' element={<MaisVendidos/>}/>
        

        {/* <Route path="/another" element={<AnotherPage />} /> */}
      </Routes>
    </Router>
  );
   
}

export default Adm;
