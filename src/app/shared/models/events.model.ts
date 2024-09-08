export interface Events {
  id?: number;
  title?: string;
  content?: string;
  author?: string;
  category?: string;
  tags?: string;
  published_date?: string;
  is_published?: boolean;
  views?: string;
  attachments?: string;
  userID?: string;
  images?: any;
}

export interface EventImage {
  id?: number;
  userID: Number;
  postID: Number;
  image: any;
  path?: string;
}
