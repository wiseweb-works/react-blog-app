import { useQuery } from '@tanstack/react-query';
import { addRemoveLike, fetchPosts } from '../services/postService';
import { Button, Grid, Paper, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useNavigate } from 'react-router';
import { formatDate, stripTags } from '../helper';
import { PostTypes } from '../types/postTypes';

const BlogPosts = () => {
  const navigate = useNavigate();

  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const userID = localStorage.getItem('userID');

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error instanceof Error)
    return <Typography>Error: {error.message}</Typography>;

  return (
    <Grid container spacing={2}>
      {posts?.map((post: PostTypes) => (
        <Grid key={post._id} size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
          <Paper elevation={10} square={false} sx={{ p: 1 }}>
            <Typography variant="body1" textAlign="center" gutterBottom>
              <img src={post.image} height={150} alt="" />
            </Typography>

            <Typography variant="h6" textAlign="center" gutterBottom>
              {post.title}
            </Typography>

            <Typography
              variant="body2"
              gutterBottom
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                mb: 2,
              }}
            >
              {stripTags(post.content)}
            </Typography>

            <Typography variant="body2" gutterBottom>
              Published Date: {formatDate(post.createdAt)}
            </Typography>

            <Grid container justifyContent="space-between" alignItems="center">
              <Grid>
                <Button
                  size="medium"
                  color="error"
                  onClick={async () => {
                    await addRemoveLike(post._id);
                    refetch();
                  }}
                >
                  {post.likes?.includes(userID ?? '') ? (
                    <FavoriteIcon fontSize="medium" />
                  ) : (
                    <FavoriteBorder fontSize="medium" />
                  )}

                  <Typography variant="body2" ml={0.5}>
                    {post.likes.length}
                  </Typography>
                </Button>
                <Button size="medium">
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
              </Grid>

              <Grid>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() =>
                    navigate(`/blogs/${post._id}`, {
                      state: { id: post._id },
                    })
                  }
                >
                  READ MORE
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default BlogPosts;
