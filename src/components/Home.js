import React, { Component, PropTypes } from 'react'
import { http } from '../utils/Request'

export default class Home extends Component {

  static contextTypes = {
      router: PropTypes.object
  }

  componentWillMount () {
    this.state = { 
      screen: "login",
      loginUsername: "",
      loginPass: "",
      loginError: "",
      registerUsername: "",
      registerPass: "",
      registerRepass: "",
      registerError: ""
    }

    const sesToken = window.localStorage.getItem("sesToken");

    if (sesToken && sesToken !== null) {
      return this.context.router.push('/videos')
    }

  }

  render () {

    const login = () => {
      this.setState({loginError: ""})
      const userValid = /^[\w]+$/i.test(this.state.loginUsername)
      if (!userValid) return this.setState({loginError: "Username can only contain alphanumeric chatacters."})
      const body = {
        username: this.state.loginUsername,
        password: this.state.loginPass
      }
      http({url: `http://ec2-13-58-224-185.us-east-2.compute.amazonaws.com:10009/users`, method: 'POST', body: body}).then((response) => {
        if (response.status === 200) {
          if (response.body && response.body.results === "success") {
            window.localStorage.setItem('sesToken', this.state.loginUsername)
            this.context.router.push('/videos')
          }
          if (response.body && response.body.error) {
            this.setState({loginError: "Username or password is wrong."})
          } 
        }  else {
          console.log("error")
        }
      }).catch((e) => {
        console.log("error")
      })
    };

    const register = () => {

      this.setState({registerError: ""})
      const userValid = /^[\w]+$/i.test(this.state.registerUsername)
      if (!userValid) return this.setState({registerError: "Username can only contain alphanumeric chatacters."})

      if (this.state.registerPass.length < 8) return this.setState({registerError: "Password must be 8 characters length or more."})
      if (this.state.registerPass !== this.state.registerRepass) return this.setState({registerError: "The password does not match."})

      const body = {
        username: this.state.registerUsername,
        password: this.state.registerPass
      }

      http({url: `http://ec2-13-58-224-185.us-east-2.compute.amazonaws.com:10009/users`, method: 'POST', body: body}).then((response) => {
        if (response.status === 200) {
          if (response.body && response.body.results === "success") {
            window.localStorage.setItem('sesToken', "dTfpdso#49329")
            this.context.router.push('/videos')
          }
          if (response.body && response.body.error) {
            this.setState({registerError: "Username or password is wrong."})
          } 
        }  else {
          console.log("error")
        }
      }).catch((e) => {
        console.log("error")
      })
    };

    return (
      <div className='home'>
        <div className='container'>
          <div className="headBtnContainer">
            <button onClick={() => { this.setState({screen: "login"}) }} className={ (this.state.screen === "login") && "active" }>Login</button>
            <button onClick={() => { this.setState({screen: "register"}) }} className={ (this.state.screen === "register") && "active"  }>Register</button>
          </div>

          { this.state.screen === "login" &&
            <div className='loginBox'>
              <h3>Login now</h3>
              <input value={this.state.loginUsername} onChange={(e) => { this.setState({loginUsername: e.target.value}) }} type="text" placeholder="Username"/>
              <input value={this.state.loginPass} onChange={(e) => { this.setState({loginPass: e.target.value}) }} type="password" placeholder="Password"/>
              { this.state.loginError && <div className='errorCont'><label>{`${this.state.loginError}`}</label></div>}
              <button onClick={() => { login() }}>Login</button>
              <span onClick={() => { this.setState({screen: "register"}) }} >Don't have an account?</span>
            </div>
          }

          { this.state.screen === "register" &&
            <div className='loginBox'>
              <h3>New account</h3>
              <input value={this.state.registerUsername} onChange={(e) => { this.setState({registerUsername: e.target.value}) }}  type="text" placeholder="Username"/>
              <input value={this.state.registerPass} onChange={(e) => { this.setState({registerPass: e.target.value}) }} type="password" placeholder="Password"/>
              <input value={this.state.registerRepass} onChange={(e) => { this.setState({registerRepass: e.target.value}) }} type="password" placeholder="Retype Password"/>
              { this.state.registerError && <div className='errorCont'><label>{`${this.state.registerError}`}</label></div>}
              <button onClick={() => { register() }}>Register</button>
              <span onClick={() => { this.setState({screen: "login"}) }}>Already have an account?</span>
            </div>
          }

        </div>
      </div>

    )
  }
}
