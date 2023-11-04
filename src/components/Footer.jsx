import React from 'react'
import WP from "../assets/menu/ico-whatsapp.png"
import IN from "../assets/menu/ico-instagram.png"
import FB from "../assets/menu/ico-facebook.png"
import '../styless/Footer.css'


const Footer = () => {
    return (
        <>
            <div className='footer'>
                <div className='izqFooter'>
            <img class="imgCopyright" src="https://th.bing.com/th/id/OIP.TgMxMpLk324l81gbXHI9iQHaHa?w=178&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7"/>
                <p>2023</p>
                </div>
                <div className='redes1'>
                    <a href="http://www.whatsapp.com">
                        <img className='redes' src={WP} alt="" />
                    </a>
                    <a href="http://www.instagram.com">
                        <img className='redes' src={IN} alt="" />
                    </a>
                    <a href="https://www.facebook.com">
                        <img className='redes' src={FB} alt="" />
                    </a>
                </div>
            </div>
        </>
    )
}

export default Footer
