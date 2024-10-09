import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  HStack,
  Icon,
} from "@chakra-ui/react";
import {
  addItem,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";

const ProductCard = ({ product }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  
  // Check if the user is logged in
  const user = JSON.parse(localStorage.getItem('user'));

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      dispatch(incrementQuantity(product.id));
    } else {
      dispatch(addItem(product));
    }
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const cartItem = cartItems.find((item) => item.id === product.id);

  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        overflow="hidden"
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${product.image})`,
            filter: "blur(15px)",
            zIndex: -1,
            borderRadius: 'lg',
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Link to={`/products/${product.id}`}>
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"cover"}
              src={product.image}
              alt={product.title}
              transition="transform 0.3s ease"
              _groupHover={{
                transform: "scale(1.05)",
              }}
            />
          </Link>
        </Box>
        <Stack pt={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {product.brand}
          </Text>
          <Heading
            fontSize={"lg"}
            fontFamily={"body"}
            fontWeight={500}
            noOfLines={1}
            textAlign="center"
          >
            {product.title}
          </Heading>
          <HStack spacing={1} justifyContent="center" mt={1}>
            {Array.from({ length: 5 }, (_, i) => (
              <Icon
                key={i}
                as={StarIcon}
                color={i < Math.round(product.rating.rate) ? "yellow.400" : "gray.300"} 
                boxSize={5}
              />
            ))}
          </HStack>
          <Stack direction={"row"} align={"center"} justify={"center"} mt={2}>
            <Text fontWeight={800} fontSize={"xl"}>
              ${product.price}
            </Text>
            <Text textDecoration={"line-through"} color={"gray.600"}>
              ${product.originalPrice}
            </Text>
          </Stack>
          {cartItem ? (
            <Stack direction="row" align="center" mt={3}>
              <Button onClick={() => handleDecrement(product.id)}>-</Button>
              <Text fontWeight={600}>{cartItem.quantity}</Text>
              <Button onClick={() => handleIncrement(product.id)}>+</Button>
            </Stack>
          ) : (
            <Stack direction="column" align="center" mt={3}>
              {user ? (
                <Button
                  colorScheme="teal"
                  onClick={() => handleAddToCart(product)}
                  size="lg"
                  width="full"
                >
                  Add to Cart
                </Button>
              ) : (
                <Text color="red.500" fontWeight="bold">
                  Please log in to add items to your cart.
                </Text>
              )}
            </Stack>
          )}
        </Stack>
      </Box>
    </Center>
  );
};

export default ProductCard;
