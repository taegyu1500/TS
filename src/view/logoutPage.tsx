import { useEffect } from "react";
import { useAuth } from "@/hook/useAuth";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const handleLogout = async () => {
      if (isMounted) {
        await logout();
        alert("로그아웃 되었습니다.");
        navigate("/");
      }
    };

    handleLogout();

    return () => {
      isMounted = false;
    };
  }, [logout, navigate]);

  return <></>;
}
