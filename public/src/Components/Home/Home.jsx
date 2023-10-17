import React, { useState } from 'react'
import Style from './Home.module.css'
import toast from 'react-hot-toast';

const Home = () => {
    const [itData, setItData] = useState([]);
    const token = sessionStorage.getItem('logintocken');
    const myvalue = () => {
        fetch('http://localhost:1030/api/all-data', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authentication": token
            },
        })
            .then(res => res.json())
            .then((data) => {
                if (data.code == 200) {
                    setItData(data.data)
                } else {
                    toast.error(data.massage)
                    sessionStorage.removeItem('logintocken');
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log('err::: ', err);
            })
    }
    return (
        <>
            <div className={ Style.home }>
                <div className={ Style.homepage }>
                    <div className={ Style.mypage }>
                        <h2>DIGITAL SHOP</h2>
                        <p>Start your business based on subscribtion paymant </p>
                        <button>Browser Products</button>
                    </div>
                </div>
            </div>
            <div className={ Style.homsection }>
                <div className={ Style.section }>
                    <h2>My data for you</h2>
                    <br />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto dolore commodi, harum aperiam eum magni.</p>
                    <button onClick={ myvalue }>Show Data</button>
                    <div className={ Style.datatable }>
                        {
                            itData?.length == 0
                                ?
                                null
                                :
                                <table>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Title</th>
                                            <th>Discription</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            itData?.map((ele, index) => (
                                                <tr key={ index }>
                                                    <td>{ index + 1 }</td>
                                                    <td>{ ele.title }</td>
                                                    <td>{ ele.body }</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>

                                </table>

                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
