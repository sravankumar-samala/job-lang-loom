import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { v4 as uuid } from "uuid";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "./index.css";

export default function SignUp() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
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
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const userDetails = { username, password };
    localStorage.setItem("user", JSON.stringify(userDetails));
    const jwtToken = uuid();
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    navigate("/");
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const renderNameInputField = () => (
    <div className="text-field input-container">
      <input
        type="text"
        value={username}
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
          <p className="sub-heading">Please sign-up</p>
        </div>
        {renderNameInputField()}
        {renderPasswordInputField()}
        <button type="submit" className="submit-btn">
          Sign-Up
        </button>
      </form>
    </div>
  );
}
