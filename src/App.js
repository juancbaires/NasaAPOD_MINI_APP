import React, { Component } from 'react';
import './App.css';
import FacebookLogin from 'react-facebook-login';
import axios from "axios"
class App extends Component {
  state = {
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    avatar: '',
    city: '',
    cityOptions: []
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    this.serachCity()
  }

  serachCity = (e) => {
    axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=EoCcGueM84v66bmsyFVbPZWRiGts100L&q=${this.state.city}`, {
    }).then(response => {
      console.log(response)
    })
  }

  handlelogout = () => {
    this.clearState()
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

          <div className="header">
          <img src={this.state.avatar} alt="avatar face" />
          <h1>Welcome {" " + this.state.name}</h1>
          <button onClick={this.handlelogout}>Logout</button>
          </div>
          <div className="profile--
            list">
            <form>
              <label>Enter your city</label>
              <input onChange={this.handleChange} type="text" name='city' placeholder="search city"></input>
            </form>
          </div>
        </div>
      )

    } else {
      facebookContent = (<FacebookLogin
        appId="2049150265148471"
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
