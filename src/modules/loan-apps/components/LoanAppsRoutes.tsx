import React from "react";
import { Routes, Route } from "react-router-dom";
import { AcceptLoan, CarInfo, LoanRegistration, Proposals, SignDocuments } from "./pages";

export const LoanApplicationRoutes = () => {
  return (
    <Routes>
      <Route path="new" element={<LoanRegistration />} />
      <Route path="proposals/:id" element={<Proposals />} />
      <Route path=":id/car-info" element={<CarInfo />} />
      <Route path="accept-loan/:id" element={<AcceptLoan />} />
      <Route path="sign-documents/:id" element={<SignDocuments />} />
    </Routes>
  );
};
