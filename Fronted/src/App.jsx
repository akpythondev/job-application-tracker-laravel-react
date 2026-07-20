import {
 BrowserRouter,
 Routes,
 Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import MyApplications from "./pages/MyApplications";
import Profile from "./pages/Profile";

function App() {

 return (

  <BrowserRouter>

   <Routes>

    <Route
      path="/"
      element={<Login />}
    />

    <Route
      path="/register"
      element={<Register />}
    />

    <Route
      path="/dashboard"
      element={<Dashboard />}
    />

    <Route
      path="/job-posts"
      element={<Jobs />}
    />

    <Route
      path="/applications"
      element={<MyApplications />}
    />

    <Route
      path="/profile"
      element={<Profile />}
    />

   </Routes>

  </BrowserRouter>

 );

}

export default App;