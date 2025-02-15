import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Divider,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router';
import { fetchCommentsByBlogId } from '../services/postService';

const BlogComments = () => {
  const location = useLocation();
  const blogId = location.state?.id;
  const formatDate = (isoString: string): string => {
    return new Date(isoString).toLocaleString('en-US');
  };

  interface Comment {
    id: string;
    userId: {
      username: string;
    };
    createdAt: string;
    comment: string;
  }

  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['comments', blogId],
    queryFn: () => fetchCommentsByBlogId(blogId),
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Typography color="error">
        {error instanceof Error
          ? error.message
          : 'An error occurred while receiving comments'}
      </Typography>
    );
  }

  console.log(comments);
  return (
    <Box>
      <List>
        {comments?.length === 0 ? (
          <Typography variant="body1">No comments yet.</Typography>
        ) : (
          comments?.map((comment: Comment) => (
            <>
              <ListItem key={comment.id}>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      className="MuiListItemText-primary"
                    >
                      {comment.userId.username} {/* Yorum yazarı */}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      className="MuiListItemText-secondary"
                    >
                      <Typography variant="body1" component="span">
                        {formatDate(comment.createdAt)} {/* Yorum tarihi */}
                      </Typography>
                      <Typography variant="body1" component="p" sx={{ mt: 1 }}>
                        {comment.comment} {/* Yorum içeriği */}
                      </Typography>
                    </Typography>
                  }
                />
              </ListItem>
              <Divider />
            </>
          ))
        )}
      </List>
    </Box>
  );
};

export default BlogComments;
