import SignIn from "./component/SignIn";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./component/Dashboard";


function App() {
  return (
  <Router>
   <Routes>
   <Route path="/" element={<SignIn/>} />
   <Route path="/admin/dashboard" element={<Dashboard/>} />
  </Routes>
  </Router>
    
  );
}


export default App;
