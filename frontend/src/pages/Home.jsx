import { useEffect, useState } from 'react';
import api from '../utils/api';
import { Box, Heading, Text, Stack } from '@chakra-ui/react';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await api.get('/posts');
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <Box p={8}>
      <Heading mb={6}>Chipotle Bowl Orders</Heading>
      <Stack spacing={4}>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </Stack>
    </Box>
  );
}

export default Home;