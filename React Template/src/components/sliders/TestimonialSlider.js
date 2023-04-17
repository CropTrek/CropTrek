import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const TestimonialSlider = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });
  const thumbs = {
    dots: false,
    autoplay: true,
    speed: 800,
    speed: 500,
    arrows: false,
    focusOnSelect: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          slidesToShow: 3,
        },
      },
    ],
  };
  const slider = {
    arrows: false,
    dots: false,
    infinite: false,
    autoplay: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="row justify-content-center">
      <div className="col-lg-7">
        <Slider
          {...thumbs}
          asNavFor={nav2}
          ref={(slider) => setSlider1(slider)}
          className="testimonial-thumbs-slider border-bottom-1 mb-60 wow fadeInUp"
        >
          <div className="testimonial-thumb-item">
            <img src="assets/images/testimonial/img-6.jpg" alt="" />
          </div>
          <div className="testimonial-thumb-item">
            <img src="assets/images/testimonial/img-7.jpg" alt="" />
          </div>
          <div className="testimonial-thumb-item">
            <img src="assets/images/testimonial/img-8.jpg" alt="" />
          </div>
          <div className="testimonial-thumb-item">
            <img src="assets/images/testimonial/img-9.jpg" alt="" />
          </div>
          <div className="testimonial-thumb-item">
            <img src="assets/images/testimonial/img-10.jpg" alt="" />
          </div>
          <div className="testimonial-thumb-item">
            <img src="assets/images/testimonial/img-11.jpg" alt="" />
          </div>
          <div className="testimonial-thumb-item">
            <img src="assets/images/testimonial/img-8.jpg" alt="" />
          </div>
        </Slider>
      </div>
      <div className="col-lg-9">
        <Slider
          {...slider}
          asNavFor={nav1}
          ref={(slider) => setSlider2(slider)}
          className="testimonial-slider-four wow fadeInDown"
        >
          <div className="testimonial-item-three d-flex">
            <div className="author-thumb">
              <img src="assets/images/testimonial/img-5.jpg" alt="" />
            </div>
            <div className="testimonial-content">
              <p>
                Sed ut perspiciatis unde omnis iste natus error lutatem
                accusantium doloremque laudantium, totam rem aperiamc eaquesa
                quae abillo inventore veritatis et quasi architect neque porro
                quisquam est qui dolorem
              </p>
              <div className="author-title-qoute d-flex">
                <div className="quote">
                  <i className="fas fa-quote-right" />
                </div>
                <div className="author-title">
                  <h4>Michael R. Jordan</h4>
                  <p className="position">CEO &amp; Founder</p>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-item-three d-flex">
            <div className="author-thumb">
              <img src="assets/images/testimonial/img-5.jpg" alt="" />
            </div>
            <div className="testimonial-content">
              <p>
                Sed ut perspiciatis unde omnis iste natus error lutatem
                accusantium doloremque laudantium, totam rem aperiamc eaquesa
                quae abillo inventore veritatis et quasi architect neque porro
                quisquam est qui dolorem
              </p>
              <div className="author-title-qoute d-flex">
                <div className="quote">
                  <i className="fas fa-quote-right" />
                </div>
                <div className="author-title">
                  <h4>Michael R. Jordan</h4>
                  <p className="position">CEO &amp; Founder</p>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-item-three d-flex">
            <div className="author-thumb">
              <img src="assets/images/testimonial/img-5.jpg" alt="" />
            </div>
            <div className="testimonial-content">
              <p>
                Sed ut perspiciatis unde omnis iste natus error lutatem
                accusantium doloremque laudantium, totam rem aperiamc eaquesa
                quae abillo inventore veritatis et quasi architect neque porro
                quisquam est qui dolorem
              </p>
              <div className="author-title-qoute d-flex">
                <div className="quote">
                  <i className="fas fa-quote-right" />
                </div>
                <div className="author-title">
                  <h4>Michael R. Jordan</h4>
                  <p className="position">CEO &amp; Founder</p>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-item-three d-flex">
            <div className="author-thumb">
              <img src="assets/images/testimonial/img-5.jpg" alt="" />
            </div>
            <div className="testimonial-content">
              <p>
                Sed ut perspiciatis unde omnis iste natus error lutatem
                accusantium doloremque laudantium, totam rem aperiamc eaquesa
                quae abillo inventore veritatis et quasi architect neque porro
                quisquam est qui dolorem
              </p>
              <div className="author-title-qoute d-flex">
                <div className="quote">
                  <i className="fas fa-quote-right" />
                </div>
                <div className="author-title">
                  <h4>Michael R. Jordan</h4>
                  <p className="position">CEO &amp; Founder</p>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-item-three d-flex">
            <div className="author-thumb">
              <img src="assets/images/testimonial/img-5.jpg" alt="" />
            </div>
            <div className="testimonial-content">
              <p>
                Sed ut perspiciatis unde omnis iste natus error lutatem
                accusantium doloremque laudantium, totam rem aperiamc eaquesa
                quae abillo inventore veritatis et quasi architect neque porro
                quisquam est qui dolorem
              </p>
              <div className="author-title-qoute d-flex">
                <div className="quote">
                  <i className="fas fa-quote-right" />
                </div>
                <div className="author-title">
                  <h4>Michael R. Jordan</h4>
                  <p className="position">CEO &amp; Founder</p>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-item-three d-flex">
            <div className="author-thumb">
              <img src="assets/images/testimonial/img-5.jpg" alt="" />
            </div>
            <div className="testimonial-content">
              <p>
                Sed ut perspiciatis unde omnis iste natus error lutatem
                accusantium doloremque laudantium, totam rem aperiamc eaquesa
                quae abillo inventore veritatis et quasi architect neque porro
                quisquam est qui dolorem
              </p>
              <div className="author-title-qoute d-flex">
                <div className="quote">
                  <i className="fas fa-quote-right" />
                </div>
                <div className="author-title">
                  <h4>Michael R. Jordan</h4>
                  <p className="position">CEO &amp; Founder</p>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};
export default TestimonialSlider;
