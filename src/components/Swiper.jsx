import Image from "next/image";
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/effect-cards";

// register Swiper custom elements
register();

function Swiper({ images }) {
  return (
    <swiper-container
      class="mySwiper"
      pagination="true"
      effect="cards"
      grab-cursor="true"
    >
      {images.map(({ url }) => {
        return (
          <swiper-slide key={url} lazy="true">
            <Image
              src={url}
              alt="property image"
              priority
              quality={100}
              width={450}
              height={280}
              style={{
                borderRadius: "10px",
                width: "auto",
                height: "auto",
                objectFit: "cover",
                objectPosition: "center",
                cursor: "pointer",
              }}
            />
          </swiper-slide>
        );
      })}
    </swiper-container>
  );
}

export default Swiper;
