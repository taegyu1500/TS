import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "@/view/loginPage";
import MainPage from "@/view/mainPage";
import MainLayout from "@/layouts/mainLayout";
import RegisterPage from "@/view/registerPage";
import NonPrivateRoute from "./nonPrivateRoute";

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
          <Route path="register" element={<RegisterPage />} />
          {/* <Route path="shopping" element={<Shopping />*/}
          {/* 이 아래 라우트는 중간에 확인과정을 거치도록 만들어질 예정 */}
          {/* <Route path="personal" element={<PrivatePage />} */}
          {/* <Route path= "" element={<PH />*/}
        </Route>
        <Route path="*" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}
