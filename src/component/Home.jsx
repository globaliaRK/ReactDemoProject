import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

const Home = (props) => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(props.match.params.page);
    const [parpage, setParpage] = useState(3);

    const history = useHistory();
    useEffect(() => {
        axios.get('/users')
            .then((res) => {
                if (res.data.status == 0) {
                    history.push('/login');
                } else {
                    setUsers(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])



    const onDelete = (e) => {
        console.log(e);
        axios.delete('/delete', { data: { "_id": e } })
            .then((res) => {
                setUsers(res.data.users);
                history.push('/home/1');
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const table = users.map((user, i) => {
        console.log(page, parpage);
        return (
            <tr>
                <th scope="row">{user._id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td><Link className='btn' to={"./../update/" + user._id}>Update</Link></td>
                <td><button name="delete" onClick={event => onDelete(user._id)}>Delete</button></td>
            </tr>)
    })


    return (
        <div className="col-8 mx-auto" >
            <div className="m-3">
                <h1 style={{ textAlign: "center" }}>Home</h1>
            </div>
            <div className="m-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Passsword(Encryped)</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table}
                    </tbody>
                </table>
                <div>
                    <Link className="m-3" to="/home/1">1</Link>
                    <Link className="m-3" to="/home/2">2</Link>
                    <Link className="m-3" to="/home/3">3</Link>
                </div>
            </div>
        </div >
    );
}


export default Home;