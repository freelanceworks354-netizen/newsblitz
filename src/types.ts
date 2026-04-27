export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  created_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category_id: string;
  author_name: string;
  author_avatar: string;
  is_featured: boolean;
  is_breaking: boolean;
  is_trending: boolean;
  read_time: number;
  views: number;
  published_at: string;
  created_at: string;
  categories?: Category;
}
