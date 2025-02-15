import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  FormControl,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { createComment, fetchPostById } from '../services/postService';
import BlogComments from '../components/BlogComments';

const Details = () => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const location = useLocation();

  const formatDate = (isoString: string): string => {
    return new Date(isoString).toLocaleString('en-US');
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (comment.trim()) {
      const response = await createComment({
        comment: comment,
        blogId: location.state.id,
      });
      if (response) {
        setComment('');
        setOpen(false);
      }
    }
  };

  function stripTags(content: string): string {
    return content.replace(/<[^>]*>/g, '');
  }

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', location.state.id],
    queryFn: () => fetchPostById(location.state.id!),
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error instanceof Error)
    return <Typography>Error: {error.message}</Typography>;

  return (
    <Container maxWidth="md" sx={{ marginBlock: 2 }}>
      <Box>
        <Box>
          <CardMedia
            component="img"
            height="500"
            image={post.image}
            alt={post.title}
          />
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                {post.author?.charAt(0) || 'U'}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={post.userId.username}
            subheader={formatDate(post.createdAt)}
          />
          <CardContent>
            <Typography variant="body1">{post.title}</Typography>
            <Typography variant="body2" textAlign={'justify'}>
              {stripTags(post.content)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="medium">
              <FavoriteBorder fontSize="medium" />
              <Typography variant="body2" ml={0.5}>
                {post.likes.length}
              </Typography>
            </Button>
            <Button size="medium" onClick={() => setOpen(!open)}>
              <ChatBubbleOutlineOutlinedIcon fontSize="medium" />
              <Typography variant="body2" ml={0.5}>
                {post.comments.length}
              </Typography>
            </Button>
            <Button size="medium">
              <RemoveRedEyeOutlinedIcon fontSize="medium" />
              <Typography variant="body2" ml={0.5}>
                {post.countOfVisitors}
              </Typography>
            </Button>
          </CardActions>
          {open && (
            <>
              <form onSubmit={handleCommentSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControl>
                    <FormLabel sx={{ width: '100%' }}>
                      <TextField
                        label="Comment"
                        fullWidth
                        focused
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Add a comment"
                      />
                    </FormLabel>
                  </FormControl>
                  <Button type="submit" variant="contained">
                    ADD COMMENT
                  </Button>
                </Box>
              </form>
              <BlogComments />
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Details;
