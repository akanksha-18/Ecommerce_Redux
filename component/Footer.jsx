import { Box, Text, Center } from '@chakra-ui/react';

function Footer() {
  return (
    <Box as="footer" bg="gray.800" color="white" p={4}>
      <Center>
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()}. All rights reserved.
        </Text>
      </Center>
    </Box>
  );
}

export default Footer;