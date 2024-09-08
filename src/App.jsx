import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './index.css';
// import Homepage from "./views/HomePage";
// import Product from "./views/Product";
// import Pricing from "./views/Pricing";
// import PageNotFound from "./views/PageNotFound";
// import Login from './views/Login';
// import AppLayout from './views/AppLayout';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
// lazy loading for bundle splitting
const Homepage = lazy(import(()=> "./views/HomePage"))
const Product = lazy(import(()=> "./views/Product"))
const Pricing = lazy(import(()=> "./views/Pricing"))
const PageNotFound = lazy(import(()=> "./views/PageNotFound"))
const Login = lazy(import(()=> "./views/Login"))
const AppLayout = lazy(import(()=> "./views/AppLayout"))

import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';
import ProtectedRoute from './views/ProtectedRoute';
import { lazy, Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";

export default function App () {
  
  return <AuthProvider>
    <CitiesProvider>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage/>}>
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
        </Suspense>
      </BrowserRouter>
    </CitiesProvider>
  </AuthProvider>
}