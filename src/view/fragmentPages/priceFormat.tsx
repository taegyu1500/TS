import { Fragment } from "react";

export default function PriceFormat({ price }: { price: number }) {
  // price 값을 숫자로 변환
  const numericPrice = Number(price);

  // 변환된 값이 숫자인지 확인
  if (isNaN(numericPrice)) {
    return <Fragment>Invalid price</Fragment>;
  }
  return <Fragment>{numericPrice.toLocaleString("ko-KR")} 원</Fragment>;
}
