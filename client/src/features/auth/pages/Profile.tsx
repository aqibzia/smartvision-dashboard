import { Box, Heading, Text } from '@chakra-ui/react';

const Profile = () => {
  return (
    <Box p={8}>
      <Heading>User Profile</Heading>
      <Text mt={4}>Welcome, authenticated user!</Text>
    </Box>
  );
};

export default Profile;
