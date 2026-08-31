'use client';

import { useState } from 'react';

const initialGallery = [
  { id: 1, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop', category: 'مؤتمرات', title: 'المؤتمر السنوي الأول' },
  { id: 2, src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop', category: 'ورش عمل', title: 'لقاء تعارفي' },
  { id: 3, src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop', category: 'فعاليات رياضية', title: 'بطولة كرة القدم' },
];

export default function AdminGallery() {
  const [images, setImages] = useState(initialGallery);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    src: ''
  });

  const [filter, setFilter] = useState('الكل');

  const filteredImages = images.filter(img => filter === 'الكل' ? true : img.category === filter);

  // Handle open Add/Edit modal
  const openModal = (item: any = null) => {
    if (item) {
      setCurrentItem(item);
      setFormData(item);
    } else {
      setCurrentItem(null);
      setFormData({ title: '', category: '', src: '' });
    }
    setIsModalOpen(true);
  };

  // Handle save (Add/Edit)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem) {
      // Edit
      setImages(images.map(img => img.id === currentItem.id ? { ...formData, id: currentItem.id } : img));
    } else {
      // Add
      const newItem = { ...formData, id: Date.now() };
      setImages([newItem, ...images]);
    }
    setIsModalOpen(false);
  };

  // Handle delete
  const confirmDelete = (item: any) => {
    setCurrentItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    setImages(images.filter(img => img.id !== currentItem.id));
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">إدارة معرض الصور</h2>
        <button 
          onClick={() => openModal()}
          className="bg-brand-maroon hover:bg-brand-maroon/90 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-sm transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          رفع صورة جديدة
        </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['الكل', 'مؤتمرات', 'فعاليات رياضية', 'ورش عمل'].map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${filter === cat ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredImages.map((img) => (
          <div key={img.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group">
            <div className="h-40 w-full overflow-hidden">
              <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-4 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-sm mb-1 truncate">{img.title}</h3>
                <span className="text-xs text-brand-gold font-medium">{img.category}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => openModal(img)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs py-2 rounded font-bold transition-colors">تعديل</button>
                <button onClick={() => confirmDelete(img)} className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs py-2 rounded font-bold transition-colors">حذف</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-20 text-slate-500 bg-white rounded-xl border border-slate-200 mt-6">
          لا توجد صور مسجلة في هذا القسم.
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">{currentItem ? 'تعديل الصورة' : 'رفع صورة جديدة'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">عنوان الفعالية / الصورة</label>
                <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-maroon focus:outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">التصنيف</label>
                <select required className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-maroon focus:outline-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="">اختر التصنيف...</option>
                  <option value="مؤتمرات">مؤتمرات</option>
                  <option value="ورش عمل">ورش عمل</option>
                  <option value="فعاليات رياضية">فعاليات رياضية</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">صورة الفعالية</label>
                <div className="flex gap-2">
                  <input type="url" dir="ltr" placeholder="رابط URL" className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-maroon focus:outline-none text-right" value={formData.src} onChange={e => setFormData({...formData, src: e.target.value})} />
                  <label className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-lg font-bold cursor-pointer transition-colors whitespace-nowrap flex items-center justify-center border border-slate-200">
                    رفع محلي
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                         const fileUrl = URL.createObjectURL(e.target.files[0]);
                         setFormData({...formData, src: fileUrl});
                      }
                    }} />
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">إلغاء</button>
                <button type="submit" className="px-6 py-2 rounded-lg font-bold text-white bg-brand-maroon hover:bg-brand-maroon/90 transition-colors">حفظ التغييرات</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden text-center p-6">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">تأكيد الحذف</h3>
            <p className="text-slate-500 mb-6">هل أنت متأكد من حذف هذه الصورة؟ هذا الإجراء لا يمكن التراجع عنه.</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-6 py-2 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">إلغاء</button>
              <button onClick={handleDelete} className="px-6 py-2 rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 transition-colors">نعم، احذف</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
