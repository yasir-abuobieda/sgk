'use client'

import { useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="bg-brand-maroon text-white px-4 py-2.5 rounded-lg font-bold hover:bg-brand-maroon/90 disabled:opacity-50 transition w-full mt-1 shadow-md text-sm"
    >
      {pending ? 'جاري الإرسال...' : 'سجل الآن'}
    </button>
  );
}

export function RegistrationForm({ 
  preselectedEventId, 
  preselectedEventTitle,
  onSuccess
}: { 
  preselectedEventId?: string, 
  preselectedEventTitle?: string,
  onSuccess?: () => void
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);

  async function action(formData: FormData) {
    setStatus(null);
    try {
      const data = Object.fromEntries(formData.entries());
      
      const eventName = data.eventId === '1' ? 'فعالية تعارف الشباب السوداني' : 
                        data.eventId === '4' ? 'مؤتمر الشباب السوداني الأول' : 
                        data.eventId;

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "a30b2cde-7342-4380-80eb-16b6da6b1c3c",
          subject: `تسجيل جديد: ${data.name} - ${eventName}`,
          from_name: "مجلس الشباب السوداني",
          name: data.name,
          email: "yasirfadlallaweb979@gmail.com",
          message: `📌 تفاصيل التسجيل الجديد:\n\n👤 الاسم: ${data.name}\n📱 رقم الهاتف: ${data.phone}\n📍 المدينة: ${data.city}\n🎟️ الفعالية: ${eventName}\n📝 الملاحظات: ${data.notes || "لا يوجد"}`
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setStatus({ type: 'success', message: 'تم التسجيل بنجاح! شكراً لك.' });
        formRef.current?.reset();
        if (onSuccess) {
          setTimeout(() => onSuccess(), 2000);
        }
      } else {
        setStatus({ type: 'error', message: result.message || "حدث خطأ غير متوقع" });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'تأكد من اتصالك بالإنترنت وحاول مجدداً.' });
    }
  }

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-3 max-w-md mx-auto">
      {status && (
        <div className={`p-3 rounded-lg text-sm font-bold text-center ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {status.message}
        </div>
      )}
      <div>
        <label className="block mb-1 text-xs font-semibold text-slate-600">الاسم الكامل</label>
        <input name="name" required className="w-full border px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-brand-maroon outline-none bg-slate-50" />
      </div>
      <div>
        <label className="block mb-1 text-xs font-semibold text-slate-600">رقم الهاتف / واتساب</label>
        <input name="phone" required type="tel" dir="ltr" className="w-full border px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-brand-maroon outline-none bg-slate-50 text-right" />
      </div>
      <div>
        <label className="block mb-1 text-xs font-semibold text-slate-600">المدينة</label>
        <input name="city" required className="w-full border px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-brand-maroon outline-none bg-slate-50" />
      </div>
      <div>
        <label className="block mb-1 text-xs font-semibold text-slate-600">الفعالية</label>
        {preselectedEventId ? (
          <>
            <input type="hidden" name="eventId" value={preselectedEventId} />
            <input 
              type="text" 
              disabled 
              className="w-full border border-slate-200 px-3 py-2 text-sm rounded-lg bg-slate-100 text-slate-500 font-bold cursor-not-allowed" 
              value={preselectedEventTitle} 
            />
          </>
        ) : (
          <select name="eventId" required className="w-full border px-3 py-2 text-sm rounded-lg text-black focus:ring-2 focus:ring-brand-maroon outline-none bg-slate-50">
            <option value="">اختر الفعالية...</option>
            <option value="1">فعالية تعارف الشباب السوداني</option>
            <option value="4">مؤتمر الشباب السوداني الأول</option>
          </select>
        )}
      </div>
      <div>
        <label className="block mb-1 text-xs font-semibold text-slate-600">ملاحظات إضافية (اختياري)</label>
        <textarea name="notes" className="w-full border px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-brand-maroon outline-none bg-slate-50" rows={2}></textarea>
      </div>
      <SubmitButton />
    </form>
  );
}
