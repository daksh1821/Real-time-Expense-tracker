import AppBar from "./components/AppBar";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./store/auth.js";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = Cookies.get('token');
  async function fetchUser(){
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`,{
         headers: {
             Authorization: `Bearer ${token}`,
         },
     });
     if(res.ok){
      const user = await res.json();
      console.log(user);
      dispatch(getUser()); 
     }
 }

  useEffect(() => {
     fetchUser();
  }, []);

  console.log("Auth state in App:", auth);

  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default App;
