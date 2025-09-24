import "../css/signup.css"
import { Link , useNavigate } from "react-router-dom";
import { signUp } from "../services/auth";
import { useState } from "react";

function SignUpPage(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSumbit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try{
        const res  = await signUp(name,email,password);
        console.log(res);
        
        if(res.status==201){
            navigate("/signin")
            alert(res.data.message || "Register success");
        }
        }catch(err){
            setError(err.response?.data.message||"Login Failed !")
        }finally{
            setLoading(false);
        }
    };

return <dev className="signup-page">
 <dev className="signup-container">
    <div className="formandtitle">
        <h3 className="signup-title">Sign UP</h3>
    <form className="signup-form" onSubmit={handleSumbit}>
      <input type="text" value={name}
      onChange={(e) => setName(e.target.value)}
      className="username" name="username" placeholder="Username" required />
      <input type="email" value={email}
      onChange={(e)=>setEmail(e.target.value)}
      className="email" name="email" placeholder="Email" required />
      <input type="password" value={password}
      onChange={(e)=>setPassword(e.target.value)}
      className="password" name="password" placeholder="Password" required />
      {loading 
            ? <div class="loader"></div>
            :<button type="submit" className="signup-button">Sign Up</button>}
    </form>
    <div className="errorMessage">
            <p>{error}</p>
          </div>
    <div className="signin-btn">
        <p>Already Have Acoount ?</p>
        {/* <a href="">Sign In</a> */}
        <Link to="/signin">Sign In</Link>
    </div>
    </div>
    <div className="image">
        <img src="src\assets\images\signup-bg.jpg" alt="" />
    </div>
 </dev>
</dev>
}


export default SignUpPage;