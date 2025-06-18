import AppBar from "./components/AppBar";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
    <AppBar />
    <Outlet/>
    </>
  );
}

export default App;
