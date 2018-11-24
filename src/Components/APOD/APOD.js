import React, { Component } from 'react';
import './APOD.css'
import axios from 'axios'
import { fbButton, pinterest } from 'vanilla-sharing';
const API_KEY = process.env.REACT_APP_NASA_API_KEY
const FACEBOOK_KEY = process.env.REACT_APP_FACEBOOK_KEY


//Setting state of the Apod componenet
class APOD extends Component {
    state = {
        imageHD: '',
        about: '',
        copyrightAuthor: '',
        date: '',
        title: '',
    }

    // Api Call to nasa's Pic of the day
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

    //This function **TODO**
    // Will make a post once my app has a url to post the picture, title, and image of the day to 
    // the account of the person logged in
    handleFacebookClick = () => {
        fbButton({
            app_id: FACEBOOK_KEY,
            url: 'https://npod.surge.sh/',
            source: this.state.imageHD,
        });
    }
    //share on pinterest
    handlePinterstClick = () => {
        pinterest({
            url: 'https://npod.surge.sh/',
            description: this.state.about,
            media: this.state.imageHD,
        })
    }

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
                        <div className="socialShare">
                            <a href="#" className="facebook"><i onClick={this.handleFacebookClick} className="fab fa-facebook-f"></i></a>
                            <a href="#" className="pinterest"><i onClick={this.handlePinterstClick} className="fab fa-pinterest"></i></a>
                        </div>
                    </section>

                </div>
            </div >
        );
    }
}

export default APOD;