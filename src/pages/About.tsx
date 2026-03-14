import { Star, Users, Gift, TrendingUp, ChevronDown } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-24 py-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white">About Prompy</h1>
        <p className="text-xl text-slate-400">Your ultimate destination for high-quality AI image prompts</p>
        
        <div className="mt-12 p-8 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 max-w-3xl mx-auto">
          <p className="text-lg text-indigo-100 leading-relaxed">
            Our mission is to democratize AI art creation by providing a comprehensive library of tested, high-quality prompts that help artists, designers, and creators bring their visions to life.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">Our Story</h2>
        <div className="space-y-6 text-slate-300 leading-relaxed">
          <p>
            Prompy was born from a simple observation: while AI image generation tools were becoming increasingly powerful, finding the right prompts to create stunning images remained a challenge. Artists and creators spent hours experimenting, often with inconsistent results.
          </p>
          <p>
            We set out to solve this problem by building a curated library of prompts that actually work. Each prompt in our collection has been tested across multiple AI models, refined for optimal results, and organized to help you find exactly what you need.
          </p>
          <p>
            What started as a small collection has grown into a thriving community of creators who share, discover, and learn from each other. Today, Prompy serves thousands of artists worldwide, helping them create better AI art faster.
          </p>
          <p>
            We believe that great tools should be accessible to everyone. That's why Prompy is and always will be free. Our goal is to empower creativity, not gatekeep it.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="space-y-12">
        <h2 className="text-3xl font-bold text-white text-center">What We Stand For</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#161925] p-8 rounded-2xl border border-slate-800/50">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6">
              <Star className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Curated Quality</h3>
            <p className="text-slate-400 leading-relaxed">
              Every prompt is carefully reviewed and tested to ensure it produces stunning results across different AI models.
            </p>
          </div>

          <div className="bg-[#161925] p-8 rounded-2xl border border-slate-800/50">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Community First</h3>
            <p className="text-slate-400 leading-relaxed">
              Built by creators, for creators. We listen to our community and continuously improve based on your feedback.
            </p>
          </div>

          <div className="bg-[#161925] p-8 rounded-2xl border border-slate-800/50">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6">
              <Gift className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Always Free</h3>
            <p className="text-slate-400 leading-relaxed">
              Access to high-quality prompts should be free for everyone. No paywalls, no subscriptions, just creativity.
            </p>
          </div>

          <div className="bg-[#161925] p-8 rounded-2xl border border-slate-800/50">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Constantly Growing</h3>
            <p className="text-slate-400 leading-relaxed">
              New prompts added daily. Our library expands with the latest trends and techniques in AI image generation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
