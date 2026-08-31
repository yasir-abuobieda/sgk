export default function SingleNewsPage({ params }: { params: { slug: string } }) {
  return (
    <div className="p-24">
      <h1 className="text-3xl font-bold mb-4">تفاصيل الخبر (News Details)</h1>
      <p>الخبر الحالي: {params.slug}</p>
    </div>
  );
}
