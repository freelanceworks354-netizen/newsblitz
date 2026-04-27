import { useState } from 'react';
import { Search, Menu, X, Zap, Sun, Moon, Shield } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import type { Category } from '../types';

interface Props {
  categories: Category[];
  activeCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
  onSearch: (query: string) => void;
  onAdminClick: () => void;
}

export default function Header({ categories, activeCategory, onCategoryChange, onSearch, onAdminClick }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { dark, toggle } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                News<span className="text-red-500">Blitz</span>
              </span>
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => onCategoryChange(null)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                !activeCategory
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(activeCategory === cat.slug ? null : cat.slug)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  activeCategory === cat.slug
                    ? 'text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                style={activeCategory === cat.slug ? { backgroundColor: cat.color } : {}}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-48 px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                    onSearch('');
                  }}
                  className="ml-2 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={toggle}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={onAdminClick}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="Admin Panel"
            >
              <Shield className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="px-4 py-3 flex flex-wrap gap-2">
            <button
              onClick={() => {
                onCategoryChange(null);
                setMobileOpen(false);
              }}
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                !activeCategory
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onCategoryChange(activeCategory === cat.slug ? null : cat.slug);
                  setMobileOpen(false);
                }}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  activeCategory === cat.slug ? 'text-white' : 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
                }`}
                style={activeCategory === cat.slug ? { backgroundColor: cat.color } : {}}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="px-4 pb-3">
            <button
              onClick={() => {
                onAdminClick();
                setMobileOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors w-full"
            >
              <Shield className="w-4 h-4" /> Admin Panel
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
