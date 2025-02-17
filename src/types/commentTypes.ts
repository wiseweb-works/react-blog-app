export interface Comment {
  _id: string;
  userId: {
    username: string;
  };
  createdAt: string;
  comment: string;
}
