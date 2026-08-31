'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logoSgk from '@/logo-sgk.png';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin.sgk/tr') {
      document.cookie = "admin_token=secure_sgk_token_2026; path=/; max-age=86400";
      router.push('/admin');
      router.refresh();
    } else {
      setError('كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100 text-center">
        <div className="flex justify-center mb-6">
          <Image src={logoSgk} alt="الشعار" className="h-24 w-auto object-contain" />
        </div>
        <h1 className="text-2xl font-bold text-brand-maroon mb-2">تسجيل الدخول للوحة التحكم</h1>
        <p className="text-slate-500 text-sm mb-8 font-medium">الرجاء إدخال كلمة المرور للمتابعة</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input 
              type="password" 
              placeholder="كلمة المرور" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent text-center text-lg tracking-widest bg-slate-50"
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
          <button 
            type="submit"
            className="w-full bg-brand-maroon text-white font-bold py-3.5 rounded-xl hover:bg-brand-maroon/90 transition shadow-md"
          >
            دخول آمن
          </button>
        </form>
      </div>
    </div>
  );
}
