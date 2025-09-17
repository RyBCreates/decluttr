import "./Login.css";
function Login({ handleLoginClick, handleRegisterClick }) {
  return (
    <div className="login-page">
      <div className="login-page__container">
        <h1 className="login-page__title">Welcome to Decluttr</h1>
        <div className="login-page__buttons">
          <button
            className="login-page__login"
            onClick={() => {
              handleLoginClick();
            }}
          >
            Log In
          </button>
          <button
            className="login-page__register"
            onClick={() => {
              handleRegisterClick();
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
