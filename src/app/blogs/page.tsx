"use client";

import { useState, useMemo } from "react";
import { BookOpen, Search, Clock, Calendar, User, ArrowRight, X, Sparkles, Tag, CheckCircle } from "lucide-react";
import { SEO_BLOGS, BlogPost } from "@/lib/blog-data";

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [readingBlog, setReadingBlog] = useState<BlogPost | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    SEO_BLOGS.forEach((b) => set.add(b.category));
    return ["ALL", ...Array.from(set)];
  }, []);

  const filteredBlogs = useMemo(() => {
    return SEO_BLOGS.filter((b) => {
      if (selectedCategory !== "ALL" && b.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q) || b.tags.some(t => t.toLowerCase().includes(q));
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            100 In-Depth Articles & Ranking Blueprints
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-[#FF642D]" />
            SEO Software Blog & Rank #1 Hub
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Proven engineering guides to dominate organic search, pass Core Web Vitals, and optimize for AI answer engines.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono text-gray-400">Total Publications:</span>
          <div className="text-2xl font-black text-white">{SEO_BLOGS.length} Articles</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#141824] border border-[#232B3B] space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across 100 articles (e.g. indexnow, semrush alternative, core web vitals, GEO)..."
            className="w-full bg-[#0E121A] text-sm text-gray-100 placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-lg border border-[#283244] focus:outline-none focus:border-[#FF642D]"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-[#FF642D] text-white font-semibold shadow"
                  : "bg-[#0E121A] text-gray-400 hover:text-white border border-[#232B3B]"
              }`}
            >
              {cat === "ALL" ? "All Topics (100)" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBlogs.map((blog) => (
          <article
            key={blog.id}
            onClick={() => setReadingBlog(blog)}
            className="p-5 rounded-xl bg-[#141824] border border-[#232B3B] hover:border-[#FF642D]/50 hover:bg-[#181D2C] transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span className="font-semibold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                  {blog.category}
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  <Clock className="w-3 h-3" /> {blog.readTime}
                </span>
              </div>

              <h2 className="text-base font-bold text-white group-hover:text-[#FF642D] transition-colors line-clamp-2">
                {blog.title}
              </h2>

              <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                {blog.excerpt}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-[#232B3B] flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5 text-gray-400">
                <Calendar className="w-3 h-3" /> {blog.date}
              </span>
              <span className="font-semibold text-[#FF642D] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Guide <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Article Reader Modal */}
      {readingBlog && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8">
          <div className="bg-[#141824] border border-[#2B3447] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 lg:p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setReadingBlog(null)}
              className="absolute right-5 top-5 text-gray-400 hover:text-white p-2 rounded-lg bg-[#1E2536]"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs uppercase font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">
                {readingBlog.category}
              </span>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-white mt-3 leading-tight">
                {readingBlog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-3 pt-3 border-t border-[#232B3B]">
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-[#FF642D]" /> {readingBlog.author}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {readingBlog.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {readingBlog.readTime}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0E121A] border border-[#232B3B] text-xs text-gray-300 leading-relaxed font-sans space-y-3">
              <h3 className="font-bold text-white text-sm">Strategic Blueprint</h3>
              <p>{readingBlog.excerpt}</p>
            </div>

            <div className="text-sm text-gray-200 leading-relaxed space-y-4 whitespace-pre-line font-sans">
              {readingBlog.content}
            </div>

            <div className="pt-4 border-t border-[#232B3B] flex items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                {readingBlog.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-[#1F2637] text-[11px] text-gray-300 font-mono">
                    #{t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setReadingBlog(null)}
                className="px-4 py-2 rounded-lg bg-[#FF642D] hover:bg-[#E55724] text-white text-xs font-bold transition-all"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
