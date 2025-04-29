import { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, NumberInput, NumberInputField } from '@chakra-ui/react';
import api from '../utils/api';

function CommentForm({ postId }) {
  const [formData, setFormData] = useState({ text: '', rating: 5 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (value) => {
    setFormData({ ...formData, rating: Number(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/comments/${postId}`, formData);
      window.location.reload(); // Refresh comments
    } catch (error) {
      console.error('Comment submit error:', error);
      alert('Failed to submit comment.');
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} w="100%">
      <FormControl isRequired mb={2}>
        <FormLabel>Rating (1-5)</FormLabel>
        <NumberInput min={1} max={5} defaultValue={5} onChange={handleRatingChange}>
          <NumberInputField />
        </NumberInput>
      </FormControl>

      <FormControl isRequired mb={2}>
        <FormLabel>Comment</FormLabel>
        <Input name="text" value={formData.text} onChange={handleChange} />
      </FormControl>

      <Button type="submit" colorScheme="teal" mt={2}>
        Submit Comment
      </Button>
    </Box>
  );
}

export default CommentForm;