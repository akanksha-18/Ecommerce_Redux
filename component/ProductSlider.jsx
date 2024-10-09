import React from 'react';
import Slider from 'react-slick'; 
import { Box } from "@chakra-ui/react";
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 

const ProductSlider = ({ i }) => {
    const settings = {
        dots: true, 
        infinite: true,
        speed: 500,
        slidesToShow: 1, 
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, 
    };

    return (
        <Slider {...settings}>
            {i.map((item, index) => (
                <Box 
                    key={index} 
                    display="flex" 
                    justifyContent="center" 
                    alignItems="center" 
                    height="400px" 
                >
                    <img 
                        src={item.img} 
                        alt={`Product image ${index + 1}`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                </Box>
            ))}
        </Slider>
    );
};

export default ProductSlider;
