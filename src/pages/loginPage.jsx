import { useState } from "react";
import { Link } from "react-router";

const LoginPage = () => {
  const [accessToken, setAccessToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  if (isLoading) return <div>Loading...</div>

    try {
      const response = await fetch("http://localhost:3000/api/auth/log-in", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.status === 401) {
        setError(data.message)
        setSuccess("")
        return;
      }

      console.log(data.message)
      // If successfull
      if (data.accessToken) {
        setAccessToken(data.accessToken);
        setError("")
        setSuccess(data.message)
      }

      
    
    } catch (error) {
      throw error(setError(error.message))
    }
    finally {
      setIsLoading(false)
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}>
        <div className="login-container">
          {/* <img className="logo" src="/images/logo/logo1.png" alt="logo" /> */}
          <p className="login-subtitle">Welcome Back!</p>

          <form onSubmit={handleLogin}>
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
              <Link to={"/auth/signup"} className="span-sign-up" id="spanbtn">
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
