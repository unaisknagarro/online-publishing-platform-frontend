export interface CommentModel {
  _id: string;
  article: string;
  user: string;
  userName?: string;
  text: string;
  parent?: string | null;
  likes: number;
  createdAt?: string;
  replies: CommentModel[];
}