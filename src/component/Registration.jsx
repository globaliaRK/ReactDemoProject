import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';


const Registration = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [empty, setEmpty] = useState(false);

    const [ename, setEname] = useState("");
    const [eemail, setEemail] = useState("");
    const [epassword, setEpassword] = useState("");

    const [status, setStatus] = useState("");
    const [data, setData] = useState("");
    const [user, setUser] = useState("");
    const [error, setError] = useState("");

    const history = useHistory();

    const handler = (e) => {
        let { name, value } = e;

        switch (name) {
            case "name":
                setName(value);
                let ErrorName = (value == "") ? "Its Not Null" : true
                setEname(ErrorName);
                break;

            case "email":
                setEmail(value);
                let ErrorMail = (!value.match(/\S+@\S+\.\S+/)) || (value == "") ? "Its not Email... OR Its Not Null." : true
                setEemail(ErrorMail);
                break;

            case "password":
                setPassword(value)
                let ErrorPassword = (value == "") ? "Its Not Null..." : true
                setEpassword(ErrorPassword);
                break;

        }
    }


    const submitHandler = (e) => {
        e.preventDefault();
        if (ename == true && eemail == true && epassword == true) {

            axios.post('http://localhost:4000/registration', { name, email, password })
                .then((res) => {
                    if (res.data.status == 1) {
                        history.push('/home/1')
                    } else {
                        setError(res.data.error);
                        console.log("done", error, res.data);
                        setEmpty(true);
                        setTimeout(() => {
                            setEmpty(false);
                        }, 2000);
                    }
                })
                .catch((err) => {
                    setEmpty(true);
                    setError('Something Wrong...');
                    setTimeout(() => {
                        setEmpty(false);
                    }, 2000);
                    console.log("error", err);
                });

        } else {
            setEmpty(true);
            setError('Fill All Record...');
            setTimeout(() => {
                setEmpty(false);
            }, 2000);
        }
    }


    return (
        <div className="col-8 mx-auto m-3">
            <div className="m-5">
                <h1 style={{ textAlign: "center" }}>Registration</h1>
            </div>
            <div>
                {
                    empty ? <div className="alert alert-warning" role="alert">
                        {error}
                    </div> : null
                }
                <form method="post" onSubmit={event => submitHandler(event)}>
                    <div className="form- m-3">
                        <label htmlFor="name">Name :-</label>
                        <input type="text" className="form-control" onChange={event => handler(event.target)} id="name" name="name" placeholder="Enter Name" />
                        <span style={{ color: "red" }}>{ename}</span>
                    </div>
                    <div className="form- m-3">
                        <label htmlFor="email">Email address :-</label>
                        <input type="text" className="form-control" onChange={event => handler(event.target)} id="email" name="email" placeholder="Enter Email" />
                        <span style={{ color: "red" }}>{eemail}</span>
                    </div>
                    <div className="form-group m-3">
                        <label htmlFor="pwd">Password</label>
                        <input type="password" className="form-control" onChange={event => handler(event.target)} id="pwd" name="password" placeholder="Password" />
                        <span style={{ color: "red" }}>{epassword}</span>
                    </div>
                    <button type="submit" className="btn btn-primary m-3">Submit</button>
                    <button type="reset" className="btn btn-primary m-3">Reset</button>
                </form>
            </div>
        </div>
    );
}


export default Registration;