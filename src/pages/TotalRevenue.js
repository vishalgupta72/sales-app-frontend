import React from 'react'
import '../components/MyFont.css'

import axios from 'axios';
import { API_BASE_URL } from '../config';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';

const TotalRevenue = () => {

  const[totalRevenue, setTotalRevenue] = useState([])

  const CONFIG_OBJ = { 
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  const getTotalRevenue = async() =>{
      const response = await axios.get(`${API_BASE_URL}/totalrevenue`, CONFIG_OBJ);
      debugger;
      if(response.status === 200){
          setTotalRevenue(response.data.totalRevenue);
      }
      else{
          Swal.fire({
              icon: 'error',
              title: 'Some error occurred while getting all posts!'
          })
      }
  }

  useEffect(()=>{
      getTotalRevenue();
  },[]);




  return (
    <div className="container shadow my-5">
    <div className="row">
        <div className="col-12">
            <h3 className='text-center mt-3 mb-3'>TODAY'S REVENUE IS {totalRevenue}</h3>
        </div>
    </div>
</div>
  )
}

export default TotalRevenue
