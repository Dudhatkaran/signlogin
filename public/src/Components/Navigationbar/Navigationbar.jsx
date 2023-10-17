import React, { useState } from 'react'
import Style from './Navigationbar.module.css'
import imgs from '../../images/menu-icon-sign-symbol-design-free-png.webp'
import logoutimgs from '../../images/logout-icon.png'
import { useNavigate } from 'react-router-dom'

const Navigationbar = () => {
    const navigate = useNavigate();
    const [btnMenu, setBtnMenu] = useState(false);
    const menuBtn = () => {
        setBtnMenu(!btnMenu)
    }
    const logout = () => {
        sessionStorage.removeItem('logintocken');
        navigate('/login')
    }
    return (
        <div className={ Style.mainNav }>
            <div className={ Style.navbar }>
                <div className={ Style.logo }>
                    <h2>Logo</h2>
                </div>
                <div className={ Style.menubtn } onClick={ menuBtn }>
                    <img src={ imgs } alt="" />
                </div>
                <div className={ Style.navmen }>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Sevice</li>
                        <li>Help</li>
                        <li>Contact</li>
                        <li className={ Style.logoutbtn } onClick={ logout }>
                            <img src={ logoutimgs } alt="" />
                        </li>
                    </ul>
                </div>
                {
                    btnMenu ?
                        <div className={ Style.navmenSm }>
                            <ul>
                                <li>Home</li>
                                <li>About</li>
                                <li>Sevice</li>
                                <li>Help</li>
                                <li>Contact</li>
                            </ul>
                        </div>
                        : null
                }

            </div>
        </div>
    )
}

export default Navigationbar
