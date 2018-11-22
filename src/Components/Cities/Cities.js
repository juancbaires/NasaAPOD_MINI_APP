import React, { Component } from 'react';
import './Cities.css'
import axios from 'axios'
const proxy = process.env.REACT_WEATHER_API

class Cities extends Component {
    state = {
        city: []
    }
    searchCity = (e) => {
        axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${proxy}=${this.state.city}`, {
        }).then(response => {
            console.log(response.data)
            // console.log(response.data.Country)
            // console.log(response.data.Key)
            // console.log(response.data.LocalizedName)
        })
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        this.searchCity()
    }

    render() {
        return (
            <div>
                <div className='search'>
                    <label>Search by City</label>
                    <input name="city" onChange={this.handleChange} type="text" placeholder="Search.."></input>
                </div>
            </div>
        );
    }
}

export default Cities;