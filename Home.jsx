import { Box } from "@chakra-ui/react";
import Slider from "../component/Slider";

import { CarouselData } from "../component/CarouselData";
import FeaturedProducts from "../component/product/FeaturedProducts";

const Home = () => {
  return (
    <>
      <Box>
        <Box as="section" id="Slider-Section">
          <Slider i={CarouselData} />
        </Box>
        <Box position="relative" mt={10}>
          <Box
            position="absolute"
            top="-80px"
            left={0}
            width="100%"
            height="120px"
            bgGradient="linear(to-r, teal.300, blue.400)"
            zIndex={-1}
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)",
            }}
          />
          <Box p={10} bg="white" zIndex={1} position="relative">
            <FeaturedProducts />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
