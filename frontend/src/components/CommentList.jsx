import { useEffect, useState } from 'react';
import api from '../utils/api';
import { Box, Text, VStack, Divider } from '@chakra-ui/react';

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await api.get(`/comments/${postId}`);
      setComments(data);
    };
    fetchComments();
  }, [postId]);

  return (
    <VStack spacing={4} align="stretch" mt={4}>
      <Text fontWeight="bold">Comments</Text>
      {comments.length === 0 ? (
        <Text>No comments yet.</Text>
      ) : (
        comments.map((comment) => (
          <Box key={comment._id} p={3} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold">{comment.user.username}</Text>
            <Text fontSize="sm" color="gray.600">Rating: {comment.rating}/5</Text>
            <Text>{comment.text}</Text>
          </Box>
        ))
      )}
      <Divider />
    </VStack>
  );
}

export default CommentList;