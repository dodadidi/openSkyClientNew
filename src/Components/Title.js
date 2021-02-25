import React, { Component } from 'react';
import cloud from '../Images/cloud.png'
import { Link } from 'react-router-dom'

class Title extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center title">
                <div className="cloud top-cloud myCloud"><img src={cloud} alt="Cloud" /></div>
                <div>
                    <Link to='/' style={{ 'textDecoration': 'none' }}><h1>OpenSky</h1></Link>

                    <h3>Find Your Next Trip</h3>
                </div>
                <div className="cloud bottom-cloud"><img src={cloud} alt="Cloud" /></div>
            </div>
        );
    }
}
export default Title;