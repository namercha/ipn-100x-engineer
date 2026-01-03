export interface BlogPost {
  id: string;
  restaurantId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  featuredImage?: string;
  tags: string[];
}
