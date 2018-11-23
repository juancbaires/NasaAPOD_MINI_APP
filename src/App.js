import React, { Component } from 'react';
import './App.css';
import FacebookLogin from 'react-facebook-login';
import Cities from "./Components/APOD/APOD"
const FACEBOOK_KEY = process.env.REACT_APP_FACEBOOK_KEY
class App extends Component {
  state = {
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    avatar: '',
  }



  componentClicked = () => {
    console.log("clicked")
  }
  responseFacebook = (response) => {
    this.setState({
      isLoggedIn: true,
      userID: response.id,
      name: response.name,
      avatar: response.picture.data.url
    })
  }
  render() {
    let facebookContent;
    if (this.state.isLoggedIn) {
      return (
        <div className="profile">
          <div className="profile--
            list">
          </div>
          <nav className="navbar">
          <span><img src={this.state.avatar} alt="avatar face" /></span>
            <li className="navbar--list">Hello, {this.state.name}</li>
            {/* <li className="navbar--list"></li> */}
          </nav>
          <section>
          <Cities></Cities>
          </section>
        </div>
      )

    } else {
      
      facebookContent = (<FacebookLogin
        appId={FACEBOOK_KEY}
        autoLoad={true}
        fields="name,email,picture"
        onClick={this.componentClicked}
        callback={this.responseFacebook} />)
        
    }
    return (
      <div className="App">
        {facebookContent}
      </div>
    );
  }
}

export default App;
