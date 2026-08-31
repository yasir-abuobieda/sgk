import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-slate-50 text-center">
      <h1 className="text-9xl font-extrabold text-slate-200 mb-4 tracking-widest">404</h1>
      <div className="bg-brand-maroon text-white px-4 py-1 rounded shadow-sm text-sm font-bold absolute rotate-12 -mt-24">
        الصفحة مفقودة
      </div>
      <h2 className="text-3xl font-bold text-slate-800 mb-4 mt-6">عذراً، هذه الصفحة غير موجودة!</h2>
      <p className="text-slate-500 mb-8 max-w-md">
        يبدو أنك وصلت إلى رابط خاطئ أو أن الصفحة التي تبحث عنها قد تم نقلها أو حذفها.
      </p>
      <Link 
        href="/" 
        className="bg-brand-gold hover:bg-brand-gold/90 text-white font-bold py-3 px-8 rounded-full transition-all shadow-md hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        العودة للصفحة الرئيسية
      </Link>
    </div>
  );
}
