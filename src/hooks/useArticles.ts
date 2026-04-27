import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Article, Category } from '../types';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [articlesRes, categoriesRes] = await Promise.all([
        supabase
          .from('articles')
          .select('*, categories(*)')
          .not('published_at', 'is', null)
          .order('published_at', { ascending: false }),
        supabase.from('categories').select('*').order('name'),
      ]);

      if (articlesRes.data) setArticles(articlesRes.data as Article[]);
      if (categoriesRes.data) setCategories(categoriesRes.data as Category[]);
      setLoading(false);
    }
    fetchData();
  }, []);

  const featured = articles.find((a) => a.is_featured);
  const breaking = articles.filter((a) => a.is_breaking);
  const trending = articles.filter((a) => a.is_trending).slice(0, 5);

  const filtered = activeCategory
    ? articles.filter((a) => a.categories?.slug === activeCategory)
    : articles;

  const latest = filtered.filter((a) => !a.is_featured).slice(0, 9);

  return {
    articles: filtered,
    featured,
    breaking,
    trending,
    latest,
    categories,
    loading,
    activeCategory,
    setActiveCategory,
  };
}

export function useArticle(slug: string) {
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      setLoading(true);
      const { data } = await supabase
        .from('articles')
        .select('*, categories(*)')
        .eq('slug', slug)
        .not('published_at', 'is', null)
        .maybeSingle();

      if (data) {
        setArticle(data as Article);
        if (data.category_id) {
          const { data: relatedData } = await supabase
            .from('articles')
            .select('*, categories(*)')
            .eq('category_id', data.category_id)
            .neq('id', data.id)
            .not('published_at', 'is', null)
            .limit(3);
          if (relatedData) setRelated(relatedData as Article[]);
        }
      }
      setLoading(false);
    }
    if (slug) fetchArticle();
  }, [slug]);

  return { article, related, loading };
}
