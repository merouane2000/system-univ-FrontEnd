import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import StudentsResults from "./page/StudentsResults";
import SignIn from "./page/SignIn";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers/reducer'
import TeacherDashboad from "./teacher/TeacherDashboard";



const store = createStore(reducer)

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/teacher/dashboard" element={< TeacherDashboad />} />
        
        <Route path="/get-results" element={<StudentsResults />} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
