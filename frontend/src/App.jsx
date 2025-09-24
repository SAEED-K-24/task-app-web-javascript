import './App.css'
import SignUpPage from "./pages/signup"
import SignInPage from "./pages/signin"
import HomePage from "./pages/home"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="main-content">
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path='/home' element={<HomePage/>}/>
      </Routes>
    </div>
  )
}

export default App
