import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Message } from "./components/FlashMessage";

import { Home } from "./pages/Home";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";

import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
