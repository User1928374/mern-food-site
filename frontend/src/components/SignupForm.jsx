import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Alert, AlertIcon } from '@chakra-ui/react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';

function SignupForm() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await api.post('/auth/register', formData);
      login(data); // save user to context
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md" boxShadow="lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input name="username" value={formData.username} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input name="email" type="email" value={formData.email} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" value={formData.password} onChange={handleChange} />
          </FormControl>

          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Button type="submit" colorScheme="blue" width="full">Sign Up</Button>
        </VStack>
      </form>
    </Box>
  );
}

export default SignupForm;