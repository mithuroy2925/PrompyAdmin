import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Zap, ChevronDown, Loader2 } from 'lucide-react';
import PromptCard from '../components/PromptCard';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { useSettings } from '../contexts/SettingsContext';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [popularPrompts, setPopularPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { websiteName } = useSettings();

  useEffect(() => {
    const fetchPopularPrompts = async () => {
      try {
        const q = query(collection(db, 'prompts'), orderBy('createdAt', 'desc'), limit(6));
        const querySnapshot = await getDocs(q);
        const fetchedPrompts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          tags: [doc.data().category],
          image: doc.data().imageUrl,
          author: {
            name: 'Admin',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
          },
          likes: 0,
          uses: 0
        }));
        setPopularPrompts(fetchedPrompts);
      } catch (error) {
        console.error('Error fetching popular prompts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularPrompts();
  }, []);

  const faqs = [
    {
      question: `What is ${websiteName}?`,
      answer: `${websiteName} is a platform dedicated to sharing high-quality AI image generation prompts. We curate and organize prompts to help creators produce amazing images using AI tools like Midjourney v6, DALL-E 3, Flux, Stable Diffusion XL, Leonardo AI, and nanobanana.`
    },
    {
      question: 'What are AI image prompts and why are they important?',
      answer: "AI image prompts are text descriptions that guide AI to generate specific styles or content. A well-crafted prompt can significantly improve the quality, accuracy, and artistic value of generated images. It's like a language for communicating with AI - mastering prompts is key to creating excellent AI art."
    },
    {
      question: `Which AI platforms does ${websiteName} support?`,
      answer: 'Our prompts support mainstream AI image generation platforms including Midjourney v6, DALL-E 3, Flux, Stable Diffusion XL, Leonardo AI, Adobe Firefly, and nanobanana. Each prompt is tagged with compatible platforms and recommended parameters.'
    },
    {
      question: 'How do I use these prompts?',
      answer: "It's simple: 1) Browse or search for prompts you're interested in 2) Click to view details and generation parameters 3) Copy the prompt text 4) Paste it into your AI platform (like Midjourney's chat) 5) Adjust parameters as needed."
    }
  ];

  return (
    <div className="space-y-24 pb-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-12">
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
          {websiteName} - AI Art Gallery
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Discover and copy free AI art prompts. Browse our curated gallery of prompts for Midjourney, DALL-E, Stable Diffusion and more.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link to="/prompts" className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors">
            Browse All Prompts
          </Link>
        </div>
      </div>

      {/* Popular Prompts */}
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Most Popular Prompts</h2>
          <p className="text-slate-400 text-lg">
            Discover the most liked and highly rated prompt images in our gallery. These prompts have inspired countless creators.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        )}
      </div>

      {/* What is a Prompy */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-white">What is a Prompy?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-300 leading-relaxed">
          <div className="space-y-6">
            <p>
              A prompt image is an AI-generated artwork created using text descriptions called prompts. Each prompt image in our gallery demonstrates the incredible power of modern AI art generation. When you browse our prompt image collection, you'll discover endless creative possibilities.
            </p>
            <p>
              Our prompt image gallery features diverse styles and subjects. From photorealistic prompt images to abstract art, fantasy landscapes, and character designs, every prompt image tells a unique story. Artists and creators worldwide use prompt images as inspiration for their own projects.
            </p>
          </div>
          <div className="space-y-6">
            <p>
              Creating the perfect prompt image requires understanding AI art generation techniques. Our platform helps you learn by showing successful prompt image examples with their original prompts. Study how different prompts produce various prompt image styles and effects.
            </p>
            <p>
              Whether you're new to AI art or an experienced creator, our prompt image community welcomes everyone. Share your own prompt images, discover trending prompt image styles, and connect with fellow artists. Start exploring our prompt image gallery today and unleash your creativity.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose */}
      <div className="space-y-12">
        <h2 className="text-3xl font-bold text-white text-center">Why Choose Our {websiteName} Platform</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#161925] p-8 rounded-2xl border border-slate-800/50">
            <h3 className="text-xl font-bold text-white mb-4">Curated Prompy Collection</h3>
            <p className="text-slate-400 leading-relaxed">
              Browse our handpicked prompt image gallery featuring high-quality AI artwork. Every prompt image is carefully selected for creativity and technical excellence.
            </p>
          </div>
          <div className="bg-[#161925] p-8 rounded-2xl border border-slate-800/50">
            <h3 className="text-xl font-bold text-white mb-4">Learn from Prompys</h3>
            <p className="text-slate-400 leading-relaxed">
              Each prompt image includes detailed generation parameters. Study successful prompts to improve your own prompt image creation skills.
            </p>
          </div>
          <div className="bg-[#161925] p-8 rounded-2xl border border-slate-800/50">
            <h3 className="text-xl font-bold text-white mb-4">Active Community</h3>
            <p className="text-slate-400 leading-relaxed">
              Join thousands of creators sharing prompt images daily. Get feedback, share techniques, and discover new prompt image trends.
            </p>
          </div>
        </div>
      </div>

      {/* About Prompy */}
      <div className="space-y-12 text-center">
        <h2 className="text-3xl font-bold text-white">About {websiteName}: The Ultimate AI Art Resource</h2>
        <p className="text-slate-400 max-w-4xl mx-auto leading-relaxed">
          Welcome to {websiteName}, the ultimate destination for AI art enthusiasts and creators. We are dedicated to exploring the fascinating world of the promptimage, where text meets visual creativity. Our platform serves as a bridge between your imagination and the limitless possibilities of AI generation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-12">
          <div className="bg-[#161925] p-8 rounded-2xl border border-slate-800/50">
            <h3 className="text-xl font-bold text-white mb-4">Mastering the Promptimage</h3>
            <p className="text-slate-400 leading-relaxed">
              Creating a perfect promptimage requires more than just luck; it requires skill and understanding. Our library provides detailed parameters for every promptimage, allowing you to reverse-engineer the magic. Whether you use Midjourney v6, DALL-E 3, Flux, Stable Diffusion XL, Leonardo AI, or nanobanana, you'll find the specific prompts you need.
            </p>
          </div>
          <div className="bg-[#161925] p-8 rounded-2xl border border-slate-800/50">
            <h3 className="text-xl font-bold text-white mb-4">A Curated Gallery</h3>
            <p className="text-slate-400 leading-relaxed">
              Not all AI art is created equal. We meticulously curate our collection to ensure that every promptimage featured on our site represents the highest quality. From photorealistic portraits to abstract dreamscapes, our gallery is a testament to what's possible when human creativity guides AI algorithms.
            </p>
          </div>
          <div className="bg-[#161925] p-8 rounded-2xl border border-slate-800/50">
            <h3 className="text-xl font-bold text-white mb-4">Community and Sharing</h3>
            <p className="text-slate-400 leading-relaxed">
              The world of promptimage creation is evolving rapidly. We believe in the power of community knowledge. By sharing your promptimage workflows and discoveries, you help others learn and grow. Our platform is built on the spirit of open collaboration.
            </p>
          </div>
          <div className="bg-[#161925] p-8 rounded-2xl border border-slate-800/50">
            <h3 className="text-xl font-bold text-white mb-4">Future of AI Art</h3>
            <p className="text-slate-400 leading-relaxed">
              As AI technology advances, so does the complexity of the promptimage. We stay ahead of the curve, constantly updating our resources with the latest techniques and models. Join us on this journey and stay at the forefront of the promptimage revolution.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-12 max-w-3xl mx-auto">
        <div className="text-center space-y-4">
          <span className="text-indigo-400 font-bold tracking-wider text-sm uppercase">FAQ</span>
          <h2 className="text-3xl font-bold text-white">Find answers to common questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-slate-800/50 pb-4">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex items-center justify-between w-full text-left py-4 text-white font-medium hover:text-indigo-400 transition-colors"
              >
                {faq.question}
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="pb-4 text-slate-400 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="bg-[#161925] rounded-3xl p-12 border border-slate-800/50 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">About {websiteName}</h2>
          <p className="text-slate-400 leading-relaxed">
            {websiteName} is your ultimate destination for discovering and sharing AI art prompts. Our curated <strong className="text-white">prompt image</strong> gallery features thousands of high-quality prompts for Midjourney, DALL-E, Stable Diffusion, and more. Each <strong className="text-white">prompt image</strong> in our collection includes detailed parameters and settings to help you recreate stunning AI artwork.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/prompts" className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors">
              Browse Gallery
            </Link>
            <Link to="/about" className="px-6 py-2.5 bg-[#0f111a] hover:bg-slate-800 text-slate-300 font-medium rounded-lg border border-slate-700/50 transition-colors">
              About Us
            </Link>
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h4 className="text-white font-bold mb-2">Curated Prompy Collection</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Browse our handpicked <strong className="text-slate-300">prompt image</strong> gallery featuring the best AI-generated artwork and their prompts.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h4 className="text-white font-bold mb-2">Free to Use</h4>
              <p className="text-slate-400 text-sm leading-relaxed">All <strong className="text-slate-300">prompt image</strong> examples are free to copy and use in your favorite AI image generators.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h4 className="text-white font-bold mb-2">Learn & Create</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Study successful <strong className="text-slate-300">prompt image</strong> techniques and create your own stunning AI artwork.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
