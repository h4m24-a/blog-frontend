import { useState } from "react"
import { Link, useNavigate } from "react-router";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState({})


  const navigate = useNavigate(); // navigate to login page after signing up

 

  const HandleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);




    try {
      const response =  await fetch("http://localhost:3000/api/auth/sign-up", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
          credentials: 'include'
      })


      const data = await response.json(); //  converts response into a JavaScript object using .json() method.

      // If username exists
      if (response.status === 409) {
        setError(data.error);
        setSuccess("");
        setValidationError("")
        return
      };



      // Validation errors 
      if (response.status === 400) {

        const errObj = {}   // Initializes an empty object  

        // convert errors into an object
        data.errors.forEach(err => {      // iterate over each error
          errObj[err.path] = err.msg    // eg: errObj["username"] = "Username is required";       // path and key is Username or password.
        })                                                                                         // msg is the error message from backend
                                                                    // Maps each error to the corresponding field (e.g., username, password)

        console.log(errObj)
        setValidationError(errObj)    // store error in validation state
        setSuccess("")
        setError("")
        return
      }

     

      // If successfull
      if (response.status === 201) {
        setSuccess(data.message);
        setError("");
        setValidationError("")
        navigate('/api/auth/log-in')  // navigate to log in page after signing up
      }



    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
    finally {
      setLoading(false)
    };

    
  }
  
  
  
  if (loading) (
     <div>Loading Sign Up form</div>
  )
  
  
  return (
  <>
      <div style={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}>
        <div className="login-container">
          {/* <img className="logo" src="" alt="logo" /> */}
          <p className="login-subtitle">Create an Account!</p>

          <form onSubmit={HandleSignUp}>
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
            
            {validationError.username &&  (
              <p className="text-center mb-3 font-sans  text-red-400">{validationError.username} </p>
            )}




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

             {validationError.password &&  (
              <p className="text-center mt-1.5 font-sans  text-red-400">{validationError.password} </p>
            )}



            {error && <p className="text-center font-sans  text-red-400" > {error} </p>}

            {success && <p className=" text-center "> {success} </p>}




            <button type="submit">Sign Up</button>
          </form>

          <div className="sign-up-button">
            <p className="sign-up-account">
              Already have an account?
              <Link to={"/api/auth/log-in"} className="span-sign-up" id="spanbtn">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage