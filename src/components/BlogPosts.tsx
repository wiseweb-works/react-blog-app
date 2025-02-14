import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../services/postService';
import { Button, Grid2, Paper, Typography } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const BlogPosts = () => {
  const formatDate = (isoString: string): string => {
    return new Date(isoString).toLocaleString('en-US');
  };

  function stripTags(content: string): string {
    return content.replace(/<[^>]*>/g, '');
  }

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  console.log(posts);

  return (
    <Grid2 container spacing={2}>
      {posts?.map(
        (post: {
          _id: number;
          title: string;
          image: string;
          content: string;
          createdAt: string;
          likes: [];
          comments: [];
          countOfVisitors: number;
        }) => (
          <Grid2 key={post._id} size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
            <Paper elevation={10} square={false} sx={{ p: 1 }}>
              <Typography variant="body1" textAlign={'center'} gutterBottom>
                <img src={post.image} height={150} alt="" />
              </Typography>
              <Typography variant="body1">
                <Typography variant="h6" textAlign={'center'} gutterBottom>
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
                  Published Date : {formatDate(post.createdAt)}
                </Typography>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  display: 'flex',
                  justifyContent: '',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body1" flexGrow={2}>
                  <Button size="medium">
                    <FavoriteBorder fontSize="medium" />
                    <p>{post.likes.length}</p>
                  </Button>
                  <Button size="medium">
                    <ChatBubbleOutlineOutlinedIcon fontSize="medium" />
                    <p>{post.comments.length}</p>
                  </Button>
                  <Button size="medium">
                    <RemoveRedEyeOutlinedIcon fontSize="medium" />
                    <p>{post.countOfVisitors}</p>
                  </Button>
                </Typography>
                <Typography variant="body1" flexGrow={1} textAlign="end">
                  <Button variant="contained" color="success">
                    READ MORE
                  </Button>
                </Typography>
              </Typography>
            </Paper>
          </Grid2>
        )
      )}
    </Grid2>
  );
};

export default BlogPosts;
