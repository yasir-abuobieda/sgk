'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoSgk from '@/logo-sgk.png';

export function Navbar() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('AR');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    
    // Check initial language from cookie
    const match = document.cookie.match(new RegExp('(^| )googtrans=([^;]+)'));
    if (match) {
      const val = match[2];
      if (val.includes('/en')) setCurrentLang('ENG');
      else if (val.includes('/tr')) setCurrentLang('TR');
      else setCurrentLang('AR');
    }
    
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lang: string) => {
    setCurrentLang(lang);
    setIsLangOpen(false);
    
    let target = 'ar';
    if (lang === 'ENG') target = 'en';
    if (lang === 'TR') target = 'tr';

    // Update cookie for future page reloads
    if (target === 'ar') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=' + window.location.hostname + '; path=/;';
    } else {
      document.cookie = `googtrans=/ar/${target}; path=/;`;
      document.cookie = `googtrans=/ar/${target}; domain=` + window.location.hostname + '; path=/;';
    }

    // Instantly translate using Google Translate widget in DOM
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      // If returning to Arabic, Google sometimes removes 'ar' from options. 
      // If setting value fails, fallback to reload.
      select.value = target;
      if (select.value === target) {
        select.dispatchEvent(new Event('change'));
      } else {
        window.location.reload();
        return;
      }
    } else {
      window.location.reload();
      return;
    }

    // Instantly switch HTML direction (Tailwind will react immediately)
    const isLtr = target === 'en' || target === 'tr';
    document.documentElement.dir = isLtr ? 'ltr' : 'rtl';
    document.documentElement.lang = target;

    // Remove any fade classes so it doesn't blink
    document.body.classList.remove('animate-translation-fade');
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition">
          <Image 
            src={logoSgk} 
            alt="شعار" 
            className="h-16 w-auto object-contain" 
            style={{ clipPath: 'inset(5% 5% 30% 5%)', transform: 'scale(1.6)', transformOrigin: 'right center' }}
            priority 
          />
          <div className="flex flex-col justify-center mt-1">
            <span className="font-extrabold text-2xl text-brand-maroon leading-none mb-1">مجلس الشباب السوداني</span>
            <span className="text-[11px] font-bold text-brand-gold tracking-widest uppercase">Sudan Gençlik Konseyi</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-6 font-medium text-slate-600">
          <Link href="/" className="hover:text-brand-maroon transition">الرئيسية</Link>
          <Link href="/events" className="hover:text-brand-maroon transition">الفعاليات</Link>
          <Link href="/news" className="hover:text-brand-maroon transition">الأخبار</Link>
          <Link href="/gallery" className="hover:text-brand-maroon transition">معرض الصور</Link>
          <Link href="/about" className="hover:text-brand-maroon transition">عن المجلس</Link>
          <Link href="/contact" className="hover:text-brand-maroon transition">تواصل معنا</Link>
        </div>

        <div className="flex items-center gap-3">
          <a href="https://www.facebook.com/sugktr/#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-brand-maroon hover:text-white transition-colors" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://www.instagram.com/sgk.tr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-brand-maroon hover:text-white transition-colors" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="mailto:sudangenclikkonseyi.tr@gmail.com" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-brand-gold hover:text-white transition-colors" aria-label="Email">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>

          {/* Language Switcher Dropdown */}
          <div className="relative mr-2 notranslate" ref={dropdownRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all shadow-sm ${
                isLangOpen ? 'bg-brand-maroon text-white' : 'bg-white border-2 border-slate-100 text-slate-700 hover:border-brand-maroon hover:text-brand-maroon'
              }`}
            >
              {currentLang}
            </button>

            {isLangOpen && (
              <div className="absolute top-12 left-0 w-20 bg-white border border-slate-100 shadow-xl rounded-xl overflow-hidden flex flex-col py-1 z-50 animate-in fade-in zoom-in duration-200">
                <button onClick={() => changeLanguage('AR')} className={`px-4 py-2.5 text-sm font-bold text-center transition-colors ${currentLang === 'AR' ? 'text-brand-maroon bg-slate-50' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-maroon'}`}>AR</button>
                <button onClick={() => changeLanguage('TR')} className={`px-4 py-2.5 text-sm font-bold text-center transition-colors ${currentLang === 'TR' ? 'text-brand-maroon bg-slate-50' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-maroon'}`}>TR</button>
                <button onClick={() => changeLanguage('ENG')} className={`px-4 py-2.5 text-sm font-bold text-center transition-colors ${currentLang === 'ENG' ? 'text-brand-maroon bg-slate-50' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-maroon'}`}>ENG</button>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </nav>
  );
}
