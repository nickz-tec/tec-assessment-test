import { Box, Image } from "@chakra-ui/react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./photo-swiper.css";

type Props = {
  photoUrls: string[];
  roomName: string;
};

export const PhotoSwiper = ({ photoUrls, roomName }: Props) => {
  if (!photoUrls?.length) {
    return null;
  }

  if (photoUrls.length === 1) {
    return (
      <Image
        alt={roomName}
        w="100%"
        h="100%"
        objectFit="cover"
        src={photoUrls[0]}
      />
    );
  }

  return (
    <Box
      className="photo-swiper"
      position="relative"
      h="100%"
      w="100%"
      overflow="hidden"
    >
      <Swiper
        modules={[Navigation, Pagination]}
        style={{ width: "100%", height: "100%" }}
        navigation
        pagination={{ clickable: true }}
        loop
        centeredSlides={false}
      >
        {photoUrls.map((url, index) => (
          <SwiperSlide key={`${url}-${index}`}>
            <Image
              alt={`${roomName} photo ${index + 1}`}
              src={url}
              w="100%"
              h="100%"
              objectFit="cover"
              display="block"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
