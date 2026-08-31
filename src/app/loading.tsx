export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-brand-maroon rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 border-4 border-brand-gold rounded-full border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      <p className="text-brand-maroon font-bold text-lg animate-pulse">جاري التحميل...</p>
    </div>
  );
}
