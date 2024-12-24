import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProductList, UserPage } from "../components";
import { Register, Login, Order, ProductPage, CompanyInfo } from "../pages";

export const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/order" element={<Order />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/companyInfo" element={<CompanyInfo />} />

      <Route path="*" element={<div>Page not exist..</div>} />
    </Routes>
  );
};
