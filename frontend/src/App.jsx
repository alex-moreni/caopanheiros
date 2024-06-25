import { BrowserRouter as Router, Routes, Route, } from "react-router-dom"

import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"

import { Home } from "./pages/Home"
import { Login } from "./pages/Auth/Login"
import { Register } from "./pages/Auth/Register"

function App() {

  return (
    <Router>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={ <Home /> }/>
          <Route path="/login" element={ <Login /> }/>
          <Route path="/register" element={ <Register /> }/>
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
