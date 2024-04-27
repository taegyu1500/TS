import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "@/view/loginPage";
import MainPage from "@/view/mainPage";
import MainLayout from "@/layouts/mainLayout";
import RegisterPage from "@/view/registerPage";
import NonPrivateRoute from "./nonPrivateRoute";
import ProductRegisterPage from "@/view/productRegisterPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route
            path="login"
            element={
              <NonPrivateRoute>
                <LoginPage />
              </NonPrivateRoute>
            }
          />
          <Route path="product">
            <Route path=":id" element={<MainPage />} />
            <Route path="register" element={<ProductRegisterPage />} />
          </Route>
          <Route path="signup" element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}
