import React, { useState } from 'react'
import Style from './SingupPage.module.css'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const SingupPage = () => {
    const navigate = useNavigate();
    const [myData, setMyData] = useState({
        username: '',
        email: '',
        phone: '',
        password: ''
    })
    const [allError, setAllError] = useState({
        username: false,
        email: false,
        phone: false,
        degPhone: false,
        password: false
    })
    const handleChange = (e) => {
        setMyData({
            ...myData,
            [e.target.name]: e.target.value
        })
        setAllError({
            ...setAllError,
            username: false,
            email: false,
            phone: false,
            degPhone: false,
            password: false
        })
    }
    const dataSubmite = () => {
        if (myData.username == '') {
            setAllError({
                ...allError,
                username: true
            })
        } else if (myData.email == '') {
            setAllError({
                ...allError,
                email: true
            })
        } else if (myData.phone == '') {
            setAllError({
                ...allError,
                phone: true
            })
        } else if (myData.phone.length !== 10) {
            console.log('myData.phone.length::: ', myData.phone.length);
            setAllError({
                ...allError,
                degPhone: true
            })
        } else if (myData.password == '') {
            setAllError({
                ...allError,
                password: true
            })
        } else {
            const { username, email, phone, password } = myData;
            fetch('http://localhost:1030/api/add-user', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    phone: phone,
                    password: password
                })
            }).then(res => res.json())
                .then((data) => {
                    if (data.message = "Admin added...") {
                        toast(data.message)
                        navigate('/login');
                    } else {
                        toast(data.message)

                    }
                })
                .catch((err) => {
                    toast(err.message)

                })

            setMyData({
                username: '',
                email: '',
                phone: '',
                password: ''
            })
        }

    }
    return (
        <div className={ Style.mainlogin }>
            <div className={ Style.form }>
                <h2>Sing Up</h2>
                <div className={ Style.forms }>
                    <input placeholder="Username"
                        type="text"
                        name='username'
                        value={ myData.username }
                        onChange={ handleChange }></input>
                    {
                        allError.username ? <span className={ Style.errors }>Enter Username</span> : null
                    }
                    <input placeholder="Email Id"
                        type="email"
                        name='email'
                        value={ myData.email }
                        onChange={ handleChange }></input>
                    {
                        allError.email ? <span className={ Style.errors }>Enter Email iD</span> : null
                    }
                    <input placeholder="Phone No"
                        type="number"
                        name='phone'
                        value={ myData.phone }
                        onChange={ handleChange }></input>
                    {
                        allError.phone ? <span className={ Style.errors }>Enter Phone No</span> : null
                    }
                    {
                        allError.degPhone ? <span className={ Style.errors }>Enter Valid phone no</span> : null
                    }
                    <input placeholder="Password"
                        type="password"
                        name='password'
                        value={ myData.password }
                        onChange={ handleChange }></input>
                    {
                        allError.password ? <span className={ Style.errors }>Enter Password</span> : null
                    }
                    <button onClick={ dataSubmite }>submit</button>
                </div>
                <div className={ Style.btn }>
                    <h4 ><button onClick={ () => navigate('/') }>Sing In</button></h4>
                </div>
            </div>
        </div>
    )
}

export default SingupPage
