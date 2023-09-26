import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Policy from "./pages/Policy";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgetPassword from "./pages/auth/ForgetPassword";
import AdminRoute from './components/Routes/AdminRoute.js';
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/login" element={<Login/>} />
          {/*---- if Authorized then go to dashboard. Possible with Outlet */}
          <Route path='/dashboard' element={<PrivateRoute/>}>
            <Route path="user" element={<Dashboard/>} />
          </Route>
          {/* ------ Admin dashboard */}
          <Route path='/dashboard' element={<AdminRoute/>}>
            <Route path="admin" element={<AdminDashboard/>} />
            <Route path="admin/create-category" element={<CreateCategory/>} />
            <Route path="admin/create-product" element={<CreateProduct/>} />
            <Route path="admin/users" element={<Users/>} />
          </Route>
          
          <Route path="/forget-password" element={<ForgetPassword/>} />
          <Route path="*" element={<PageNotFound />} />
          
        </Routes>
      </main>
      <Footer/>
    </>
  );
}

export default App;
