import { Route, Routes } from "react-router-dom";
import Protected from "./components/ProtectedRoute/protected";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import JobDetails from "./components/JobDetails";
import NotFound from "./components/NotFound";

const App = () => (
  <Routes>
    <Route path="/" element={<Protected Component={Home} />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route
      path="/jobDetails/:id"
      element={<Protected Component={JobDetails} />}
    />
    <Route path="*" element={<Protected Component={NotFound} />} />
  </Routes>
);

export default App;
