import { Box, Flex, Button, Heading, Spacer } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box bg="blue.600" px={6} py={3} color="white">
      <Flex align="center">
        <Heading size="md">SmartVision</Heading>
        <Spacer />
        <Button as={Link} to="/dashboard" variant="ghost" color="white" mr={4}>
          Dashboard
        </Button>
        <Button as={Link} to="/upload" variant="ghost" color="white" mr={4}>
          AI Upload
        </Button>
        <Button onClick={handleLogout} colorScheme="red" size="sm">
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
