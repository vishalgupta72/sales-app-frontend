import React from 'react'
import '../components/MyFont.css'

import { useState } from 'react'
import axios from 'axios'
import {API_BASE_URL} from '../../src/config'
import Swal from 'sweetalert2'

const AddSales = () => {


  const CONFIG_OBJ = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState();
    const [price, setPrice] = useState();

    const addSale= (event) =>{
        event.preventDefault();
        
        const requestData = {productName, quantity, price}
        console.log(requestData);
        axios.post(`${API_BASE_URL}/addentry`, requestData, CONFIG_OBJ)
        .then((result)=>{
          debugger;
            if(result.status === 201){
                Swal.fire({
                    icon: 'success',
                    title: 'Sale added successfully!'
                })
                setProductName('');
                setQuantity('');
                setPrice('');
            }
        })
        .catch((error)=>{
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
            <h4 className='text-center'>ADD SALE ENTRY</h4>

            <form onSubmit={(e)=>addSale(e)}>
                <label htmlFor="product name">Product Name</label>
                <input type="text" required value={productName} onChange={(ev)=>setProductName(ev.target.value)} className="p-2 mb-3 form-control" name="product" />
                
                <label htmlFor="quantity">Quantity</label>
                <input type="number" required value={quantity} onChange={(ev)=>setQuantity(ev.target.value)} className="p-2 mb-3 form-control" name="quantity" />
                
                <label htmlFor="amount">Amount</label>
                <input type="number" required value={price} onChange={(ev)=>setPrice(ev.target.value)} className="p-2 mb-3 form-control" name="amount" />


                <div className="mt-3 mb-5 d-grid">
                    <button className="btn btn-primary" type='submit'>Submit</button>
                </div>

                                
            </form>
        </div>
      </div>
    </div>
  )
}

export default AddSales
