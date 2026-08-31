import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../app/globals.css";
import { ClientLayout } from "@/components/client-layout";

const cairo = Cairo({ subsets: ["arabic", "latin"] });

export const metadata: Metadata = {
  title: "مجلس الشباب السوداني | Sudan Gençlik Konseyi",
  description: "المنصة الرسمية لمجلس الشباب السوداني. مؤسسة شبابية رائدة تهدف إلى جمع الكفاءات والطاقات السودانية الشابة لتعزيز التواصل وتقديم مبادرات تخدم المجتمع.",
  openGraph: {
    title: "مجلس الشباب السوداني",
    description: "المنصة الرسمية لمجلس الشباب السوداني. مؤسسة شبابية رائدة تهدف إلى جمع الكفاءات والطاقات السودانية الشابة لتعزيز التواصل وتقديم مبادرات تخدم المجتمع.",
    type: "website",
    locale: "ar_AR",
    siteName: "مجلس الشباب السوداني",
  },
  twitter: {
    card: "summary_large_image",
    title: "مجلس الشباب السوداني",
    description: "المنصة الرسمية لمجلس الشباب السوداني. مؤسسة شبابية رائدة لجمع الكفاءات وبناء مجتمع شبابي مترابط.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.className} bg-slate-50 text-slate-800`} suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
