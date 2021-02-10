import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';


const Registration = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [empty, setEmpty] = useState(false);

    const [ename, setEname] = useState(true);
    const [eemail, setEemail] = useState(true);
    const [epassword, setEpassword] = useState("");

    const [status, setStatus] = useState("");
    const [data, setData] = useState("");
    const [user, setUser] = useState("");
    const [error, setError] = useState("");

    const history = useHistory();

    useEffect(() => {
        axios.get("/update/" + id)
            .then((res) => {
                if (res.data.status == 1) {
                    setName(res.data.user.name);
                    setEmail(res.data.user.email);
                    setPassword(res.data.user.password);
                }
                console.log(res.data);
            }).catch((error) => {
                console.log("errror", error);
            });
    }, [])



    const handler = (e) => {
        let { name, value } = e;
        if (name === "name" && value != "") {
            setName(value);
            setEname(true)
        } else if (name == "name" && value == "") {
            setName(value);
            setEname("Pls enter value")
        } else {

        }
    }


    const submitHandler = (e) => {
        e.preventDefault();
        if (ename == true) {
            console.log(name, email);
            axios.post('http://localhost:4000/update/', { id, name })
                .then((res) => {
                    if (res.data.status == 1) {
                        setError("Record Updated...");
                        setEmpty(true);
                        setTimeout(() => {
                            setEmpty(false);
                            history.push('/home/1')
                        }, 2000);
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
            console.log(ename, eemail);
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
                <h1 style={{ textAlign: "center" }}>Update</h1>
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
                        <input type="text" className="form-control" value={name} onChange={event => handler(event.target)} id="name" name="name" placeholder="Enter Name" />
                        <span style={{ color: "red" }}>{ename}</span>
                    </div>
                    <div className="form- m-3">
                        <label htmlFor="email">Email address :-</label>
                        <input readOnly type="text" className="form-control" value={email} onChange={event => handler(event.target)} id="email" name="email" placeholder="Enter Email" />
                        <span style={{ color: "red" }}>{eemail}</span>
                    </div>
                    <div className="form-group m-3">
                        <label htmlFor="pwd">Password</label>
                        <input readOnly type="text" className="form-control" value={password} onChange={event => handler(event.target)} id="pwd" name="password" placeholder="Password" />
                        <span style={{ color: "red" }}>{epassword}</span>
                    </div>
                    <button type="submit" className="btn btn-primary m-3">Update</button>
                </form>
            </div>
        </div>
    );
}


export default Registration;