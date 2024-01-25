import { useState, useEffect } from 'react';
import { fetchAllCategories, fetchAllProducts } from './api/server';
import Navigation from './components/Navigation';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';



function App() {
  return (
    <>
      {/*Main nav bar*/}
      <Navigation
        token={token}
        setToken={setToken}
        setCategory={setCategory}
        category={category}
        cart={cart}
        cartQuantity={cartQuantity}
      />
      {/*links to view specific categories of products*/}
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
