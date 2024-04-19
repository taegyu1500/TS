import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "@/view/loginPage";
import MainPage from "@/view/mainPage";
import MainLayout from "@/layouts/mainLayout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={MainLayout}>
          <Route path="main" element={<MainPage />} />
          <Route path="login" Component={LoginPage} />
          {/* <Route path="shopping" element={<Shopping />*/}
          {/* 이 아래 라우트는 중간에 확인과정을 거치도록 만들어질 예정 */}
          {/* <Route path="personal" element={<PrivatePage />} */}
          {/* <Route path= "" element={<PH />*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
