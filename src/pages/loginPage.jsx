import { useState } from "react";
import { useAuthContext } from "../context/useAuthContext";
import { Link, useNavigate } from "react-router";


const LoginPage = () => {
  // const [accessToken, setAccessToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const Navigate = useNavigate()

  const { login } = useAuthContext();
  

  

  const HandleLogin = async (e) => {
  e.preventDefault();


    try {
      const response = await fetch("http://localhost:3000/api/auth/log-in", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ username, password }),
          credentials: 'include'
      });
      const data = await response.json();

      // if user & password are incorrect, set the error message
      if (response.status === 401) {
        setError(data.message)
        setSuccess("")
        return;
      }

      
      // If successfull
      if (response.status === 200) {
        Navigate('/')
        login(data.accessToken);
        setError("")
        setSuccess(data.message)
      }

      

    
    } catch (error) {
      throw error(error.message)
    }
    finally {
      setIsLoading(false)
    }

    
  };
  
  if (isLoading) (
     <div>Loading Log In form</div>
  )

  return (
    <>
      <div style={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}>
        <div className="login-container">
          <i id="logo" className="fa-solid fa-blog text-5xl text-black" ></i>
          <p className="login-subtitle">Welcome back!</p>

          <form onSubmit={HandleLogin}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="text-center  text-red-500" >{error}</p>}

            {success && <p className=" text-center ">{success}</p>}

            <button type="submit">Log In</button>
          </form>

          <div className="sign-up-button">
            <p className="sign-up-account">
              Don't have an account?
              <Link to={"/api/auth/sign-up"} className="span-sign-up" id="spanbtn">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
