import {
  Box, Button, Input, FormControl, FormLabel, Heading, VStack, useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/api/auth';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form?.email, form?.password);
      toast({ title: 'Login successful', status: 'success', isClosable: true });
      navigate('/dashboard');
    } catch(e) {
      toast({
        title: 'Error',
        description: 'Login failed',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={20} p={6} borderWidth={1} borderRadius="lg">
      <Heading mb={6} textAlign="center">Login</Heading>
      <Box as="form" onSubmit={handleLogin}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input name="email" onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" onChange={handleChange} />
          </FormControl>
          <Button width="full" colorScheme="teal" type="submit" isLoading={loading}>Log In</Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
