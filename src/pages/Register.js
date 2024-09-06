import React from 'react'
import '../components/MyFont.css'

// import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {API_BASE_URL} from '../../src/config'
import Swal from 'sweetalert2'

const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState("");

    const signup= (event) =>{
        event.preventDefault();
        setLoading(true);
        const requestData = {firstName, lastName, email, password}
        axios.post(`${API_BASE_URL}/signup`, requestData)
        .then((result)=>{
            debugger;
            if(result.status === 201){
                setLoading(false);
                Swal.fire({
                    icon: 'success',
                    title: 'User registered successfully!'
                })
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
            }
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
                    
                    <h4 className='text-center'>REGISTER FORM</h4>

                    <form onSubmit={(e)=>signup(e)}>
                        <label htmlFor="First Name">First Name</label>
                        <input type="text" value={firstName} onChange={(ev)=>setFirstName(ev.target.value)} className="p-2 mb-3 form-control" />
                        
                        <label htmlFor="Last Name">Last Name</label>
                        <input type="text" value={lastName} onChange={(ev)=>setLastName(ev.target.value)} className="p-2 mb-3 form-control" />
                        
                        <label htmlFor="email">Email</label>
                        <input type="eamail" value={email} onChange={(ev)=>setEmail(ev.target.value)} className="p-2 mb-3 form-control" />
                        
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={(ev)=>setPassword(ev.target.value)} className="p-2 mb-3 form-control" />
                        

                        <div className="mt-3 mb-5 d-grid">
                            <button className="btn btn-primary" type='submit'>Submit</button>
                        </div>

                                        
                    </form>
                </div>
            </div>
        </div>
  )
}

export default Register;
