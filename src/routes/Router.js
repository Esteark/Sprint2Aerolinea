import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/home/Home";
import InfoVuelo from "../components/infoVuelo/InfoVuelo";
import SecPago from "../components/SecPago/SecPago";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="vuelo/:infoVuelos" element={<InfoVuelo />} />
        <Route path="pago/:opVuelo" element={<SecPago />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
