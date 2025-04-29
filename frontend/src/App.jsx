import { useState } from 'react'
import logo from './logo.png'
<img src={logo} alt="Manasys" className="logo" />
export default function App() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setMensagem('Enviando...')

    try {
      const res = await fetch('https://manasys-backend.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      })

      const data = await res.json()
      setMensagem(data.message || 'Login feito com sucesso!')
    } catch (error) {
      setMensagem('Erro ao conectar com o servidor')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Manasys" className="logo" />
        <h2>Login – Manasys</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
        {mensagem && <p className="mensagem">{mensagem}</p>}
      </div>
    </div>
  )
}
