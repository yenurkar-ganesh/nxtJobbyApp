import {Link, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = () => {
  const history = useHistory()

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar bg-dark text-white d-flex justify-content-between align-items-center px-4">
      <Link to="/" className="navbar-brand text-white">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo-img"
        />
      </Link>
      <ul className="nav-links d-flex list-unstyled mb-0">
        <Link to="/" className="text-white text-decoration-none">
          Home
        </Link>

        <Link to="/jobs" className="text-white text-decoration-none">
          Jobs
        </Link>
      </ul>
      <button type="button" className="btn btn-light" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  )
}

export default Header
