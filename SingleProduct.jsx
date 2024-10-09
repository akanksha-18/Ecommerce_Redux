import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import {
  addItem,
  incrementQuantity,
  decrementQuantity,
} from "../redux/slices/cartSlice";
import {
  Box,
  Text,
  Image,
  Heading,
  Button,
  Stack,
  Flex,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const cartItems = useSelector((state) => state.cart.items);
  const product = products.find((item) => item.id === parseInt(id));

  useEffect(() => {
    if (!products.length) {
      dispatch(getProducts());
    }
  }, [dispatch, products]);

  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      dispatch(incrementQuantity(product.id));
    } else {
      dispatch(addItem(product));
    }
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(product.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(product.id));
  };

  if (!product) {
    return <Text>Loading...</Text>;
  }

  const cartItem = cartItems.find((item) => item.id === product.id);

  return (
    <Box p={6} m={4} bgGradient="linear(to-br, teal.300, blue.500)" borderRadius="lg" boxShadow="lg">
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-evenly"
        boxShadow="xl" 
        rounded="lg"
        p={5}
        bg="white"
      >
        <Box p={4}>
        <Image
  src={product.image}
  alt={product.title}
  boxSize={{ base: "100%", md: "500px" }} // Ensure this is adequate for your layout
  objectFit="contain" // Change this to "contain" to avoid cropping
  borderRadius="md"
  borderWidth={2}
  borderColor="teal.500"
  mb={{ base: 4, md: 0 }}
/>
        </Box>
        <Box ml={{ md: 4 }} p={6} bg="white" borderRadius="md" boxShadow="lg">
          <Heading size="lg" color="teal.600">{product.title}</Heading>
          <Text fontWeight="bold" color="gray.600">Brand: {product.brand}</Text>
          <Text fontSize="2xl" color="teal.500" mt={2}>
            Price: ${product.price}
          </Text>

          {/* Product Rating */}
          <HStack spacing={1} mt={2}>
            {Array.from({ length: 5 }, (_, i) => (
              <Icon
                key={i}
                as={StarIcon}
                color={i < Math.round(product.rating.rate) ? "yellow.400" : "gray.300"} 
                boxSize={5}
              />
            ))}
            <Text color="gray.500">({product.rating.count})</Text>
          </HStack>

          {/* Product Description */}
          <Text mt={4} fontSize="lg" color="gray.700">
            {product.description}
          </Text>

          {cartItem ? (
            <Stack direction="row" align="center" mt={4}>
              <Button colorScheme="teal" onClick={handleDecrement}>-</Button>
              <Text fontWeight="bold">{cartItem.quantity}</Text>
              <Button colorScheme="teal" onClick={handleIncrement}>+</Button>
            </Stack>
          ) : (
            <Button colorScheme="teal" onClick={handleAddToCart} mt={4} size="lg">
              Add to Cart
            </Button>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default SingleProduct;
