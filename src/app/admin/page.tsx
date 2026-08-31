'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ news: 0, events: 0, gallery: 0 });

  useEffect(() => {
    async function fetchStats() {
      const { count: newsCount } = await supabase.from('news').select('*', { count: 'exact', head: true });
      const { count: eventsCount } = await supabase.from('events').select('*', { count: 'exact', head: true }).eq('status', 'upcoming');
      const { count: galleryCount } = await supabase.from('gallery').select('*', { count: 'exact', head: true });

      setStats({
        news: newsCount || 0,
        events: eventsCount || 0,
        gallery: galleryCount || 0
      });
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Stat Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">إجمالي الأخبار</p>
            <h3 className="text-3xl font-extrabold text-slate-800">{stats.news}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
            </svg>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">الفعاليات القادمة</p>
            <h3 className="text-3xl font-extrabold text-brand-maroon">{stats.events}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-red-50 text-brand-maroon flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">صور المعرض</p>
            <h3 className="text-3xl font-extrabold text-brand-gold">{stats.gallery}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-yellow-50 text-brand-gold flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center mt-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">أهلاً بك في لوحة التحكم</h2>
        <p className="text-slate-600 max-w-lg mx-auto leading-relaxed">
          من هنا يمكنك إدارة محتوى موقع مجلس الشباب السوداني بالكامل. 
          استخدم القائمة الجانبية للتنقل بين الأقسام لإضافة أو تعديل أو حذف (الأخبار، الفعاليات، والصور).
        </p>
        <div className="mt-8 p-4 bg-green-50 text-green-800 rounded-lg max-w-2xl mx-auto text-sm font-medium border border-green-100">
          تم ربط قاعدة البيانات بنجاح (Supabase). البيانات المحفوظة ستظهر في الموقع العام فوراً! 🚀
        </div>
      </div>
    </div>
  );
}
