import { TrendingUp } from 'lucide-react';
import type { Article } from '../types';

interface Props {
  articles: Article[];
  onReadMore: (slug: string) => void;
}

export default function TrendingSidebar({ articles, onReadMore }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400" />
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Trending Now</h2>
      </div>

      <div className="space-y-4">
        {articles.map((article, idx) => (
          <div
            key={article.id}
            onClick={() => onReadMore(article.slug)}
            className="flex gap-3 cursor-pointer group pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0"
          >
            <div className="text-2xl font-bold text-red-600 dark:text-red-400 shrink-0 w-8">
              {idx + 1}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{article.views.toLocaleString()} views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
