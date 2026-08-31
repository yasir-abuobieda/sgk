import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-maroon text-white py-24 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">عن مجلس الشباب السوداني</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            مؤسسة شبابية رائدة تهدف إلى جمع الكفاءات والطاقات السودانية الشابة في تركيا لتعزيز التواصل وتقديم مبادرات تخدم المجتمع.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden hover:shadow-lg transition-shadow">
              <div className="absolute top-0 right-0 w-2 h-full bg-brand-maroon"></div>
              <h2 className="text-3xl font-bold text-brand-maroon mb-4">رؤيتنا</h2>
              <p className="text-slate-600 leading-loose text-lg">
                أن نكون المظلة الجامعة والصوت الممثل للشباب السوداني في تركيا، ونسعى لبناء مجتمع شبابي مترابط، واعٍ ومؤثر، يمتلك المهارات والمعارف اللازمة ليكون مساهماً فاعلاً في بناء مستقبل السودان.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden hover:shadow-lg transition-shadow">
              <div className="absolute top-0 right-0 w-2 h-full bg-brand-gold"></div>
              <h2 className="text-3xl font-bold text-brand-gold mb-4">رسالتنا</h2>
              <p className="text-slate-600 leading-loose text-lg">
                ترسيخ الهوية السودانية وتعزيز الحوار وصنع الأثر الإيجابي من خلال إقامة الفعاليات، ورش العمل، والشراكات الاستراتيجية التي تدعم التطور الأكاديمي والمهني والثقافي للشباب.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-maroon mb-4">المكتب التنفيذي</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              { id: 1, name: 'أحمد محمد', role: 'رئيس المجلس', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop' },
              { id: 2, name: 'سارة عبد الله', role: 'نائب الرئيس', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop' },
              { id: 3, name: 'عمر عثمان', role: 'الأمين العام', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop' },
              { id: 4, name: 'فاطمة حسن', role: 'مسؤول العلاقات العامة', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop' },
              { id: 5, name: 'ياسر أبو عبيدة', role: 'المسؤول التقني (IT)', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop' },
              { id: 6, name: 'مريم الصادق', role: 'مسؤول الفعاليات', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop' },
            ].map(member => (
              <div key={member.id} className="text-center group">
                <div className="w-36 h-36 mx-auto rounded-full overflow-hidden mb-5 border-4 border-slate-50 group-hover:border-brand-gold transition-colors duration-300 shadow-md">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{member.name}</h3>
                <p className="text-brand-maroon font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
