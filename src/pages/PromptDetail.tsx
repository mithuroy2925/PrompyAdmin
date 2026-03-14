import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Heart, Copy, ChevronRight, ChevronDown, Star, Check, Loader2 } from 'lucide-react';
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function PromptDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const promptId = id || '';

  const [promptData, setPromptData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPrompts, setRelatedPrompts] = useState<any[]>([]);

  const [copiedMain, setCopiedMain] = useState(false);
  const [copiedNegative, setCopiedNegative] = useState(false);
  const [showFullPrompt, setShowFullPrompt] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // Scroll to top when ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [promptId]);

  useEffect(() => {
    const fetchPrompt = async () => {
      if (!promptId) return;
      setLoading(true);
      try {
        const docRef = doc(db, 'prompts', promptId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPromptData({
            id: docSnap.id,
            ...data,
            tags: [data.category], // Map category to tags
            image: data.imageUrl,
            likes: 0, // Default likes
          });
          
          // Load liked state
          const saved = localStorage.getItem(`liked_prompt_${promptId}`);
          const liked = saved === 'true';
          setIsLiked(liked);
          setLikesCount(liked ? 1 : 0); // Simplified likes logic for now
        } else {
          console.log("No such document!");
          navigate('/prompts'); // Redirect if not found
        }
      } catch (error) {
        console.error("Error fetching prompt:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompt();
  }, [promptId, navigate]);

  useEffect(() => {
    const fetchRelatedPrompts = async () => {
      try {
        const q = query(collection(db, 'prompts'), orderBy('createdAt', 'desc'), limit(4));
        const querySnapshot = await getDocs(q);
        const fetchedPrompts = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
            image: doc.data().imageUrl,
          }))
          .filter(p => p.id !== promptId) // Exclude current prompt
          .slice(0, 4); // Ensure max 4
        setRelatedPrompts(fetchedPrompts);
      } catch (error) {
        console.error('Error fetching related prompts:', error);
      }
    };

    fetchRelatedPrompts();
  }, [promptId]);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikesCount(newLikedState ? 1 : 0);
    localStorage.setItem(`liked_prompt_${promptId}`, String(newLikedState));
  };

  const handleCopy = async (text: string, type: 'main' | 'negative') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'main') {
        setCopiedMain(true);
        setTimeout(() => setCopiedMain(false), 2000);
      } else {
        setCopiedNegative(true);
        setTimeout(() => setCopiedNegative(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (!promptData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-slate-400">
        Prompt not found.
      </div>
    );
  }

  const mainPrompt = promptData.promptText || '';
  const negativePrompt = promptData.negativePrompt || '';

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-400">
        <Link to="/prompts" className="hover:text-white transition-colors">All Prompts</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white font-medium">{promptData.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image */}
        <div className="space-y-6">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800/50 bg-[#161925]">
            <img 
              src={promptData.image} 
              alt={promptData.title} 
              className="w-full h-auto object-cover"
            />
            <button 
              onClick={handleLike}
              className={`absolute top-4 right-4 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-medium transition-all duration-300 ${
                isLiked 
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                  : 'bg-black/50 text-white hover:bg-black/70 border border-transparent'
              }`}
            >
              <Heart className={`w-4 h-4 transition-colors ${isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
              {likesCount}
            </button>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-48">
            <p className="text-slate-500 text-sm font-medium">Advertisement Space</p>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-white">{promptData.title}</h1>
          
          <div className="flex flex-wrap gap-2">
            {promptData.tags?.map((tag: string) => (
              <button 
                key={tag} 
                onClick={() => navigate(`/prompts?category=${encodeURIComponent(tag)}`)}
                className="px-3 py-1.5 rounded-full bg-slate-800/50 text-slate-300 text-sm border border-slate-700/50 hover:bg-slate-700 hover:text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {promptData.featured && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500 text-white text-sm font-medium">
              <Star className="w-4 h-4 fill-current" />
              Featured
            </div>
          )}

          <p className="text-slate-300 leading-relaxed">
            {mainPrompt.substring(0, 150)}...
          </p>

          {/* Generation Parameters Box */}
          <div className="bg-[#161925] border border-slate-800/50 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-800/50">
              <h3 className="text-white font-medium">Generation Parameters</h3>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-slate-400 text-sm">Model</span>
              <span className="px-3 py-1.5 bg-slate-800/80 text-slate-300 text-xs font-medium rounded-md border border-slate-700/50">
                {promptData.model || 'NANOBANANA-PRO'}
              </span>
            </div>
          </div>

          {/* Prompt Box */}
          <div className="bg-[#161925] border border-slate-800/50 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-800/50">
              <h3 className="text-white font-medium">Prompt</h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleCopy(mainPrompt, 'main')}
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-slate-800 text-slate-300 text-xs sm:text-sm font-medium hover:text-white hover:bg-slate-700 transition-colors border border-slate-700/50"
                >
                  {copiedMain ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  <span className="hidden sm:inline">{copiedMain ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>
            <div className="p-4">
              <p className="text-slate-300 font-mono text-sm leading-relaxed">
                ### Main Prompt<br/>
                {showFullPrompt ? mainPrompt : `${mainPrompt.substring(0, 180)}...`}
              </p>
              <button 
                onClick={() => setShowFullPrompt(!showFullPrompt)}
                className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-sm font-medium mt-4 transition-colors"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${showFullPrompt ? 'rotate-180' : ''}`} />
                {showFullPrompt ? 'Show less' : 'Show full prompt'}
              </button>
            </div>
          </div>

          {/* Negative Prompt Box */}
          {negativePrompt && (
            <div className="bg-[#161925] border border-slate-800/50 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-slate-800/50">
                <h3 className="text-white font-medium">Negative Prompt</h3>
                <button 
                  onClick={() => handleCopy(negativePrompt, 'negative')}
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-slate-800 text-slate-300 text-xs sm:text-sm font-medium hover:text-white hover:bg-slate-700 transition-colors border border-slate-700/50"
                >
                  {copiedNegative ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  <span className="hidden sm:inline">{copiedNegative ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-4">
                <p className="text-slate-400 font-mono text-sm leading-relaxed">
                  {negativePrompt}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Prompts */}
      {relatedPrompts.length > 0 && (
        <div className="pt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Related Prompts</h2>
            <Link to="/prompts" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors">
              View all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedPrompts.map((prompt) => (
              <Link key={prompt.id} to={`/prompt/${prompt.id}`} className="group block bg-[#161925] rounded-xl overflow-hidden border border-slate-800/50 hover:border-indigo-500/50 transition-colors">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={prompt.image} alt={prompt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {prompt.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1.5 rounded-full bg-indigo-500 text-white text-xs font-medium shadow-lg">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium mb-2 line-clamp-1">{prompt.title}</h3>
                  <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
