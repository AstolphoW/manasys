
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Cadastro() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')

  const navigate = useNavigate()

  const handleCadastro = async (e) => {
    e.preventDefault()
    setMensagem('Enviando...')

    try {
      const res = await fetch('https://manasys-backend.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      })

      const data = await res.json()
      if (res.ok) {
        setMensagem('Usuário cadastrado com sucesso!')
        setTimeout(() => navigate('/'), 1500)
      } else {
        setMensagem(data.detail || 'Erro ao cadastrar')
      }
    } catch (error) {
      setMensagem('Erro ao conectar com o servidor')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Criar Conta</h2>
        <form onSubmit={handleCadastro}>
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
          <button type="submit">Cadastrar</button>
        </form>
        {mensagem && <p className="mensagem">{mensagem}</p>}
        <a href="/" style={{ marginTop: '1rem', display: 'inline-block' }}>Voltar para login</a>
      </div>
    </div>
  )
}
