import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Providers from "./components/Providers";
import Login from "./components/Login";
import ProductList from "./components/Products";
import ProductDetail from "./components/products/ProductDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";

export default function App() {

  return (
    <Providers>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/" element={<ProductList />}/>
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route 
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </Providers>
  )
}

