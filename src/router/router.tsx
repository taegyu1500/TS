import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "@/view/loginPage";
import MainPage from "@/view/mainPage";
import MainLayout from "@/layouts/mainLayout";
import RegisterPage from "@/view/registerPage";
import NonPrivateRoute from "./nonPrivateRoute";
import ProductRegisterPage from "@/view/productRegisterPage";
import ProductDetailPage from "@/view/productDetailPage";
import ProductListPage from "@/view/productListPage";
import PrivateRoute from "./privateRoute";
import OrderPage from "@/view/orderPage";

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
            <Route path=":id" element={<ProductDetailPage />} />
            <Route path="register" element={<ProductRegisterPage />} />
            <Route index element={<ProductListPage />} />
          </Route>
          <Route path="signup" element={<RegisterPage />} />
          <Route
            path="payment"
            element={
              <PrivateRoute>
                <OrderPage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}
