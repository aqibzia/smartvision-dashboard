import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Flex direction="column" align="center" justify="center" height="100vh" p={6}>
      <Heading mb={4}>Welcome to SmartVision Dashboard</Heading>
      <Text mb={8}>AI-powered submicron imaging made simple and secure.</Text>
      <Flex gap={4}>
        <Button colorScheme="teal" as={Link} to="/register">
          Register
        </Button>
        <Button colorScheme="blue" as={Link} to="/login">
          Login
        </Button>
      </Flex>
    </Flex>
  );
};

export default Landing;
