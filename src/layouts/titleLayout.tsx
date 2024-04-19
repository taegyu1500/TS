import { useNavigate } from "react-router-dom";
/** 메인 화면 제일 위에 위치할 사이트 로고, 누르면 메인 페이지로 이동해야 한다 */
export default function Titlelayout() {
  const navigate = useNavigate();
  const click = () => {
    navigate("/main");
  };
  return (
    <div onClick={click}>
      <h1>PH</h1>
    </div>
  );
}
