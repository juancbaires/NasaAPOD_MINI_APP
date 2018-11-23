import React, { Component } from 'react';
import './APOD.css'
import axios from 'axios'
import { fbButton } from 'vanilla-sharing';
const API_KEY = process.env.REACT_APP_NASA_API_KEY

class APOD extends Component {
    state = {
        imageHD: '',
        about: '',
        copyrightAuthor: '',
        date: '',
        title: '',
    }

    componentWillMount() {

        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`, {
        }).then(res => {
            this.setState({
                imageHD: res.data.hdurl,
                about: res.data.explanation,
                copyrightAuthor: res.data.copyright,
                date: res.data.date,
                title: res.data.title,
            })
        })
    }

    handleClick = () => {
        fbButton({
            url: 'https://alexey-avdeev.com/vanilla-sharing/',
        });
    }
    //share on facebook open graph tags 

    render() {

        return (

            <div>
                <div className='search'>
                    <h1>{this.state.title}</h1>
                    <section className="nasa-card">

                        <img src={this.state.imageHD} alt="nasaApod" />
                        <div className="about">
                            <h2>{this.state.copyrightAuthor}</h2>
                            <p>{this.state.date}</p>
                            {this.state.about}</div>
                        <a href="facebook"><i onClick={this.handleClick} className="fab fa-facebook-f"></i></a>

                    </section>
                </div>
            </div>
        );
    }
}

export default APOD;