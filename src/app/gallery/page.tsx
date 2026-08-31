'use client';

import { useState } from 'react';

const galleryCategories = ['الكل', 'مؤتمرات', 'فعاليات رياضية', 'ورش عمل'];

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop', category: 'مؤتمرات', title: 'المؤتمر السنوي الأول' },
  { id: 2, src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop', category: 'ورش عمل', title: 'لقاء تعارفي' },
  { id: 3, src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop', category: 'فعاليات رياضية', title: 'بطولة كرة القدم' },
  { id: 4, src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop', category: 'مؤتمرات', title: 'اجتماع المكتب التنفيذي' },
  { id: 5, src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop', category: 'ورش عمل', title: 'ورشة التوجيه المهني' },
  { id: 6, src: 'https://images.unsplash.com/photo-1523580494112-071dcb92a11d?q=80&w=800&auto=format&fit=crop', category: 'فعاليات رياضية', title: 'المارثون الشبابي' },
  { id: 7, src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop', category: 'مؤتمرات', title: 'مؤتمر ريادة الأعمال' },
  { id: 8, src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop', category: 'ورش عمل', title: 'جلسة العصف الذهني' },
  { id: 9, src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop', category: 'فعاليات رياضية', title: 'اليوم الرياضي المفتوح' },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState('الكل');
  const [selectedImage, setSelectedImage] = useState<{src: string, title: string} | null>(null);

  const filteredImages = filter === 'الكل' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <div className="py-20 px-4 bg-slate-50 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-maroon mb-4">معرض الصور</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            نافذة بصرية توثق أبرز محطاتنا، فعالياتنا، ومشاركات الشباب السوداني في تركيا.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {galleryCategories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full font-bold transition-all duration-300 ${
                filter === cat 
                  ? 'bg-brand-maroon text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-brand-maroon border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredImages.map(img => (
            <div 
              key={img.id} 
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedImage({ src: img.src, title: img.title })}
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-brand-gold text-xs font-bold mb-2 uppercase tracking-wider">{img.category}</span>
                <h3 className="text-white text-lg font-bold">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20 text-slate-500 font-medium">
            لا توجد صور في هذا القسم حالياً.
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-slate-800/50 hover:bg-brand-maroon rounded-full p-2 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <div 
            className="max-w-5xl w-full max-h-[85vh] relative flex flex-col items-center animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title} 
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
            <h3 className="text-white text-xl font-bold mt-6">{selectedImage.title}</h3>
          </div>
        </div>
      )}

    </div>
  );
}
