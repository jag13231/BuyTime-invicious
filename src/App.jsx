import { Route, Routes } from "react-router-dom";
import "./App.css";
import SplashScreenPage from "./Pages/SplashScreenPage";
import LoginUser from "./Pages/LoginUser";
import RegisterPage from "./Pages/RegisterPage";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SplashScreenPage />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />}/>

        
        
        
      
      </Routes>
    </>
  );
}

export default App;
