import React, { useState } from 'react'
import Style from './Loginpage.module.css'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Loginpage = () => {
    const navigate = useNavigate();
    const [myData, setMyData] = useState({
        username: "",
        password: ""
    })
    const [error, setError] = useState({
        username: false,
        password: false
    });
    const handelChange = (e) => {
        setMyData({
            ...myData,
            [e.target.name]: e.target.value
        })
        setError({
            username: false,
            password: false
        });
    }
    const loginHandler = () => {
        if (myData.username == "") {
            setError({
                ...error,
                username: true
            });
        } else if (myData.password == "") {
            setError({
                ...error,
                password: true
            })
        } else {
            const { username, password } = myData;
            fetch('http://localhost:1030/api/user-login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
                .then(res => res.json())
                .then((data) => {
                    if (!data.auth) {
                        toast(data.massage)
                        // toast.error(data.massage, {
                        //     position: "top-center",
                        //     autoClose: 1500,
                        // })
                    } else {
                        toast(data.massage)
                        sessionStorage.setItem('logintocken', data.auth)
                        navigate('/')
                    }
                })
                .catch((err) => {
                    toast(err.massage)
                })
            setMyData({
                ...myData,
                username: '',
                password: ''
            })
        }

    }

    return (

        <div className={ Style.mainlogin }>
            <div className={ Style.form }>
                <h2>Login To Your Account</h2>
                <div className={ Style.forms }>
                    <input
                        placeholder="Username"
                        type="text"
                        name='username'
                        value={ myData.username }
                        onChange={ handelChange }
                    ></input>
                    {
                        error.username ? <span className={ Style.errors }>Enter Username</span> : null
                    }
                    <input
                        placeholder="Password"
                        type="password"
                        name='password'
                        value={ myData.password }
                        onChange={ handelChange }></input>
                    {
                        error.password ? <span className={ Style.errors }>Enter Password</span> : null
                    }
                    <button onClick={ loginHandler }>Login</button>
                </div>
                <div className={ Style.btn }>
                    <h4 >Not a member ? <button onClick={ () => navigate('/singup') }>Singup now</button></h4>
                </div>

            </div>
        </div>
    )
}

export default Loginpage
