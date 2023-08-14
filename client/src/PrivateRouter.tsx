import { Outlet } from 'react-router-dom';
import Notfound from './Component/Notfound/Notfound';


const PrivateRouter = () => {
  const isAdmin = localStorage.getItem("admin") === "true";
  
  return (
    isAdmin?<Outlet/>:<Notfound/>
  )
}

export default PrivateRouter