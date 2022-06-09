import './styles.css'
import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'

import api from './api'

function App() {
  const [input, setInput] = useState("")
  const [cep, setCep] = useState({})

  const pesquisaCep = async () => {
    if (input === '') {
      alert("Preencha algum Cep!")
    }
    try {
      const res = await api.get(`${input}/json`)
      setCep(res.data)

    } catch {
      alert("Ops, Ocorreu algum erro na busca...")
      setInput("")
    }
  }


  return (
    <div className="container">
      <h1 className="title">Busca Cep</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu Cep"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={pesquisaCep}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>Cep: {cep.cep} </h2>

          <span>{cep.logradouro} </span>
          <span>{cep.localidade} - {cep.uf} </span>
          <span>{cep.bairro} </span>
          <span>Complemento: {cep.complemento} </span>
        </main>
      )}
    </div>

  );
}

export default App;
