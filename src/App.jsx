import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import { ToastContainer } from 'react-toastify'
import Login from "./components/Login";
import Browse from "./components/Browse";
import Design from "./components/Design"
import Wishlist from "./components/Wishlist";
import WishItem from "./components/WishItem";

function App() {
  return <>

  <Router>
  <ToastContainer/>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="auth/signup" element={<Signup />} />
      <Route path="auth/login" element={<Login />} />
      <Route path="shirts/browse" element={<Browse />} />
      <Route path="shirts/design" element={<Design />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/wishlist/:wishId" element={<WishItem />} />
    </Routes>
  </Router>
  
  </>
}

export default App