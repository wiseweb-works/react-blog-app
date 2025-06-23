import { useQuery } from '@tanstack/react-query';
import { addRemoveLike, FetchMyPosts } from '../services/postService';
import { useNavigate } from 'react-router';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { formatDate, stripTags } from '../helper';
import { Helmet } from 'react-helmet';

const Blogs = () => {
  const navigate = useNavigate();
  const userID = localStorage.getItem('userID');

  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['myposts', userID],
    queryFn: () => {
      if (!userID) {
        throw new Error('No userID found');
      }
      return FetchMyPosts(userID);
    },
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error instanceof Error)
    return <Typography>Error: {error.message}</Typography>;

  if (posts.length === 0)
    return (
      <Container
        maxWidth="xl"
        sx={{
          marginBlock: 2,
          minHeight: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Helmet>
          <title>My Blog Posts</title>
        </Helmet>
        <Grid
          container
          spacing={2}
          justifyContent={'center'}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <Typography variant="body1" color="red" textAlign="center">
            No blogs data...
          </Typography>
          <Button
            variant="contained"
            color="info"
            onClick={() => navigate('/newblog')}
          >
            WRITE BLOG
          </Button>
        </Grid>
      </Container>
    );

  return (
    <Container maxWidth="xl" sx={{ marginBlock: 2, minHeight: '80vh' }}>
      <Grid container spacing={2} justifyContent={'center'}>
        {posts?.map(
          (post: {
            _id: number;
            title: string;
            image: string;
            content: string;
            createdAt: string;
            likes: string[];
            comments: string[];
            countOfVisitors: number;
          }) => (
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

                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
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
          )
        )}
      </Grid>
    </Container>
  );
};

export default Blogs;
