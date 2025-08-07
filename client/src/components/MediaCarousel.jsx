// components/MediaCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function MediaCarousel({ media = [] }) {
  return (
    <Swiper pagination={{ clickable: true }} modules={[Pagination]}>
      {media.map((item, index) => (
        <SwiperSlide key={index} className="flex items-center justify-center h-[250px] bg-black">
          {item.type === "image" ? (
            <img
              src={item.url}
              alt="media"
              className="h-full object-contain rounded-lg"
            />
          ) : (
            <video
              controls
              className="h-full object-contain rounded-lg"
              src={item.url}
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
