import Header from "./components/Header"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home, Login, Profile, Register } from "./pages";
import toast, { Toaster } from "react-hot-toast"
import { useContext, useEffect } from "react";
import { Context } from "./main";
import axios from "axios";
import { serverURL } from "./enum";


function App() {

  const { setUser, setIsAuthenticated, setLoading } = useContext(Context)

  useEffect(() => {
    setLoading(true)
    axios.get(`${serverURL}/users/myprofile`, {
      withCredentials: true
    }).then((res) => {
      setUser(res.data.userData)
      setIsAuthenticated(true)
      setLoading(false)
    }).catch((error) => {
      setUser({})
      setIsAuthenticated(false)
      setLoading(false)
    })

  }, [])

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Toaster />
      </Router>

    </div>

  )
}

export default App
