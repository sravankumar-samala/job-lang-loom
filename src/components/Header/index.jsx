import { useNavigate } from "react-router-dom";
import LogoutButton from "../LogoutButton";
import "./index.css";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <h2 onClick={() => navigate("/home")}>JobLangLoom</h2>
      <LogoutButton />
    </header>
  );
}
