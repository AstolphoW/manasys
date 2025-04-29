import { useState } from 'react'

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
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h2>Login – Manasys</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
        />
        <button type="submit">Entrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  )
}