import { HashRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./pages/layouts/MainLayout";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import SignUp from "./components/Signup/Signup";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";


function App() {
  return (
    <HashRouter>
      <Routes>

        {/* Pages with Header & Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
       </Route>
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SignUp/>}/>
        
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />

        {/* Pages without Header & Footer */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </HashRouter>
  );
}

export default App;