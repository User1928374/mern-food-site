import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import  useAuth  from '../context/useAuth';

function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await api.get(`/posts/${id}`);
      setPost(data);
    };
    fetchPost();
  }, [id]);

  if (!post) return <Text>Loading...</Text>;

  return (
    <Box p={8}>
      <Heading>{post.title}</Heading>
      <Text mt={2}>{post.ingredients}</Text>

      <VStack mt={8} spacing={4}>
        {user && <CommentForm postId={id} />}
        <CommentList postId={id} />
      </VStack>
    </Box>
  );
}

export default PostDetail;