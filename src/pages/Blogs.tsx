import { useQuery } from '@tanstack/react-query';
import { addRemoveLike, FetchMyPosts } from '../services/postService';
import { useNavigate } from 'react-router';
import { Button, Container, Grid2, Paper, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const Blogs = () => {
  const navigate = useNavigate();
  const formatDate = (isoString: string): string => {
    return new Date(isoString).toLocaleString('en-US');
  };

  function stripTags(content: string): string {
    return content.replace(/<[^>]*>/g, '');
  }

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

  return (
    <Container maxWidth="xl" sx={{ marginBlock: 2, minHeight: '80vh' }}>
      <Grid2 container spacing={2} justifyContent={'center'}>
        {posts?.map(
          (post: {
            _id: number;
            title: string;
            image: string;
            content: string;
            createdAt: string;
            likes: string[];
            comments: any[];
            countOfVisitors: number;
          }) => (
            <Grid2 key={post._id} size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
              <Paper elevation={10} square={false} sx={{ p: 1 }}>
                <Typography variant="body1" textAlign="center" gutterBottom>
                  <img src={post.image} height={150} alt="" />
                </Typography>

                {/* Başlık */}
                <Typography variant="h6" textAlign="center" gutterBottom>
                  {post.title}
                </Typography>

                {/* İçerik */}
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

                {/* Yayınlanma Tarihi */}
                <Typography variant="body2" gutterBottom>
                  Published Date: {formatDate(post.createdAt)}
                </Typography>

                {/* Butonlar */}
                <Grid2
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid2>
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
                  </Grid2>

                  <Grid2>
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
                  </Grid2>
                </Grid2>
              </Paper>
            </Grid2>
          )
        )}
      </Grid2>
    </Container>
  );
};

export default Blogs;
