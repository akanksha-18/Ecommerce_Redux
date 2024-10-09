import { useDispatch, useSelector } from 'react-redux';
import { login, signup, resetAuthState } from '../redux/slices/AuthSlice';
import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  Flex, Box, Stack, Heading, Text, FormControl, FormLabel, Input, Button, HStack, Link,
  InputGroup, InputRightElement, useColorModeValue
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { auth } from '../../firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

export default function AuthCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth) || {};
  const { user, error } = authState;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(resetAuthState());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  
  const isValidName = (name) => /^[a-zA-Z]+$/.test(name);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password) => password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();

 
    if (!isValidEmail(email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!isValidPassword(password)) {
      toast({
        title: 'Invalid Password',
        description: 'Password must be at least 6 characters long.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!isLogin && (!isValidName(firstName) || !isValidName(lastName))) {
      toast({
        title: 'Invalid Name',
        description: 'First and Last names must contain only letters.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (isLogin) {
      dispatch(login({ email, password })).then(() => {
        dispatch(resetAuthState());
      });
    } else {
      dispatch(signup({ email, password, firstName, lastName }));
    }
  };

  const handleToggleForm = () => {
    setIsLogin((prev) => !prev);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  const handleSignUp = () => {
    setIsLogin((prev) => !prev);
    navigate('/login');
  };

  useEffect(() => {
    if (user) {
      toast({
        title: 'Success!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    }
    if (error) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [user, error, toast, navigate]);

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>{isLogin ? 'Login' : 'Sign up'}</Heading>
          <Text fontSize={'lg'}>to enjoy all of our cool features ✌️</Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {!isLogin && (
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </FormControl>
                  </Box>
                </HStack>
              )}
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                  <InputRightElement h={'full'}>
                    <Button variant={'ghost'} onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button size="lg" bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500' }} type="submit">
                  {isLogin ? 'Login' : 'Sign up'}
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  {isLogin ? (
                    <>
                      Don't have an account? <Link color={'blue.400'} onClick={handleSignUp}>Sign up</Link>
                    </>
                  ) : (
                    <>
                      Already a user? <Link color={'blue.400'} onClick={handleToggleForm}>Login</Link>
                    </>
                  )}
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
