import { useState } from 'react';
import { useArticles, useArticle } from './hooks/useArticles';
import Header from './components/Header';
import BreakingTicker from './components/BreakingTicker';
import HeroArticle from './components/HeroArticle';
import ArticleCard from './components/ArticleCard';
import ArticleDetail from './components/ArticleDetail';
import TrendingSidebar from './components/TrendingSidebar';
import Footer from './components/Footer';
import LoadingSkeleton from './components/LoadingSkeleton';
import AdminPanel from './components/AdminPanel';

type View = 'home' | 'admin';

function App() {
  const {
    featured,
    breaking,
    trending,
    latest,
    categories,
    loading,
    activeCategory,
    setActiveCategory,
  } = useArticles();

  const [view, setView] = useState<View>('home');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { article, related, loading: articleLoading } = useArticle(selectedSlug || '');

  const handleReadMore = (slug: string) => {
    setSelectedSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedSlug(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedSlug(null);
  };

  const filteredArticles = searchQuery
    ? latest.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.author_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : latest;

  if (view === 'admin') {
    return <AdminPanel onBack={() => setView('home')} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" />
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors">
      <BreakingTicker articles={breaking} />
      <Header
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={(slug) => {
          setActiveCategory(slug);
          setSearchQuery('');
        }}
        onSearch={handleSearch}
        onAdminClick={() => setView('admin')}
      />

      <main className="flex-1">
        {selectedSlug && article ? (
          articleLoading ? (
            <LoadingSkeleton />
          ) : (
            <ArticleDetail
              article={article}
              related={related}
              onBack={handleBack}
              onReadMore={handleReadMore}
            />
          )
        ) : (
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            {featured && !searchQuery && (
              <section className="mb-10">
                <HeroArticle article={featured} onReadMore={handleReadMore} />
              </section>
            )}

            {searchQuery && (
              <div className="mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing results for "<span className="font-semibold text-gray-900 dark:text-white">{searchQuery}</span>"
                  {filteredArticles.length === 0 && ' — no articles found'}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {searchQuery ? 'Search Results' : activeCategory ? categories.find(c => c.slug === activeCategory)?.name || 'Articles' : 'Latest Stories'}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{filteredArticles.length} articles</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onReadMore={handleReadMore}
                    />
                  ))}
                </div>
                {filteredArticles.length === 0 && !searchQuery && (
                  <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                    <p className="text-lg">No articles in this category yet.</p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <TrendingSidebar articles={trending} onReadMore={handleReadMore} />

                <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-2">Stay Informed</h3>
                  <p className="text-red-100 text-sm mb-4">
                    Get breaking news and top stories delivered to your inbox every morning.
                  </p>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-3 py-2.5 text-sm bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 placeholder-red-200 text-white mb-3"
                  />
                  <button className="w-full py-2.5 bg-white text-red-600 text-sm font-bold rounded-lg hover:bg-red-50 transition-colors">
                    Subscribe Free
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer categories={categories} onAdminClick={() => setView('admin')} />
    </div>
  );
}

export default App;
