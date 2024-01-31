import { useState, useEffect } from 'react';
import { fetchAllCategories, fetchAllProducts } from './api/server';
import Navigation from './components/Navigation';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AccountForm from './components/AccountForm';
import Categories from './components/Categories';
import Loading from './components/Loading';
import ProductInfo from './components/ProductInfo';
import Profile from './components/Profile';
import Cart from './components/Cart';
import Products from './components/Products';



function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );
  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem("cart")) || []
  );
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartUpdated, setCartUpdated] = useState(false);

  useEffect(() => {
    const getAllProducts = async () => {
      const result = await fetchAllProducts();
      setAllProducts(result);
      setLoading(false);
    };
    getAllProducts();
  }, [allProducts.length]);

  useEffect(() => {
    const getAllCategories = async () => {
      const result = await fetchAllCategories();
      setAllCategories(result);
    };
    getAllCategories();
  }, []);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (cart) {
      window.localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      window.localStorage.removeItem("cart");
    }
  }, [cart]);

  useEffect(() => {
    setCartQuantity(
      cart.reduce((acc, curr) => {
        return acc + curr.quantity;
      }, 0)
    );
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cartUpdated]);
  return (
    <>
    
      <Navigation
        token={token}
        setToken={setToken}
        setCategory={setCategory}
        category={category}
        cart={cart}
        cartQuantity={cartQuantity}
      />

      <Categories allCategories={allCategories} setCategory={setCategory} />
      {
        /*displays loading spinner while waiting on products to fetch*/
        loading ? (
          <Loading loading={loading} />
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Home token={token} />} />
              <Route path="/account/profile" element={<Profile />} />
              <Route
                path="/cart"
                element={
                  <Cart
                    cart={cart}
                    setCart={setCart}
                    setCartUpdated={setCartUpdated}
                    cartUpdated={cartUpdated}
                  />
                }
              />
              <Route
                path="/account/:action"
                element={<AccountForm setToken={setToken} />}
              />
              <Route
                path="/products/product/:id"
                element={
                  <ProductInfo
                    setCart={setCart}
                    cart={cart}
                    setCartUpdated={setCartUpdated}
                    cartUpdated={cartUpdated}
                  />
                }
              />
              <Route
                path="/products/:category"
                element={
                  <Products allProducts={allProducts} loading={loading} />
                }
              />
              <Route
                path="/products/search/:query"
                element={
                  <Products allProducts={allProducts} loading={loading} />
                }
              />
            </Routes>
          </>
        )
      }
    </>
  )
}

export default App
