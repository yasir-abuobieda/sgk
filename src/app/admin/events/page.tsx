'use client';

import { useState } from 'react';
import { mockEvents } from '@/data/events';

export default function AdminEvents() {
  const [events, setEvents] = useState(mockEvents);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    status: 'upcoming',
    image: '',
    description: ''
  });

  const [filter, setFilter] = useState('all');

  const filteredEvents = events.filter(ev => filter === 'all' ? true : ev.status === filter);

  // Handle open Add/Edit modal
  const openModal = (event: any = null) => {
    if (event) {
      setCurrentEvent(event);
      setFormData(event);
    } else {
      setCurrentEvent(null);
      setFormData({ title: '', location: '', date: '', status: 'upcoming', image: '', description: '' });
    }
    setIsModalOpen(true);
  };

  // Handle save (Add/Edit)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentEvent) {
      // Edit
      setEvents(events.map(ev => ev.id === currentEvent.id ? { ...formData, id: currentEvent.id } : ev));
    } else {
      // Add
      const newEvent = { ...formData, id: Date.now() };
      setEvents([newEvent, ...events]);
    }
    setIsModalOpen(false);
  };

  // Handle delete
  const confirmDelete = (event: any) => {
    setCurrentEvent(event);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    setEvents(events.filter(ev => ev.id !== currentEvent.id));
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">إدارة الفعاليات</h2>
        <button 
          onClick={() => openModal()}
          className="bg-brand-maroon hover:bg-brand-maroon/90 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-sm transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          إضافة فعالية جديدة
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${filter === 'all' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          الكل
        </button>
        <button 
          onClick={() => setFilter('upcoming')}
          className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${filter === 'upcoming' ? 'bg-brand-gold text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          الفعاليات القادمة
        </button>
        <button 
          onClick={() => setFilter('past')}
          className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${filter === 'past' ? 'bg-brand-maroon text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          الفعاليات السابقة
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-sm">
            <tr>
              <th className="p-4">صورة الفعالية</th>
              <th className="p-4">عنوان الفعالية</th>
              <th className="p-4">المكان</th>
              <th className="p-4">الحالة</th>
              <th className="p-4 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredEvents.map((event) => (
              <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="w-16 h-12 rounded bg-slate-200 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="p-4 font-medium text-slate-800">{event.title}</td>
                <td className="p-4 text-slate-500 text-sm">{event.location}</td>
                <td className="p-4">
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${event.status === 'upcoming' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {event.status === 'upcoming' ? 'قريباً' : 'منتهية'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => openModal(event)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="تعديل">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button onClick={() => confirmDelete(event)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="حذف">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredEvents.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">لا توجد فعاليات في هذا القسم.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">{currentEvent ? 'تعديل الفعالية' : 'إضافة فعالية جديدة'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">عنوان الفعالية</label>
                <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-maroon focus:outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">المكان</label>
                  <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-maroon focus:outline-none" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">التاريخ</label>
                  <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-maroon focus:outline-none" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">الحالة</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-maroon focus:outline-none" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="upcoming">قريباً</option>
                    <option value="past">منتهية</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">صورة الفعالية</label>
                  <div className="flex gap-2">
                    <input type="url" dir="ltr" placeholder="رابط URL" className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-maroon focus:outline-none text-right" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                    <label className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-lg font-bold cursor-pointer transition-colors whitespace-nowrap flex items-center justify-center border border-slate-200">
                      رفع محلي
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                           const fileUrl = URL.createObjectURL(e.target.files[0]);
                           setFormData({...formData, image: fileUrl});
                        }
                      }} />
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">التفاصيل</label>
                <textarea required rows={4} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-maroon focus:outline-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
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
            <p className="text-slate-500 mb-6">هل أنت متأكد من حذف هذه الفعالية؟ هذا الإجراء لا يمكن التراجع عنه.</p>
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
