import { Clock, User } from 'lucide-react';
import type { Article } from '../types';

interface Props {
  article: Article;
  onReadMore: (slug: string) => void;
}

export default function HeroArticle({ article, onReadMore }: Props) {
  return (
    <div
      className="relative h-96 bg-cover bg-center rounded-2xl overflow-hidden cursor-pointer group"
      style={{ backgroundImage: `url('${article.image_url}')` }}
      onClick={() => onReadMore(article.slug)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        {article.categories && (
          <span className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-3" style={{ backgroundColor: article.categories.color }}>
            {article.categories.name}
          </span>
        )}
        <h1 className="text-4xl font-bold mb-3 group-hover:text-opacity-80 transition-opacity leading-tight max-w-3xl">{article.title}</h1>
        <p className="text-red-100 text-lg mb-4 max-w-2xl">{article.excerpt}</p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <User className="w-4 h-4" />
            <span>{article.author_name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Clock className="w-4 h-4" />
            <span>{article.read_time} min read</span>
          </div>
        </div>
      </div>
    </div>
  );
}
