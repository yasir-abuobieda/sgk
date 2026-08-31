import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { JoinUsButton } from '@/components/registration-modal';

// Revalidate this page instantly to always show fresh data
export const revalidate = 0;

export default async function Home() {
  // Fetch latest 3 news
  const { data: newsData } = await supabase.from('news').select('*').order('created_at', { ascending: false }).limit(3);
  const latestNews = newsData || [];

  // Fetch upcoming 3 events
  const { data: eventsData } = await supabase.from('events').select('*').eq('status', 'upcoming').order('created_at', { ascending: false }).limit(3);
  const upcomingEvents = eventsData || [];
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-maroon/5 to-white py-24 px-4 border-b border-brand-maroon/10">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-brand-maroon mb-6 leading-relaxed">
            مجلس الشباب السوداني
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
            صوت الشباب السوداني  نرسّخ الهوية • نعزّز الحوار • نصنع الأثر
            نؤمن بأن الشباب هم الحاضر والمستقبل
            معًا نحو سلام وتنمية مستدامة
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/events" 
              className="inline-block bg-brand-gold text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-gold/90 transition shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              انضم لفعالياتنا
            </Link>
            <Link 
              href="/about" 
              className="inline-block bg-white text-brand-maroon border-2 border-brand-maroon px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-maroon/5 transition shadow-sm hover:-translate-y-1"
            >
              تعرف علينا
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative z-10 -mt-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
            <div className="p-6 rounded-2xl bg-brand-maroon/5 border border-brand-maroon/10">
              <div className="text-4xl font-black text-brand-maroon mb-2">500+</div>
              <div className="text-sm font-semibold text-slate-600">شاب وشابة</div>
            </div>
            <div className="p-6 rounded-2xl bg-brand-gold/10 border border-brand-gold/20">
              <div className="text-4xl font-black text-brand-gold mb-2">50+</div>
              <div className="text-sm font-semibold text-slate-600">فعالية منجزة</div>
            </div>
            <div className="p-6 rounded-2xl bg-brand-maroon/5 border border-brand-maroon/10">
              <div className="text-4xl font-black text-brand-maroon mb-2">10+</div>
              <div className="text-sm font-semibold text-slate-600">شراكات استراتيجية</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick About Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-brand-gold font-bold text-lg mb-2 block">من نحن؟</span>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-maroon mb-6 leading-tight">مظلة تجمع طاقات الشباب السوداني</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                نسعى لبناء مجتمع شبابي سوداني مترابط في تركيا، قادر على التفاعل الإيجابي مع محيطه، مزود بالمهارات والمعارف اللازمة ليكون مساهماً فاعلاً في بناء مستقبل السودان المشرق.
              </p>
              <Link href="/about" className="inline-flex items-center text-brand-maroon font-bold text-lg hover:text-brand-gold transition-colors">
                اقرأ المزيد عن أهدافنا
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 rotate-180"><path d="m9 18 6-6-6-6"/></svg>
              </Link>
            </div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" alt="شباب" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand-maroon/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Events */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-brand-gold font-bold text-lg mb-2 block">أنشطتنا</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-maroon">الفعاليات القادمة</h2>
            </div>
            <Link href="/events" className="hidden md:inline-flex items-center text-slate-500 font-bold hover:text-brand-maroon transition-colors">
              عرض كل الفعاليات
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 rotate-180"><path d="m9 18 6-6-6-6"/></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map(event => (
              <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col">
                <div className="relative h-56 w-full overflow-hidden bg-slate-200">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-md bg-brand-gold">
                      قريباً
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-brand-maroon mb-4 leading-tight">{event.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>{event.location}</span>
                  </div>
                  <div className="mt-auto w-full [&>button]:w-full [&>button]:py-3">
                     <JoinUsButton preselectedEventId={event.id.toString()} preselectedEventTitle={event.title} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link href="/events" className="inline-flex items-center text-brand-maroon font-bold hover:text-brand-gold transition-colors border-b-2 border-brand-maroon pb-1">
              عرض كل الفعاليات
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-brand-gold font-bold text-lg mb-2 block">تحديثات</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-maroon">آخر الأخبار</h2>
            </div>
            <Link href="/news" className="hidden md:inline-flex items-center text-slate-500 font-bold hover:text-brand-maroon transition-colors">
              عرض كل الأخبار
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 rotate-180"><path d="m9 18 6-6-6-6"/></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map(news => (
              <Link href={`/news/${news.slug}`} key={news.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col cursor-pointer block">
                <div className="relative h-56 w-full overflow-hidden bg-slate-200">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
          
          <div className="mt-10 text-center md:hidden">
            <Link href="/news" className="inline-flex items-center text-brand-maroon font-bold hover:text-brand-gold transition-colors border-b-2 border-brand-maroon pb-1">
              عرض كل الأخبار
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-maroon text-white text-center mb-16 border-y-[8px] border-brand-gold">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">جاهز لترك بصمتك؟</h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            انضم إلينا الآن وكن جزءاً من مجتمع شبابي طموح يسعى للتغيير الإيجابي وبناء المستقبل.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="bg-brand-gold text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-brand-maroon transition shadow-lg">
              تواصل معنا
            </Link>
            <Link href="/events" className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition">
              استكشف الفعاليات
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
