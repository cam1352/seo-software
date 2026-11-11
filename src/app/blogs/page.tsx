"use client";

import { useState, useMemo } from "react";
import { BookOpen, Search, Clock, Calendar, User, ArrowRight, X, Sparkles } from "lucide-react";
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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            100 In-Depth Articles & Ranking Blueprints
          </div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-blue-600" />
            SEO Software Blog & Rank #1 Hub
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Proven engineering guides to dominate organic search, pass Core Web Vitals, and optimize for AI answer engines.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono text-slate-500">Total Publications:</span>
          <div className="text-2xl font-black text-slate-900">{SEO_BLOGS.length} Articles</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across 100 articles (e.g. indexnow, semrush alternative, core web vitals, GEO)..."
            className="w-full bg-slate-50 text-sm text-slate-900 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white"
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
                  ? "bg-blue-600 text-white font-semibold shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200"
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
            className="p-5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md shadow-sm transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {blog.category}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3 h-3" /> {blog.readTime}
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {blog.title}
              </h2>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {blog.excerpt}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-3 h-3" /> {blog.date}
              </span>
              <span className="font-semibold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Guide <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Article Reader Modal */}
      {readingBlog && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 lg:p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setReadingBlog(null)}
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-800 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs uppercase font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                {readingBlog.category}
              </span>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mt-3 leading-tight">
                {readingBlog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-blue-600" /> {readingBlog.author}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {readingBlog.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {readingBlog.readTime}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-sans space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Strategic Blueprint</h3>
              <p>{readingBlog.excerpt}</p>
            </div>

            <div className="text-sm text-slate-800 leading-relaxed space-y-4 whitespace-pre-line font-sans">
              {readingBlog.content}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                {readingBlog.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-slate-100 text-[11px] text-slate-700 font-mono border border-slate-200">
                    #{t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setReadingBlog(null)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm shadow-blue-500/20"
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
