import React from 'react'
import '../components/MyFont.css'

import { useNavigate} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {API_BASE_URL} from '../../src/config'
import Swal from 'sweetalert2'

import {useDispatch} from 'react-redux'

const Login = () =>{



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const login = (event) =>{
        event.preventDefault();
        setLoading(true);
        const requestData = {email, password}
        axios.post(`${API_BASE_URL}/login`, requestData)
        .then((result)=>{
            debugger;
            if(result.status === 200){
                setLoading(false);
                localStorage.setItem("token", result.data.result.token);
                localStorage.setItem("user", JSON.stringify(result.data.result.user));
                console.log(result.data.result.user);
                dispatch({type: 'LOGIN_SUCCESS', payload: result.data.result.user});
                setLoading(false); 
                navigate('/add-sales');
            }
            setEmail('');
            setPassword('');
        })
        .catch((error)=>{
            setLoading(false);
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred please try again later!'
            })
        })
        
    }




    return (
        <div className='container mt-4 shadow'>
            <div className="row">
                <div className="col-12 my-4 me-2">

                { loading? <div className="col-md-12 mt-3 text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> :''}


                    <h4 className='text-center'>LOGIN FORM</h4>

                    <form onSubmit={(e)=>login(e)}>
                        <label htmlFor="email">Email</label>
                        <input type="eamail" value={email} onChange={(ev)=>setEmail(ev.target.value)} className="p-2 mb-3 form-control" name="email" />
                        
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={(ev)=>setPassword(ev.target.value)} className="p-2 mb-3 form-control" name="password" />
                        

                        <div className="mt-3 mb-5 d-grid">
                            <button className="btn btn-primary" type='submit'>Submit</button>
                        </div>

                                        
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Login;