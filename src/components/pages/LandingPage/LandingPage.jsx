import "./LandingPage.css";
function LandingPage({ handleLoginClick, handleRegisterClick }) {
  return (
    <div className="landing-page">
      <div className="landing-page__container">
        <h1 className="landing-page__title">Welcome to Decluttr</h1>
        <div className="landing-page__buttons">
          <button
            className="landing-page__login"
            onClick={() => {
              handleLoginClick();
            }}
          >
            Log In
          </button>
          <button
            className="landing-page__register"
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

export default LandingPage;
