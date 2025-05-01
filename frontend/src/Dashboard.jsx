import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token') // remove o token
    navigate('/') // volta pro login
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Bem-vindo ao Painel do Manasys</h1>
      <p>Você está autenticado!</p>
      <button
        onClick={handleLogout}
        style={{
          marginTop: '2rem',
          padding: '0.7rem 1.5rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Sair
      </button>
    </div>
  )
}
