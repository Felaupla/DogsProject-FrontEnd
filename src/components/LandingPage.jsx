import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

export default function LandingPage(){
    return(
        <div className='divLP'>
            <>
            <h1 className='titleLanding'>  WE LOVE DOGS  </h1>,
            </>
            <>
            <Link to='/home'>
                <button className='button'><h1><span>Discover</span></h1></button>
            </Link>
            </>
        </div>

    )
}