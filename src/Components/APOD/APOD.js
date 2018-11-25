import React, { Component } from 'react';
import './APOD.css'
import axios from 'axios'
import expand from '../../images/expand.png'
import Modal from 'react-modal'
import { fbButton, pinterest } from 'vanilla-sharing';
const API_KEY = process.env.REACT_APP_NASA_API_KEY
const FACEBOOK_KEY = process.env.REACT_APP_FACEBOOK_KEY

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        position: 'absolute'
    }
};
//Setting state of the Apod componenet
class APOD extends Component {
    state = {
        imageHD: '',
        about: '',
        copyrightAuthor: '',
        date: '',
        title: '',
        modalIsOpen: false
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
        Modal.setAppElement('body')
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

    //modal with picture opening function
    openModal = () => {
        this.setState({
            modalIsOpen: true
        });
    }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }
    render() {

        return (

            <div>
                <div className='search'>
                    <h1>{this.state.title}</h1>
                    <section className="nasa-card">
                        <img src={this.state.imageHD} alt="nasaApod" />
                        <button className="full-screen" onClick={this.openModal}>[ {" "}]</button>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >

                            <h2 ref={subtitle => this.subtitle = subtitle}>{this.state.title}</h2>
                            <img className="lightbox" src={this.state.imageHD} alt="nasashot" />
                            <div className="close-button"><button onClick={this.closeModal}>X</button></div>
                        </Modal>
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