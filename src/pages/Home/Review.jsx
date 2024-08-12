import React from "react";
import Slider from "react-slick";
import review1 from '../../img/home-two/team-1.jpg';
import review2 from '../../img/home-two/team-1.jpg';
import review3 from '../../img/home-two/team-1.jpg';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Review.css'; // Custom CSS for additional styling

const reviews = [
  {
    name: "Mason Doe",
    position: "Client",
    image: review1,
    text: "The luggage service provided by this company is exceptional. Their attention to detail and commitment to quality have greatly enhanced our travel experience. Highly recommended!",
    rating: 5
  },
  {
    name: "Alisa Decros",
    position: "Client",
    image: review2,
    text: "I have been thoroughly impressed with the luggage services. From prompt delivery to the pristine condition of the luggage, everything was perfect. Their professionalism is unmatched.",
    rating: 5
  },
  {
    name: "Jac Lorry",
    position: "Client",
    image: review3,
    text: "Outstanding service! The team goes above and beyond to ensure customer satisfaction. The luggage quality is top-notch and their support is always there when you need it.",
    rating: 5
  },
  {
    name: "Jackson",
    position: "Client",
    image: review3,
    text: "Outstanding service! The team goes above and beyond to ensure customer satisfaction. The luggage quality is top-notch and their support is always there when you need it.",
    rating: 5
  },
  {
    name: "Robert",
    position: "Client",
    image: review3,
    text: "Excellent service! The team goes above and beyond to ensure customer satisfaction. The luggage quality is top-notch and their support is always there when you need it.",
    rating: 5
  },
  // Additional reviews...
];

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return <div className={`${className} custom-arrow custom-prev-arrow`} onClick={onClick} />;
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return <div className={`${className} custom-arrow custom-next-arrow`} onClick={onClick} />;
};

const Review = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <section className="py-12 bg-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-6 text-[#4A686A]">Our customers say it best</h2>
        <div className="relative">
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={index} className="flex justify-center">
                <div className="bg-white shadow-md rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 max-w-md mx-auto p-6 text-center">
                  <img src={review.image} alt={review.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{review.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{review.position}</p>
                  <div className="flex justify-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <i key={i} className='bx bxs-star text-yellow-500'></i>
                    ))}
                  </div>
                  <p className="text-gray-700">{review.text}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Review;
