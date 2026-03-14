import { useState, useEffect, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Zap } from 'lucide-react';

interface Prompt {
  id: string;
  title: string;
  image: string;
  tags: string[];
  likes?: number;
  featured?: boolean;
}

interface PromptCardProps {
  prompt: Prompt;
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(() => {
    const saved = localStorage.getItem(`liked_prompt_${prompt.id}`);
    return saved === 'true';
  });

  useEffect(() => {
    const saved = localStorage.getItem(`liked_prompt_${prompt.id}`);
    const liked = saved === 'true';
    setIsLiked(liked);
  }, [prompt.id]);

  const handleLike = (e: MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the prompt detail page
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    localStorage.setItem(`liked_prompt_${prompt.id}`, String(newLikedState));
  };

  const handleTagClick = (e: MouseEvent, tag: string) => {
    e.preventDefault();
    navigate(`/prompts?category=${encodeURIComponent(tag)}`);
  };

  return (
    <Link to={`/prompt/${prompt.id}`} className="group block bg-[#161925] rounded-xl overflow-hidden border border-slate-800/50 hover:border-indigo-500/50 transition-colors">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={prompt.image} alt={prompt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        
        {/* Overlay Top */}
        <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-black/60 to-transparent">
          <button 
            onClick={handleLike}
            className={`p-2 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
              isLiked 
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                : 'bg-black/40 text-white hover:bg-black/60 border border-transparent'
            }`}
          >
            <Heart className={`w-4 h-4 transition-colors ${isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
          </button>
          <div className="flex gap-2">
            {prompt.featured && (
              <span className="px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium backdrop-blur-sm border border-indigo-500/30">
                Featured
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-medium mb-3 line-clamp-1">{prompt.title}</h3>
        <div className="flex flex-wrap gap-2">
          {prompt.tags.map(tag => (
            <button 
              key={tag} 
              onClick={(e) => handleTagClick(e, tag)}
              className="px-2.5 py-1 rounded-md bg-slate-800/50 text-slate-400 text-xs border border-slate-700/50 hover:bg-slate-700 hover:text-white transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </Link>
  );
}
