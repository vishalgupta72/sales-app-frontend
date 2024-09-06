import React from 'react'
import '../components/MyFont.css'

import axios from 'axios';
import { API_BASE_URL } from '../config';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';

const TopSale = () => {
    // let index = 0;

    const[topSales, setTopSales] = useState([])
    
    let count = 0;

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }

    const getTopSales = async() =>{
        const response = await axios.get(`${API_BASE_URL}/topentrys`, CONFIG_OBJ);
        // debugger;
        if(response.status === 200){
            setTopSales(response.data.entrys);
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Some error occurred while getting all posts!'
            })
        }
    }

    useEffect(()=>{
        getTopSales();
        
      }, []);

  return (
    <div className="container shadow my-5">
        <div className="row">
            <div className="col-12">
                <h4 className='text-center mt-3'>TOP 5 SALES</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Sales Id</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Sale Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                    {topSales.map((sales) =>{
                        count++;
                        return(
                            <tr key={sales._id}>
                            <th scope="row">{count}</th>
                            <td>{sales._id}</td>
                            <td>{sales.productName}</td>
                            <td>{sales.quantity}</td>
                            <td>{sales.price}</td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default TopSale
