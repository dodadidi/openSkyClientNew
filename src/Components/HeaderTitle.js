import React, { Component } from 'react'
import Typewriter from 'typewriter-effect';
import cloud from '../Images/cloud.png'
import { Link } from 'react-router-dom'

export class HeaderTitle extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center title">
                <div className="cloud top-cloud myCloud"><img src={cloud} alt="Cloud" /></div>
                <Link to='/' style={{ 'textDecoration': 'none' }}><h1>OpenSky</h1></Link>
                <Typewriter
                    options={{
                        strings: ["Find Your Next Trip"],
                        autoStart: true,
                        loop: true,
                        wrapperClassName: 'paragraph'
                    }}
                />
                <div className="cloud bottom-cloud"><img src={cloud} alt="Cloud" /></div>
            </div>
        )
    }
}
