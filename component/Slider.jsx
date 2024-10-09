import React, { useRef } from "react";
import {
    Box,
    Image,
    Square,
    Button,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const Slider = ({ i }) => {
    const swiperRef = useRef(null);

    const handlePrev = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const handleNext = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slideNext();
        }
    };

    return (
        <Box position="relative" overflow="hidden" h='lg'>
            <Swiper
                ref={swiperRef}
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 4000 }}
                navigation={false} // Disable default navigation buttons
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    660: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    749: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    1240: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                }}
            >
                {i.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Square m="auto" position='relative' h='full' w='full'>
                            <Image
                                src={item.img}
                                alt={item.name}
                                objectFit='cover'
                                w='100%'
                                h='full' // Change to cover for better fit
                                // Make sure the image covers the whole square
                                transition="transform 0.3s ease"
                                _hover={{ transform: 'scale(1.05)' }}
                            />
                        </Square>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Button
                position="absolute"
                left="-2"
                top="35%"
                transform="translateY(-50%)"
                onClick={handlePrev}
                zIndex={1}
                border="none"
                bg="transparent"
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
                boxShadow="xl"
            >
                <ChevronLeftIcon w='fit-content' bg='transparent' _hover={{ bg: "white" }} border='1px solid black' fontSize='30px' borderRadius="50%" />
            </Button>

            <Button
                position="absolute"
                right="-2"
                top="35%"
                transform="translateY(-50%)"
                onClick={handleNext}
                zIndex={1}
                border="none"
                bg="transparent"
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
                boxShadow="xl"
            >
                <ChevronRightIcon w='fit-content' bg='transparent' _hover={{ bg: "white" }} border='1px solid black' fontSize='30px' borderRadius="50%" />
            </Button>
        </Box>
    );
};

export default Slider;

