import { Box, Flex, Heading, Text, Button, Avatar } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from 'react';
// import { auth } from '../../../firebase.config';
// import { signOut, updatePassword, onAuthStateChanged } from 'firebase/auth';

const Header = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [newPassword, setNewPassword] = useState('');
  // const toast = useToast();
  const navigate = useNavigate();

  // useEffect(() => {
  //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //         if (currentUser) {
  //             setUser(currentUser);
  //         } else {
  //             setUser(null);
  //         }
  //     });
  //     return () => unsubscribe();
  // }, []);

  const firstName =
    localStorage.getItem("firstName") ||
    user?.displayName?.split(" ")[0] ||
    "User";

//   const handleLogout = async () => {
//       try {
//           await signOut(auth);
//           setUser(null);
//           localStorage.removeItem('firstName');
//           onClose();
//           navigate('/');
//       } catch (error) {
//           console.error('Logout failed:', error.message);
//       }
//   };

  // const handlePasswordReset = async () => {
  //     try {
  //         if (newPassword) {
  //             await updatePassword(auth.currentUser, newPassword);
  //             toast({
  //                 title: 'Password updated successfully.',
  //                 status: 'success',
  //                 duration: 3000,
  //                 isClosable: true,
  //             });
  //             setNewPassword('');
  //             onClose();
  //         }
  //     } catch (error) {
  //         toast({
  //             title: 'Password reset failed.',
  //             description: error.message,
  //             status: 'error',
  //             duration: 3000,
  //             isClosable: true,
  //         });
  //     }
  // };

  const randomColor = () => {
    const colors = ["red", "green", "blue", "orange", "purple", "teal"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Box as="nav" bg="gray.800" color="white" p={4}>
      <Flex justify="space-between" align="center" maxW="7xl" mx="auto">
        <Heading size="lg" letterSpacing="tight">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Vintage Hub
          </Link>
        </Heading>
        <Flex spacing={8} gap={4} alignItems="center">
          <Link to="/products">
            <Text _hover={{ textDecoration: "underline" }}>Products</Text>
          </Link>
          <Link to="/cart">
            <Text _hover={{ textDecoration: "underline" }}>Cart</Text>
          </Link>
          <Link to="/contact">
            <Text _hover={{ textDecoration: "underline" }}>Contact</Text>
          </Link>
          <Link to="/blogs">
            <Text _hover={{ textDecoration: "underline" }}>Blogs</Text>
          </Link>
          <Link to="/about">
            <Text _hover={{ textDecoration: "underline" }}>About</Text>
          </Link>

          {user && user.uid ? (
            <>
              <Avatar
                bg={randomColor()}
                name={user.email}
                cursor="pointer"
                onClick={() => navigate("/profile")}
              />
              <Button colorScheme="red" onClick={()=>{
                localStorage.removeItem('user')
                navigate('/login')
              }}>Log Out</Button>
            </>
          ) : (
            <Button as={Link} to="/login">
              Login/Sign Up
            </Button>
          )}
        </Flex>
      </Flex>

      {/* <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>User Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>
                            <FormControl>
                                <FormLabel>Username</FormLabel>
                                <Input value={firstName} readOnly />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input value={user?.email} readOnly />
                            </FormControl>
                            <FormControl>
                                <FormLabel>New Password</FormLabel>
                                <Input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                />
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handlePasswordReset}>
                            Reset Password
                        </Button>
                        <Button colorScheme="red" onClick={handleLogout}>
                            Logout
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal> */}
    </Box>
  );
};

export default Header;
