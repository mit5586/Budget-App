import NavbarComp from './components/NavbarComp'
import React  from 'react'
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home';



function App() {
  return (
    <div className="">
      <Router>
        <NavbarComp />
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
