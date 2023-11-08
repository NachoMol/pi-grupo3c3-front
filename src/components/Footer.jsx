import React from 'react';
import WP from "../assets/menu/ico-whatsapp.png";
import IN from "../assets/menu/ico-instagram.png";
import FB from "../assets/menu/ico-facebook.png";
import '../styless/Footer.css';
import isologotipo from '../assets/menu/imageIsologotipo.png';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='izqFooter'>
                <img src={isologotipo} className="imgCopyright" />
                <p>2023</p>
            </div>
            <div className='redes1'>
                <a href="http://www.whatsapp.com" target='blank'>
                    <img className='redes' src={WP} alt="" />
                </a>
                <a href="http://www.instagram.com" target='blank'>
                    <img className='redes' src={IN} alt="" />
                </a>
                <a href="https://www.facebook.com" target='blank'>
                    <img className='redes' src={FB} alt="" />
                </a>
            </div>
        </div>
    );
};

export default Footer;