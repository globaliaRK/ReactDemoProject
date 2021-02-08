import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [data, setData] = useState("");
    const [user, setUser] = useState("");
    const [error, setError] = useState("");
    const

    const onemailchange = (e) => {
        setEmail(e);
    }
    const onpasswordchange = (e) => {
        setPassword(e);
    }

    const onsubmit = (event) => {
        event.preventDefault();
        console.log(email, password);
        if (email.match(/\S+@\S+\.\S+/) && email != "" && password != "") {

            axios.post('http://localhost:4000/login', { email, password })
                .then((res) => {
                    setStatus(res.data.status);
                    setData(res.data.data);
                    setUser(res.data.user);
                    setError(res.data.error);
                    if (status == 1) {
                        console.log("login");
                        return <Redirect to="/home" />
                    } else {
                        console.log("SOmeError");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        } else {
            console.log("not Done");
        }
    }
    return (
        <div className="col-8 mx-auto m-5">
            <div className="col-10 mx-auto">
                <h1 style={{ textAlign: "center" }}>Login</h1>
            </div>
            <div className="form col-8 mx-auto">
                <form method="post" onSubmit={(event) => onsubmit(event)}>
                    <div className="form-group m-3">
                        <label>Email address:</label>
                        <input type="email" className="form-control" name="email" onBlur={event => onemailchange(event.target.value)} placeholder="Enter email" />
                    </div>
                    <div className="m-3 form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" onBlur={event => onpasswordchange(event.target.value)} name="password" placeholder="Enter password" />
                    </div>
                    <button type="submit" className="m-3 btn btn-primary">Submit</button>
                </form>
            </div>
        </div >
    );
}


export default Login;