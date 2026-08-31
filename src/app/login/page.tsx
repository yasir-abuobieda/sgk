import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4" dir="rtl">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-brand-maroon mb-2">تسجيل الدخول</h1>
          <p className="text-slate-500 text-sm">خاص بأعضاء المكتب التنفيذي</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all"
              placeholder="admin@sgk.tr"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">كلمة المرور</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all"
              placeholder="••••••••"
              dir="ltr"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-brand-maroon focus:ring-brand-maroon" />
              <span className="text-sm text-slate-600">تذكرني</span>
            </label>
            <a href="#" className="text-sm text-brand-gold hover:underline">نسيت كلمة المرور؟</a>
          </div>

          <Link href="/admin" className="block w-full text-center bg-brand-maroon hover:bg-brand-maroon/90 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg">
            دخول للوحة التحكم
          </Link>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-slate-500 hover:text-brand-maroon flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            العودة للموقع
          </Link>
        </div>
      </div>
    </div>
  );
}
