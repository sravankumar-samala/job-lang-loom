import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected({ Component }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token === undefined) navigate("/login");
  });

  return <Component />;
}

export default Protected;
