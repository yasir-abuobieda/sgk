'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockNews } from '@/data/news';

const categories = ['الكل', 'فعاليات', 'شراكات', 'مبادرات', 'أخبار المجلس'];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('الكل');

  const filteredNews = mockNews.filter(news => 
    activeCategory === 'الكل' ? true : news.category === activeCategory
  );

  return (
    <div className="py-20 px-4 bg-slate-50 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-maroon mb-4">أخبار المجلس</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            تغطية شاملة لآخر تحركاتنا، شراكاتنا، وإنجازات الشباب السوداني.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button 
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${
                activeCategory === category 
                  ? 'bg-brand-maroon text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map(news => (
            <Link href={`/news/${news.slug}`} key={news.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col cursor-pointer block">
              <div className="relative h-56 w-full overflow-hidden bg-slate-200">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur text-brand-maroon px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    {news.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-3 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                  <span>{news.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-brand-maroon transition-colors">
                  {news.title}
                </h3>
                
                <p className="text-slate-600 mb-6 flex-grow leading-relaxed text-sm">
                  {news.excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-brand-gold font-bold text-sm">
                  <span>اقرأ التفاصيل</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 rotate-180"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-20 text-slate-500 text-lg font-medium">
            لا توجد أخبار في هذا القسم حالياً.
          </div>
        )}
      </div>
    </div>
  );
}
