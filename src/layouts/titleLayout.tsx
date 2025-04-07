import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
/** 메인 화면 제일 위에 위치할 사이트 로고, 누르면 메인 페이지로 이동해야 한다 */
export default function Titlelayout() {
  const navigate = useNavigate();
  const click = () => {
    navigate("/");
  };
  return (
    <div onClick={click} className="h-16 w-16 flex items-center justify-center">
      <img src={logo} alt="Logo" />
    </div>
  );
}
