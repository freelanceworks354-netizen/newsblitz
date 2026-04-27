import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import {
  ArrowLeft, Plus, Pencil, Trash2, Eye, EyeOff, Star, AlertTriangle, TrendingUp,
  Sun, Moon, LogOut, Newspaper, FolderOpen, Save, Zap,
} from 'lucide-react';
import type { Article, Category } from '../types';

type Tab = 'articles' | 'categories';

interface Props {
  onBack: () => void;
}

export default function AdminPanel({ onBack }: Props) {
  const { user, loading: authLoading, signIn, signUp, signOut } = useAuth();
  const { dark, toggle: toggleTheme } = useTheme();
  const [tab, setTab] = useState<Tab>('articles');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              News<span className="text-red-500">Blitz</span>{' '}
              <span className="text-gray-400 dark:text-gray-500 font-normal text-lg">Admin</span>
            </span>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {authMode === 'login' ? 'Sign In' : 'Create Account'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {authMode === 'login'
                ? 'Sign in to manage your news portal'
                : 'Register a new admin account'}
            </p>

            {authError && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                {authError}
              </div>
            )}

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setAuthError('');
                setAuthSubmitting(true);
                try {
                  if (authMode === 'login') {
                    await signIn(email, password);
                  } else {
                    await signUp(email, password);
                  }
                } catch (err: any) {
                  setAuthError(err.message || 'Authentication failed');
                }
                setAuthSubmitting(false);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
                  required
                  minLength={6}
                />
              </div>
              <button
                type="submit"
                disabled={authSubmitting}
                className="w-full py-2.5 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {authSubmitting ? 'Please wait...' : authMode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'register' : 'login');
                  setAuthError('');
                }}
                className="text-sm text-red-600 dark:text-red-400 hover:underline"
              >
                {authMode === 'login' ? "Don't have an account? Register" : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>

          <button
            onClick={onBack}
            className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mx-auto transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Admin header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-6 h-14">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Admin <span className="text-gray-400 dark:text-gray-500 font-normal text-sm">Panel</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors">
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">{user.email}</span>
            <button onClick={signOut} className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors" title="Sign out">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Tab bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex gap-1">
          <button
            onClick={() => setTab('articles')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === 'articles'
                ? 'border-red-600 text-red-600 dark:text-red-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Newspaper className="w-4 h-4" /> Articles
          </button>
          <button
            onClick={() => setTab('categories')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === 'categories'
                ? 'border-red-600 text-red-600 dark:text-red-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <FolderOpen className="w-4 h-4" /> Categories
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 lg:px-6 py-6 w-full">
        {tab === 'articles' ? <ArticlesManager /> : <CategoriesManager />}
      </main>
    </div>
  );
}

function ArticlesManager() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Article | null>(null);
  const [creating, setCreating] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    const [artRes, catRes] = await Promise.all([
      supabase.from('articles').select('*, categories(*)').order('created_at', { ascending: false }),
      supabase.from('categories').select('*').order('name'),
    ]);
    if (artRes.data) setArticles(artRes.data as Article[]);
    if (catRes.data) setCategories(catRes.data as Category[]);
    setLoading(false);
  };

  useEffect(() => { fetchArticles(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article? This cannot be undone.')) return;
    await supabase.from('articles').delete().eq('id', id);
    fetchArticles();
  };

  const handleToggle = async (article: Article, field: 'is_featured' | 'is_breaking' | 'is_trending') => {
    await supabase.from('articles').update({ [field]: !article[field] }).eq('id', article.id);
    fetchArticles();
  };

  const handleTogglePublish = async (article: Article) => {
    const newDate = article.published_at ? null : new Date().toISOString();
    await supabase.from('articles').update({ published_at: newDate }).eq('id', article.id);
    fetchArticles();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (editing || creating) {
    return (
      <ArticleForm
        article={editing}
        categories={categories}
        onSave={() => {
          setEditing(null);
          setCreating(false);
          fetchArticles();
        }}
        onCancel={() => {
          setEditing(null);
          setCreating(false);
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Articles ({articles.length})</h2>
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Article</th>
                <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Category</th>
                <th className="text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Status</th>
                <th className="text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Flags</th>
                <th className="text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {a.image_url && (
                        <img src={a.image_url} alt="" className="w-12 h-8 rounded object-cover shrink-0 hidden sm:block" />
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-xs">{a.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{a.author_name || 'No author'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {a.categories && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ color: a.categories.color, backgroundColor: a.categories.color + '18' }}>
                        {a.categories.name}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    <button
                      onClick={() => handleTogglePublish(a)}
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full transition-colors ${
                        a.published_at
                          ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                          : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                      }`}
                    >
                      {a.published_at ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {a.published_at ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => handleToggle(a, 'is_featured')} className={`p-1 rounded transition-colors ${a.is_featured ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' : 'text-gray-300 dark:text-gray-600 hover:text-yellow-500'}`} title="Featured">
                        <Star className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleToggle(a, 'is_breaking')} className={`p-1 rounded transition-colors ${a.is_breaking ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-gray-300 dark:text-gray-600 hover:text-red-500'}`} title="Breaking">
                        <AlertTriangle className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleToggle(a, 'is_trending')} className={`p-1 rounded transition-colors ${a.is_trending ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-300 dark:text-gray-600 hover:text-blue-500'}`} title="Trending">
                        <TrendingUp className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setEditing(a)} className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors" title="Edit">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(a.id)} className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {articles.length === 0 && (
          <div className="text-center py-12 text-gray-400 dark:text-gray-500">
            <Newspaper className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p>No articles yet. Create your first article.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ArticleForm({
  article,
  categories,
  onSave,
  onCancel,
}: {
  article: Article | null;
  categories: Category[];
  onSave: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    title: article?.title || '',
    slug: article?.slug || '',
    excerpt: article?.excerpt || '',
    content: article?.content || '',
    image_url: article?.image_url || '',
    category_id: article?.category_id || '',
    author_name: article?.author_name || '',
    author_avatar: article?.author_avatar || '',
    is_featured: article?.is_featured || false,
    is_breaking: article?.is_breaking || false,
    is_trending: article?.is_trending || false,
    read_time: article?.read_time || 3,
    published: !!article?.published_at,
  });
  const [saving, setSaving] = useState(false);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const data = {
      title: form.title,
      slug: form.slug || generateSlug(form.title),
      excerpt: form.excerpt,
      content: form.content,
      image_url: form.image_url,
      category_id: form.category_id || null,
      author_name: form.author_name,
      author_avatar: form.author_avatar,
      is_featured: form.is_featured,
      is_breaking: form.is_breaking,
      is_trending: form.is_trending,
      read_time: form.read_time,
      published_at: form.published ? new Date().toISOString() : null,
    };

    if (article) {
      await supabase.from('articles').update(data).eq('id', article.id);
    } else {
      await supabase.from('articles').insert(data);
    }

    setSaving(false);
    onSave();
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onCancel} className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {article ? 'Edit Article' : 'New Article'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => {
                  setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) });
                }}
                className="w-full px-3 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full px-3 py-2.5 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-600 dark:text-gray-400 font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={2}
                className="w-full px-3 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Content</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={12}
                className="w-full px-3 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white resize-y"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category</label>
              <select
                value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                className="w-full px-3 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
              >
                <option value="">None</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Author Name</label>
              <input
                type="text"
                value={form.author_name}
                onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                className="w-full px-3 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Author Avatar URL</label>
              <input
                type="url"
                value={form.author_avatar}
                onChange={(e) => setForm({ ...form, author_avatar: e.target.value })}
                className="w-full px-3 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Image URL</label>
              <input
                type="url"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                className="w-full px-3 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Read Time (min)</label>
              <input
                type="number"
                value={form.read_time}
                onChange={(e) => setForm({ ...form, read_time: parseInt(e.target.value) || 3 })}
                min={1}
                className="w-full px-3 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Flags</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="w-4 h-4 text-red-600 border-gray-300 dark:border-gray-600 rounded focus:ring-red-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Published</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                className="w-4 h-4 text-red-600 border-gray-300 dark:border-gray-600 rounded focus:ring-red-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Featured (Hero)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_breaking}
                onChange={(e) => setForm({ ...form, is_breaking: e.target.checked })}
                className="w-4 h-4 text-red-600 border-gray-300 dark:border-gray-600 rounded focus:ring-red-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Breaking News</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_trending}
                onChange={(e) => setForm({ ...form, is_trending: e.target.checked })}
                className="w-4 h-4 text-red-600 border-gray-300 dark:border-gray-600 rounded focus:ring-red-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Trending</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : article ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Category | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: '', slug: '', color: '#2563eb' });

  const fetchCategories = async () => {
    setLoading(true);
    const { data } = await supabase.from('categories').select('*').order('name');
    if (data) setCategories(data as Category[]);
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (editing) {
      await supabase.from('categories').update({ name: form.name, slug, color: form.color }).eq('id', editing.id);
    } else {
      await supabase.from('categories').insert({ name: form.name, slug, color: form.color });
    }

    setEditing(null);
    setCreating(false);
    setForm({ name: '', slug: '', color: '#2563eb' });
    fetchCategories();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category? Articles in this category will lose their category.')) return;
    await supabase.from('categories').delete().eq('id', id);
    fetchCategories();
  };

  const startEdit = (cat: Category) => {
    setEditing(cat);
    setCreating(true);
    setForm({ name: cat.name, slug: cat.slug, color: cat.color });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Categories ({categories.length})</h2>
        {!creating && (
          <button
            onClick={() => {
              setCreating(true);
              setEditing(null);
              setForm({ name: '', slug: '', color: '#2563eb' });
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> New Category
          </button>
        )}
      </div>

      {creating && (
        <form onSubmit={handleSave} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })}
                className="w-full px-3 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full px-3 py-2.5 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-600 dark:text-gray-400 font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-700 cursor-pointer"
                />
                <input
                  type="text"
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="flex-1 px-3 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white font-mono"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
              <Save className="w-4 h-4" /> {editing ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => {
                setCreating(false);
                setEditing(null);
              }}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between group hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{cat.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">{cat.slug}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => startEdit(cat)} className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors" title="Edit">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(cat.id)} className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors" title="Delete">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && !creating && (
        <div className="text-center py-12 text-gray-400 dark:text-gray-500">
          <FolderOpen className="w-10 h-10 mx-auto mb-2 opacity-50" />
          <p>No categories yet. Create your first category.</p>
        </div>
      )}
    </div>
  );
}
