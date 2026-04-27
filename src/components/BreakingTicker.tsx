import { AlertTriangle } from 'lucide-react';
import type { Article } from '../types';

interface Props {
  articles: Article[];
}

export default function BreakingTicker({ articles }: Props) {
  if (articles.length === 0) return null;

  return (
    <div className="bg-red-600 text-white py-2.5 border-b border-red-700">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 flex items-center gap-3 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2 shrink-0">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Breaking</span>
        </div>
        <div className="flex gap-6">
          {articles.map((article) => (
            <span key={article.id} className="text-sm font-medium whitespace-nowrap hover:text-red-100 transition-colors cursor-pointer">
              {article.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
