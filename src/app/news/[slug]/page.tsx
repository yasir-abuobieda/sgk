import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 0;

export default async function NewsArticlePage({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  
  // Vercel build trace bypass: if Next.js executes this with no params during build, return early
  if (!slug) return null;
  
  const decodedSlug = decodeURIComponent(slug);
  const { data: article } = await supabase.from('news').select('*').eq('slug', decodedSlug).single();
  
  if (!article) {
    notFound();
  }

  return (
    <div className="py-12 md:py-20 px-4 bg-white min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <Link href="/news" className="inline-flex items-center text-slate-400 font-bold mb-8 hover:text-brand-maroon transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6"/></svg>
          العودة للأخبار
        </Link>
        
        <div className="mb-10">
          <span className="bg-brand-maroon/10 text-brand-maroon px-4 py-1.5 rounded-full text-sm font-bold mb-6 inline-block">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-6 leading-[1.3]">
            {article.title}
          </h1>
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            <span>{article.date}</span>
          </div>
        </div>

        <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-lg border border-slate-100">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>

        <div className="text-lg text-slate-700 leading-loose whitespace-pre-line font-medium mb-16">
          {article.content}
        </div>
      </div>
    </div>
  );
}
