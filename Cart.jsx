// import {
//     Box,
//     Button,
//     Text,
//     Stack,
//     Heading,
//     Image,
//     Center,
//     Grid,
//     useColorModeValue,
// } from "@chakra-ui/react";
// import { useDispatch, useSelector } from "react-redux";
// import { incrementQuantity, decrementQuantity, removeItem } from "../redux/slices/cartSlice";

// const Cart = () => {
//     const dispatch = useDispatch();
//     const cartItems = useSelector((state) => state.cart.items);

//     const handleIncrement = (id) => {
//         dispatch(incrementQuantity(id));
//     };

//     const handleDecrement = (id) => {
//         dispatch(decrementQuantity(id));
//     };

//     const handleRemove = (id) => {
//         dispatch(removeItem(id));
//     };

//     const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

//     return (
//         <Box p={6}>
//             <Heading mb={4}>Shopping Cart</Heading>
//             {cartItems.length === 0 ? (
//                 <Text>Your cart is empty.</Text>
//             ) : (
//                 <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
//                     {cartItems.map((item) => (
//                         <Center key={item.id} py={12}>
//                             <Box
//                                 role={'group'}
//                                 p={6}
//                                 maxW={'330px'}
//                                 w={'full'}
//                                 bg={useColorModeValue('white', 'gray.800')}
//                                 boxShadow={'lg'}
//                                 rounded={'lg'}
//                                 pos={'relative'}
//                                 zIndex={1}
//                                 transition="transform 0.2s"
//                                 _hover={{ transform: 'scale(1.05)' }} 
//                             >
//                                 <Box
//                                     rounded={'lg'}
//                                     mt={-12}
//                                     pos={'relative'}
//                                     height={'230px'}
//                                     _after={{
//                                         transition: 'all .3s ease',
//                                         content: '""',
//                                         w: 'full',
//                                         h: 'full',
//                                         pos: 'absolute',
//                                         top: 5,
//                                         left: 0,
//                                         backgroundImage: `url(${item.image})`,
//                                         filter: 'blur(15px)',
//                                         zIndex: -1,
//                                     }}
//                                 >
//                                     <Image
//                                         rounded={'lg'}
//                                         height={230}
//                                         width={282}
//                                         objectFit={'cover'}
//                                         src={item.image}
//                                         alt={item.title}
//                                     />
//                                 </Box>
//                                 <Stack pt={10} align={'center'}>
//                                     <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
//                                         {item.brand}
//                                     </Text>
//                                     <Heading fontSize={'lg'} fontFamily={'body'} fontWeight={500} noOfLines={1}>
//                                         {item.title}
//                                     </Heading>
//                                     <Text fontSize="sm" textAlign="center" mb={2} bg={useColorModeValue('gray.100', 'gray.700')} p={2} rounded="md">
//                                         {item.description} 
//                                     </Text>
//                                     <Stack direction={'row'} align={'center'}>
//                                         <Text fontWeight={800} fontSize={'xl'}>
//                                             ${item.price.toFixed(2)}
//                                         </Text>
//                                     </Stack>
//                                     <Stack direction="row" align="center" spacing={4}>
//                                         <Button onClick={() => handleDecrement(item.id)}>-</Button>
//                                         <Text>{item.quantity}</Text>
//                                         <Button onClick={() => handleIncrement(item.id)}>+</Button>
//                                         <Button colorScheme="red" onClick={() => handleRemove(item.id)}>
//                                             Remove
//                                         </Button>
//                                     </Stack>
//                                 </Stack>
//                             </Box>
//                         </Center>
//                     ))}
//                 </Grid>
//             )}
//             <Text fontWeight="bold" mt={4}>Total Price: ${totalPrice.toFixed(2)}</Text>
//         </Box>
//     );
// };

// export default Cart;


import {
    Box,
    Button,
    Text,
    Stack,
    Heading,
    Image,
    Center,
    Grid,
    useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { incrementQuantity, decrementQuantity, removeItem } from "../redux/slices/cartSlice";
import { Navigate } from "react-router-dom";

const Cart = () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const handleRemove = (id) => {
        dispatch(removeItem(id));
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <Box p={6}>
            <Heading mb={4}>Shopping Cart</Heading>
            {cartItems.length === 0 ? (
                <Text>Your cart is empty.</Text>
            ) : (
                <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
                    {cartItems.map((item) => (
                        <Center key={item.id} py={12}>
                            <Box
                                role={'group'}
                                p={6}
                                maxW={'400px'} 
                                w={'full'}
                                bg={useColorModeValue('white', 'gray.800')}
                                boxShadow={'lg'}
                                rounded={'lg'}
                                pos={'relative'}
                                zIndex={1}
                                transition="transform 0.2s"
                                _hover={{ transform: 'scale(1.05)' }} 
                            >
                                <Box
                                    rounded={'lg'}
                                    mt={-12}
                                    pos={'relative'}
                                    height={'230px'}
                                    _after={{
                                        transition: 'all .3s ease',
                                        content: '""',
                                        w: 'full',
                                        h: 'full',
                                        pos: 'absolute',
                                        top: 5,
                                        left: 0,
                                        backgroundImage: `url(${item.image})`,

                                        filter: 'blur(15px)',
                                        zIndex: -1,
                                    }}
                                >
                                    <Image
                                        rounded={'lg'}
                                        height={230}
                                        width={282}
                                        objectFit={'cover'}
                                        src={item.image}
                                        alt={item.title}
                                    />
                                </Box>
                                <Stack pt={10} align={'center'}>
                                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                                        {item.brand}
                                    </Text>
                                    <Heading fontSize={'lg'} fontFamily={'body'} fontWeight={500} noOfLines={1}>
                                        {item.title}
                                    </Heading>
                                    <Text 
                                        fontSize="sm" 
                                        textAlign="center" 
                                        mb={2} 
                                        bg={useColorModeValue('gray.100', 'gray.700')} 
                                        p={2} 
                                        rounded="md"
                                    >
                                        {item.description.length > 50 ?`${item.description.slice(0, 50)}...` : item.description} {/* Limiting description length */}
                                    </Text>
                                    <Stack direction={'row'} align={'center'}>
                                        <Text fontWeight={800} fontSize={'xl'}>
                                            ${item.price.toFixed(2)}
                                        </Text>
                                    </Stack>
                                    <Stack direction="row" align="center" spacing={4}>
                                        <Button onClick={() => handleDecrement(item.id)}>-</Button>
                                        <Text>{item.quantity}</Text>
                                        <Button onClick={() => handleIncrement(item.id)}>+</Button>
                                        <Button colorScheme="red" onClick={() => handleRemove(item.id)}>
                                            Remove
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Center>
                    ))}
                </Grid>
            )}
            <Text fontWeight="bold" mt={4}>Total Price: ${totalPrice.toFixed(2)}</Text>
        </Box>
    );
};

export default Cart;