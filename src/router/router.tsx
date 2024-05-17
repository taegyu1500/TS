import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const LoginPage = lazy(() => import("@/view/loginPage"));
const MainPage = lazy(() => import("@/view/mainPage"));
const MainLayout = lazy(() => import("@/layouts/mainLayout"));
const RegisterPage = lazy(() => import("@/view/registerPage"));
const NonPrivateRoute = lazy(() => import("./nonPrivateRoute"));
const ProductRegisterPage = lazy(() => import("@/view/productRegisterPage"));
const ProductDetailPage = lazy(() => import("@/view/productDetailPage"));
const ProductListPage = lazy(() => import("@/view/productListPage"));
const PrivateRoute = lazy(() => import("./privateRoute"));
const OrderPage = lazy(() => import("@/view/orderPage"));
const ErrorPage = lazy(() => import("@/view/fragmentPages/errorPage"));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
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
            <Route path="*" element={<ErrorPage />} />
          </Route>
          {/* <Route path="*" element={<MainPage />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
