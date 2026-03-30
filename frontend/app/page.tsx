"use client";

import { useState } from "react";
import { Loader2, Sparkles, Send } from "lucide-react";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, tone, length }),
      });
      const data = await response.json();
      setContent(data.content);
    } catch (err) {
      console.error(err);
      alert("Failed to generate content. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#061A14] text-emerald-50 selection:bg-emerald-500/30 font-sans overflow-hidden flex flex-col">
      {/* Top Navigation Bar */}
      <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-[#061A14]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-500 p-2 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            <Sparkles className="text-emerald-950" size={20} />
          </div>
          <h1 className="text-xl font-black tracking-tighter uppercase">SEOGenius <span className="text-emerald-500">PRO</span></h1>
        </div>
        <div className="flex items-center gap-6">
           <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">System Optimized</span>
           </div>
           <button className="bg-emerald-500 text-emerald-950 px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
              Export Post
           </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Configuration - Bento Style */}
        <aside className="w-96 border-r border-white/5 p-8 overflow-y-auto space-y-8 hidden lg:block">
           <div className="space-y-6">
              <h3 className="text-[10px] font-black text-emerald-500/50 uppercase tracking-[0.2em]">Post Configuration</h3>
              
              <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-emerald-100/60 uppercase tracking-wider">Primary Keyword</label>
                    <input
                      type="text"
                      placeholder="e.g. AI Automation"
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm font-medium"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-bold text-emerald-100/60 uppercase tracking-wider">Content Tone</label>
                    <select
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm font-medium appearance-none cursor-pointer"
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                    >
                      <option value="professional">👔 Professional</option>
                      <option value="conversational">💬 Conversational</option>
                      <option value="technical">🛠️ Technical</option>
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-bold text-emerald-100/60 uppercase tracking-wider">Target Length</label>
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                       <input 
                         type="range" 
                         min="500" 
                         max="3000" 
                         step="100"
                         className="flex-1 accent-emerald-500"
                         value={length}
                         onChange={(e) => setLength(parseInt(e.target.value))}
                       />
                       <span className="text-xs font-black text-emerald-500">{length}w</span>
                    </div>
                 </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !keyword}
                className="w-full bg-emerald-500 text-emerald-950 p-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all active:scale-95 disabled:opacity-20 disabled:grayscale shadow-2xl shadow-emerald-500/20"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                {loading ? "GENERATING..." : "BUILD CONTENT"}
              </button>
           </div>

           {/* AI SEO Bento Cards */}
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center space-y-1">
                 <p className="text-[10px] font-bold text-emerald-500/50 uppercase">SEO Score</p>
                 <p className="text-2xl font-black">98</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center space-y-1">
                 <p className="text-[10px] font-bold text-emerald-500/50 uppercase">Readability</p>
                 <p className="text-2xl font-black">High</p>
              </div>
           </div>
        </aside>

        {/* Main Editor Area */}
        <section className="flex-1 bg-[#04120E] relative overflow-y-auto p-12 lg:p-24">
           {content ? (
             <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="space-y-4 border-b border-white/5 pb-12">
                   <h2 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Generated Draft</h2>
                   <h3 className="text-5xl font-black tracking-tighter leading-tight text-white">The Power of {keyword} in Modern Workflows</h3>
                </div>
                <div className="prose prose-invert prose-emerald max-w-none prose-p:text-emerald-100/80 prose-p:leading-loose prose-p:text-lg prose-headings:text-white prose-headings:tracking-tighter whitespace-pre-wrap font-medium">
                  {content}
                </div>
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-center space-y-8 opacity-20 group hover:opacity-40 transition-opacity duration-700">
                <div className="p-12 bg-white/5 rounded-[3rem] border border-white/10 shadow-2xl relative">
                   <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full"></div>
                   <Sparkles size={80} className="text-emerald-500 relative z-10" />
                </div>
                <div className="max-w-md space-y-4">
                   <h2 className="text-3xl font-black tracking-tighter text-white uppercase">Waiting for Input</h2>
                   <p className="text-emerald-100/60 font-medium leading-relaxed">Configure your keywords and tone in the sidebar to generate high-performance SEO content.</p>
                </div>
             </div>
           )}
        </section>
      </div>
    </main>
  );
}
