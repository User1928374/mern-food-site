import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import useAuth from '../context/useAuth';

function PostCard({ post }) {
  const { user } = useAuth();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await api.delete(`/posts/${post._id}`);
      window.location.reload(); // Reload to reflect deletion
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post.');
    }
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <Heading fontSize="xl">
        <Link to={`/post/${post._id}`}>{post.title}</Link>
      </Heading>
      <Text mt={2}>{post.ingredients}</Text>
      <Text fontSize="sm" mt={2} color="gray.600">Posted by {post.user?.username}</Text>
      {user && user._id === post.user?._id && (
        <Button size="sm" colorScheme="red" mt={3} onClick={handleDelete}>
          Delete
        </Button>
      )}
    </Box>
  );
}

export default PostCard;