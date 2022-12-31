/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../../styles/Slider.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Slider = () => {
  const images = ["/img/pizza1.jpg", "/img/pizza2.jpeg", "/img/pizza3.jpg"];

  const onChange = () => {
    console.log("onChange");
  };
  const onClickItem = () => {
    console.log("onClickItem");
  };

  return (
    <Carousel
      showThumbs={false}
      showArrows={true}
      onChange={onChange}
      onClickItem={onClickItem}
      infiniteLoop={true}
    >
      {images.map((item, index) => (
        <div key={index.toString()}>
          <img src={item} alt={index.toString()} className={styles.img} loading="lazy" />
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
