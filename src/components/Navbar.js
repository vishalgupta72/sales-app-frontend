import {NavLink, useNavigate} from 'react-router-dom'
import './MyFont.css'

import {useDispatch, useSelector} from 'react-redux'
const Navbar = () =>{


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state=>state.userReducer);

    // console.log(user);

    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({type: "LOGIN_ERROR"});
        navigate("/login");
    }



    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">SALES APP</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    
                    { localStorage.getItem("token") !== null ? <>
                        <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/add-sales">ADD SALE</NavLink>
                        </li>
                    </> : ''}

                    
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/top-sales">TOP SALES</NavLink>
                    </li>
                   
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/total-revenue">TODAYS TOTAL REVENUE</NavLink>
                    </li>
                   
                    { localStorage.getItem("token") === null ? <>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/login">LOGIN</NavLink>
                    </li>
                    </> : ''}
                   
                    { localStorage.getItem("token") === null ? <>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/register">REGISTER</NavLink>
                    </li> </> : ''}
                   

                    { localStorage.getItem("token") !== null ? <>
                    <li className="nav-item">
                    <a className="nav-link"  onClick={()=>logout()} href>LOGOUT</a>
                    </li>
                    </> : ''}
                   


                </ul>
                
                </div>
            </div>
            </nav>
        </>
    );
}

export default Navbar;
