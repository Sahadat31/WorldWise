import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./views/HomePage";
import Product from "./views/Product";
import Pricing from "./views/Pricing";
import PageNotFound from "./views/PageNotFound";
import Login from './views/Login';
import AppLayout from './views/AppLayout';
import CityList from './components/CityList';
// import { useEffect, useState } from 'react';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';
import ProtectedRoute from './views/ProtectedRoute';

export default function App () {
  
  return <AuthProvider>
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="product" element={<Product/>}/>
          <Route path="/pricing" element={<Pricing/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/app" 
            element=
              {<ProtectedRoute>
                <AppLayout/>
              </ProtectedRoute>
              }>
                <Route index element={<Navigate replace to="cities"/>}/>
                <Route path="cities" element={<CityList/>}/>
                <Route path="cities/:id" element={<City/>}/>
                <Route path="countries" element={<CountryList/>}/>
                <Route path="form" element={<Form/>}/>
          </Route>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  </AuthProvider>
}