import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Heart, Zap, Loader2 } from 'lucide-react';
import PromptCard from '../components/PromptCard';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(13);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [prompts, setPrompts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const q = query(collection(db, 'prompts'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedPrompts = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            category: data.category || 'Uncategorized',
            tags: [data.category || 'Uncategorized'], // Map category to tags for PromptCard compatibility
            image: data.imageUrl,
            author: {
              name: 'Admin',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
            },
            likes: 0,
            uses: 0
          };
        });
        setPrompts(fetchedPrompts);
        
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(fetchedPrompts.map(p => p.category)));
        setCategories(['All', ...uniqueCategories]);
      } catch (error) {
        console.error('Error fetching prompts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory('All');
    }
  }, [categoryParam]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
    setVisibleCount(13); // Reset visible count on category change
  };

  // Reset visible count on search query change
  useEffect(() => {
    setVisibleCount(13);
  }, [searchQuery]);

  const filteredPrompts = prompts.filter((prompt) => {
    // Filter by category
    const matchesCategory = activeCategory === 'All' || prompt.category.toLowerCase() === activeCategory.toLowerCase();

    // Filter by search query
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      prompt.title.toLowerCase().includes(searchLower) ||
      prompt.category.toLowerCase().includes(searchLower) ||
      prompt.description.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  const hasMore = visibleCount < filteredPrompts.length;

  const lastPromptElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoadingMore) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setIsLoadingMore(true);
        // Simulate network request delay for better UX
        setTimeout(() => {
          setVisibleCount(prev => prev + 13);
          setIsLoadingMore(false);
        }, 800);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoadingMore, hasMore]);

  const visiblePrompts = filteredPrompts.slice(0, visibleCount);

  if (loading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>;
  }

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-indigo-500 text-white'
                : 'bg-[#161925] text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          {activeCategory === 'All' ? 'AI Prompts' : activeCategory}
        </h1>
        <p className="text-slate-400">
          {activeCategory === 'All' 
            ? 'Browse our collection of AI image generation prompts'
            : 'Explore our curated collection of AI image prompts in this category. Each prompt is tested and optimized for top generators like Midjourney, DALL-E, Stable Diffusion, Leonardo AI, Ideogram, Adobe Firefly, and Playground AI. Create stunning, high-quality images with ease'}
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompts, tags, categories..."
            className="w-full bg-[#161925] border border-slate-800 rounded-lg pl-4 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-500 text-sm">{filteredPrompts.length} prompts</span>
        </div>
      </div>

      {/* Grid */}
      {visiblePrompts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visiblePrompts.map((prompt, index) => {
            if (visiblePrompts.length === index + 1) {
              return (
                <div ref={lastPromptElementRef} key={prompt.id}>
                  <PromptCard prompt={prompt} />
                </div>
              );
            } else {
              return <PromptCard key={prompt.id} prompt={prompt} />;
            }
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">No prompts found matching your search.</p>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoadingMore && (
        <div className="flex justify-center pt-8 pb-4">
          <div className="flex items-center gap-3 text-slate-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="font-medium">Loading more prompts...</span>
          </div>
        </div>
      )}
    </div>
  );
}
