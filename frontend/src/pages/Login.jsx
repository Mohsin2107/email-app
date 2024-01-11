import "./login.css";

function Login() {
  const googleAuth = () => {
    window.open(`http://localhost:8000/auth/google/callback`, "_self");
  };
  return (
    <>
      <div className="container">
        <div className="login-page">
          <div className="form">
            <form className="login-form">
              <input type="text" name="" id="" placeholder="username" />
              <input type="password" name="" id="" placeholder="password" />
              <button>Login</button>
              <p className="message">
                Not Registerd? <a href="#">Create an account</a>
              </p>
            </form>
            <button className="login-with-google-btn" onClick={googleAuth}>
              Sign In With Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
