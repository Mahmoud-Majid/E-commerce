import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

function App() {

  return (

    <Router>
      <Header />
      <Container className="py-3">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product" element={<ProductScreen />} >
            <Route path=":id" element={<ProductScreen />} />
          </Route>
          <Route path="/cart" element={<CartScreen />} >
            <Route path=":id?" element={<CartScreen />} />
          </Route>
        </Routes>
      </Container>
      <Footer />
    </Router>

  );
}

export default App;
