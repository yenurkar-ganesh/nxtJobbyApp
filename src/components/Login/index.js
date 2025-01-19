import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    // Check for empty username or password
    if (username.trim() === '' || password.trim() === '') {
      this.setState({
        showSubmitError: true,
        errorMsg: 'Username or password is invalid',
      })
      return
    }

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        this.onSubmitSuccess(data.jwt_token)
      } else {
        this.onSubmitFailure(data.error_msg)
      }
    } catch (error) {
      this.onSubmitFailure('Something went wrong. Please try again later.')
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken) {
      const {history} = this.props
      history.replace('/')
    }

    return (
      <div className="login-container">
        <form onSubmit={this.submitForm} className="form">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <h1 className="main-heading">Find The Job That Fits Your Life</h1>
          <div className="input-section">
            <label className="labels" htmlFor="username">
              USERNAME
            </label>
            <input
              onChange={this.onChangeUsername}
              className="inputs"
              placeholder="Username"
              id="username"
              type="text"
              value={username}
            />
          </div>
          <div className="input-section">
            <label className="labels" htmlFor="password">
              PASSWORD
            </label>
            <input
              onChange={this.onChangePassword}
              className="inputs"
              placeholder="Password"
              id="password"
              type="password"
              value={password}
            />
          </div>
          <button type="submit" className="loginBtn">
            Login
          </button>
          {/* Render error message if applicable */}
          {showSubmitError && <p className="errorMsg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
