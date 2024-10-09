import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import  { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

function FeaturedProducts() {
  const [featureData, setFeatureData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://fakestoreapi.com/products?limit=4"
    );
    setFeatureData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Box textAlign="center">
        <Heading
          fontWeight={600}
          fontSize={["2xl", "3xl", "4xl"]}
          mb={6}
          color="teal.600"
          // textShadow="1px 1px #000"
        >
          Featured Products
        </Heading>

        <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
          {featureData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}

export default FeaturedProducts;
