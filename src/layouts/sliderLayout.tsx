import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// 이미지를 파라미터로 받아 카루셀로 띄워야함. 그리고 이 카루셀은 시간맞춰서 알아서 넘어가며 무한 루프를 돌아야함

export default function SliderLayout({ images }: { images: string[] }) {
  return (
    <Carousel
      opts={{ loop: true, align: "center" }}
      plugins={[
        Autoplay({
          delay: 1000,
        }),
      ]}
      className={"w-4/5 mx-auto"}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="basis-1/3">
            <img
              src={`https://picsum.photos/seed/${image}/600/400`}
              alt={`slider${index}`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
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
