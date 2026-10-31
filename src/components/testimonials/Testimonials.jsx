import React from 'react';
import "./testimonials.css";
import Image1 from "../../assets/avatar-1.svg";
import Image3 from "../../assets/avatar-3.svg";
import Image2 from "../../assets/ergo_logo.webp";

// import Swiper core and required modules from https://swiperjs.com/react
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';




const data = [
  {
    id: 1,
    image: Image1,
    title: "Ilya",
    subtitle: "CEO of Animator",
    comment:
      "I enjoy working with the Dastan. You make the process fun and interesting. Good luck! 👍",
  },
  {
    id: 2,
    image: Image3,
    title: "Henrik",
    subtitle: "CEO of RCOWU",
    comment:
      "I enjoy working with the Dastan. He makes the process a lot easier. Thank you for your hard work! 👍",
  },
  {
    id: 3,
    image: Image2,
    title: "Ergonomic",
    subtitle: "CEO of Ergonomic",
    comment:
      "Dastan is a true professional Software Engineer with outstanding skills. He deployed my Ergonomic website quickly, efficiently, and exceeded all my expectations. 👍",
  },
  {
    id: 4,
    image: Image1,
    title: "Boston Amanat Moving",
    subtitle: "CEO",
    comment:
      "Dastan seamlessly integrated the Boston Amanat Moving website with its CMS, ensuring everything runs flawlessly. He made the whole process fun and engaging. Wishing you all the best! ",
  }
];


const Testimonials = () => {
  return (
    <section className="testimonials container section">
      <h2 className="section__title">Reviews</h2>
    
      

      <Swiper className="testimonials__container grid"
      // install Swiper modules
      modules={[Pagination]}
      spaceBetween={30}
      slidesPerView={3} // Show 3 reviews at once
      loop={true}
      grabCursor ={true} 
      pagination={{ clickable: true }}
      // Responsive breakpoints: show fewer slides on smaller screens
      breakpoints={{
        0: { slidesPerView: 1 }, // 1 slide on mobile
        768: { slidesPerView: 2 }, // 2 slides on tablets
        1024: { slidesPerView: 3 } // 3 slides on desktop
      }}
    >
        
        {data.map(({id, image, title, subtitle, comment}) => {
          return (
            <SwiperSlide className="testimonial__item" key={id}>
              <div className="thumb">
                <img src={image} alt="" />
              </div>
              <h3 className="testimonials__title">{title}</h3>
              <span className='subtitle'>{subtitle}</span>
              <div className="comment">{comment}</div>
            </SwiperSlide>
          )
        })}
      </Swiper>

    </section>
  )
}

export default Testimonials