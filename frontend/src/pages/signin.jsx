import "../css/signin.css";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { signIn } from "../services/auth.js";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoadine]=useState(false);
  const [errorMessage,setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSumbit = async (e)=> {
    e.preventDefault();
    setLoadine(true);
    try{
      const res = await signIn(email,password);
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    }catch(err){
      console.log("error",err.response?.data.message||err.message);
      setErrorMessage(err.response?.data.message||"Login Failed !")
    }finally{
      setLoadine(false);
    }
  }
  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="formandtitle">
          <h3 className="signin-title">Sign In</h3>
          <form className="signin-form" onSubmit={handleSumbit}>
            <input
              type="email"
              value={email}
              className="email"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              className="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {loading 
            ? <div class="loader"></div>
            : <button type="submit" className="signin-button">
              Sign In
            </button>}
          </form>
          <div className="errorMessage">
            <p>{errorMessage}</p>
          </div>
          <div className="signup-btn">
            <p>Don’t have an account?</p>
            {/* <a href="">Sign Up</a> */}
            <Link to="/">Sign Up</Link>
          </div>
        </div>
        <div className="image">
          <img src="src/assets/images/signup-bg.jpg" alt="Sign In" />
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
