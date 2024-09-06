import './App.css';
import Navbar from './components/Navbar';


import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import AddSales from './pages/AddSales';
import TopSale from './pages/TopSale';
import TotalRevenue from './pages/TotalRevenue';
import Register from './pages/Register';

import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';

function App() {

  function DynamicRoutic(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state=>state.userReducer); 

    useEffect(() => {
      const userData = localStorage.getItem("user");

      if(userData){
        dispatch({type: "LOGIN_SUCCESS", payload: userData});
        navigate("/add-sales");
      }
      else{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({type: "LOGIN_ERROR"});
        navigate("/login");
      }
    }, []);

    return(
      <Routes>
          <Route exact path="/" element={<AddSales/>}></Route>
          <Route exact path="/add-sales" element={<AddSales/>}></Route>
          <Route exact path="/top-sales" element={<TopSale/>}></Route>
          <Route exact path="/total-revenue" element={<TotalRevenue/>}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/register" element={<Register />}></Route>
        </Routes>
    )

  }


  return (
    <div className='bg-color'>

      <Router>
      <Navbar />
       <DynamicRoutic/>
      </Router>


    </div>
  );
}

export default App;
