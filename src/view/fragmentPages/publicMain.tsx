import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SliderLayout from "@/layouts/sliderLayout";

export default function PublicMain() {
  const Navigate = useNavigate();

  return (
    <Fragment>
      <SliderLayout images={[]} />
      <div>안녕하세요 상품 구매, 등록은 로그인 후 이용 가능합니다.</div>
      <Button className="btn" onClick={() => Navigate("/product")}>
        상품 보러가기
      </Button>
    </Fragment>
  );
}
