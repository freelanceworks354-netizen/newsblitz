import { ArrowLeft, Clock, User, Share2 } from 'lucide-react';
import ArticleCard from './ArticleCard';
import type { Article } from '../types';

interface Props {
  article: Article;
  related: Article[];
  onBack: () => void;
  onReadMore: (slug: string) => void;
}

export default function ArticleDetail({ article, related, onBack, onReadMore }: Props) {
  return (
    <article className="max-w-4xl mx-auto px-4 lg:px-6 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to articles
      </button>

      {article.categories && (
        <span className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-4" style={{ backgroundColor: article.categories.color, color: 'white' }}>
          {article.categories.name}
        </span>
      )}

      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">{article.title}</h1>

      <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-gray-200 dark:border-gray-800 mb-8">
        <div className="flex items-center gap-3">
          {article.author_avatar && (
            <img src={article.author_avatar} alt={article.author_name} className="w-10 h-10 rounded-full object-cover" />
          )}
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{article.author_name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(article.published_at).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{article.read_time} min read</span>
        </div>

        <button className="ml-auto p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      <img src={article.image_url} alt={article.title} className="w-full h-96 object-cover rounded-2xl mb-8" />

      <div className="prose prose-invert max-w-none mb-12">
        {article.content.split('\n\n').map((para, i) => (
          <p key={i} className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      {related.length > 0 && (
        <section className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} onReadMore={onReadMore} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
