import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { v4 as uuid } from "uuid";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "./index.css";

export default function Login() {
  const [submitError, setSubmitError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return navigate("/");
    }
  });

  const onChangeUserName = (event) => {
    setUserName(event.target.value);
    setSubmitError(false);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
    setSubmitError(false);
  };

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    navigate("/");
  };

  const setError = (error_msg) => {
    setSubmitError(true);
    setErrorMsg(error_msg);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // check if user exists or not
    const user = localStorage.getItem("user");
    if (!user) {
      return setError("User not found, please sing-up first");
    }
    // setSubmitError(false);
    const userDetails = JSON.parse(user);
    if (
      userName !== userDetails.username ||
      password !== userDetails.password
    ) {
      return setError("Invalid UserName or Password");
    }
    const jwt_token = uuid();
    onSubmitSuccess(jwt_token);
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const navigateToSignupPage = () => navigate("/signup");

  const renderNameInputField = () => (
    <div className="text-field input-container">
      <input
        type="text"
        value={userName}
        placeholder="Enter your name"
        onChange={onChangeUserName}
        required
      />
    </div>
  );

  const renderPasswordInputField = () => (
    <div className="password-field input-container">
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        placeholder="Enter your password"
        onChange={onChangePassword}
        required
      />
      <button type="button" onClick={toggleShowPassword}>
        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
      </button>
    </div>
  );

  return (
    <div className="page-container">
      <div className="overlay"></div>
      <form className="form " onSubmit={onSubmit}>
        <div className="heading-container">
          <h1>JobLangLoom</h1>
          <p className="sub-heading">
            Please login or{" "}
            <button
              type="button"
              className="signup-btn"
              onClick={navigateToSignupPage}
            >
              Sign-up
            </button>
          </p>
        </div>
        {/* <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="profile logo"
        /> */}
        {renderNameInputField()}
        {renderPasswordInputField()}
        <div className="login-btn-container">
          <button type="submit" className="submit-btn button">
            Login
          </button>
          {submitError ? (
            <p className="error-msg">{errorMsg}</p>
          ) : (
            <p className="error-msg hidden-error">Helloooo</p>
          )}
        </div>
      </form>
    </div>
  );
}
