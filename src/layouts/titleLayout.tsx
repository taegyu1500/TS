import { useNavigate } from "react-router-dom";
/** 메인 화면 제일 위에 위치할 사이트 로고, 누르면 메인 페이지로 이동해야 한다 */
export default function Titlelayout() {
  const navigate = useNavigate();
  const click = () => {
    navigate("/");
  };
  return (
    <div onClick={click}>
      <div className="text-lg font-bold text-gray-800">N</div>
      <div className="text-sm text-gray-600">네이버페이</div>
    </div>
  );
}
