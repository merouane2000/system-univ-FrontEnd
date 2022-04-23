import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import StudentsResults from "./page/StudentsResults";
import SignIn from "./page/SignIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/get-results" element={<StudentsResults />} />
      </Routes>
    </Router>
  );
}

export default App;
