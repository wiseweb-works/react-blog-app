export type Post = {
  _id: string;
  title: string;
  image: string;
  categoryId: { _id: string; name: string };
  isPublish: boolean;
  content: string;
};

export interface UpdateBlogModalProps {
  open: boolean;
  handleClose: () => void;
  post: Post;
  refetch: () => void;
}
