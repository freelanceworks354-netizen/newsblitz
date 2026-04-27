import { Clock, User } from 'lucide-react';
import type { Article } from '../types';

interface Props {
  article: Article;
  onReadMore: (slug: string) => void;
}

export default function ArticleCard({ article, onReadMore }: Props) {
  return (
    <div
      onClick={() => onReadMore(article.slug)}
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg dark:hover:shadow-black/50 transition-all cursor-pointer group"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {article.categories && (
          <span className="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: article.categories.color, color: 'white' }}>
            {article.categories.name}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{article.author_name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{article.read_time}m</span>
          </div>
        </div>
      </div>
    </div>
  );
}
