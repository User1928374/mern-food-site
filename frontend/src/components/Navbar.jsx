import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useAuth from '../context/useAuth';

function Navbar() {
    const { user, logout } = useAuth();

  return (
    <Box bg="blue.500" p={4} color="white">
      <Flex maxW="1200px" mx="auto" align="center">
        <Heading size="md">
          <Link to="/">Chipotle Reviews</Link>
        </Heading>
        <Spacer />
        {user ? (
          <>
            <Box mr={4}>Welcome, {user.username}</Box>
            <Button size="sm" onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <Button as={Link} to="/login" size="sm" mr={2}>
              Login
            </Button>
            <Button as={Link} to="/signup" size="sm" colorScheme="teal">
              Sign Up
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
}

export default Navbar;