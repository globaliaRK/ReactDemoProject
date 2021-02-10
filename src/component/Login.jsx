import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [eemail, setEemail] = useState("");
    const [epassword, setEpassword] = useState("");
    const [status, setStatus] = useState("");
    const [data, setData] = useState("");
    const [user, setUser] = useState("");
    const [error, setError] = useState("");
    const [empty, setEmpty] = useState(false);
    const history = useHistory();

    const onsubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        if (!email.match(/\S+@\S+\.\S+/) || email != "" || password != "") {
            console.log(email, password);
            axios.post('http://localhost:4000/login', { email, password })
                .then((res) => {
                    console.log(res.data);
                    if (res.data.status == 1) {
                        history.push("/home/1");
                    } else {
                        setError(res.data.err);
                    }
                })
                .catch((err) => {
                    console.log("err");
                });

        } else {
            setEmpty(true);
            setTimeout(() => {
                setEmpty(false);
            }, 2000);
        }
    }

    const handler = (e) => {
        let { name, value } = e;
        let valid = true;
        console.log(name, value);
        switch (name) {
            case "email":
                setEmail(value);
                let ErrorMail = (!value.match(/\S+@\S+\.\S+/)) || (value == "") ? "Its not Email... OR Its Not Null." : ""
                console.log(ErrorMail);
                setEemail(ErrorMail);
                break;

            case "password":
                setPassword(value)
                let ErrorPassword = (value == "") ? "Its Not Null..." : ""
                console.log(ErrorPassword);
                setEpassword(ErrorPassword);
                break;

            default:
                break;
        }

    }

    return (
        <div className="col-8 mx-auto m-5">
            <div className="col-10 mx-auto">
                <h1 style={{ textAlign: "center" }}>Login</h1>
            </div>

            <div className="form col-8 mx-auto">
                {
                    empty ? <div className="alert alert-warning" role="alert">
                        Fill All Records...
                  </div> : null
                }
                <form method="post" onSubmit={(event) => onsubmit(event)}>
                    <div className="form-group m-3">
                        <label>Email address:</label>
                        <input type="email" className="form-control" name="email" onChange={event => handler(event.target)} placeholder="Enter email" />
                        <span style={{ color: "red" }}>{eemail}</span>
                    </div>
                    <div className="m-3 form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" onChange={event => handler(event.target)} name="password" placeholder="Enter password" />
                        <span style={{ color: "red" }}>{epassword}</span>
                    </div>
                    <button type="submit" className="m-3 btn btn-primary">Submit</button>
                </form>
            </div>
        </div >
    );
}


export default Login;