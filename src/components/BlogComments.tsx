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
import { formatDate } from '../helper';
import { Comment } from '../types/commentTypes';

const BlogComments = () => {
  const location = useLocation();
  const blogId = location.state?.id;

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

  return (
    <Box>
      <List>
        {comments?.length === 0 ? (
          <Typography variant="body1">No comments yet.</Typography>
        ) : (
          comments?.map((comment: Comment) => (
            <>
              <ListItem key={comment._id}>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      className="MuiListItemText-primary"
                    >
                      {comment.userId.username}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      className="MuiListItemText-secondary"
                    >
                      <Typography variant="body1" component="span">
                        {formatDate(comment.createdAt)}
                      </Typography>
                      <Typography variant="body1" component="p" sx={{ mt: 1 }}>
                        {comment.comment}
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
