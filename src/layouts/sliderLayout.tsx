import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
// 이미지를 파라미터로 받아 카루셀로 띄워야함. 그리고 이 카루셀은 시간맞춰서 알아서 넘어가며 무한 루프를 돌아야함
// 이거는 딱히 건들 이유 없기 때문에 db에 미리 이미지 리스트를 넣어놓고 그걸 받아서 띄울것
export default function SliderLayout({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }
  const length = images.length;
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       nextSlide();
  //     }, 3000);
  //     return () => clearInterval(interval);
  //   }, [current]);

  return (
    <Carousel>
      <CarouselPrevious onClick={prevSlide} />
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <img src={image} alt={`slider${index}`} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext onClick={nextSlide} />
    </Carousel>
  );

  //   return (
  //     <Carousel>
  //       <CarouselPrevious />
  //       <CarouselContent>
  //         <CarouselItem>
  //           <img src="https://via.placeholder.com/800x400" alt="slider1" />
  //         </CarouselItem>
  //         <CarouselItem>
  //           <img src="https://via.placeholder.com/800x400" alt="slider2" />
  //         </CarouselItem>
  //         <CarouselItem>
  //           <img src="https://via.placeholder.com/800x400" alt="slider3" />
  //         </CarouselItem>
  //       </CarouselContent>
  //       <CarouselNext />
  //     </Carousel>
  //   );
}
