import { useEffect, useState } from 'react'

export default function App() {
  const [mensagem, setMensagem] = useState('Carregando...')

  useEffect(() => {
    fetch('https://manasys-backend.onrender.com/')
      .then(res => res.json())
      .then(data => setMensagem(data.message))
      .catch(err => setMensagem('Erro ao conectar com o backend'))
  }, [])

  return <h1>{mensagem}</h1>
}