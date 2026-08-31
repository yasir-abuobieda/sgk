import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../app/globals.css";
import { ClientLayout } from "@/components/client-layout";

import { cookies } from 'next/headers';

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
  const cookieStore = cookies();
  const googtrans = cookieStore.get('googtrans')?.value;
  const isLtr = googtrans?.includes('/en') || googtrans?.includes('/tr');
  const dir = isLtr ? 'ltr' : 'rtl';
  const lang = googtrans?.includes('/en') ? 'en' : googtrans?.includes('/tr') ? 'tr' : 'ar';

  const isTranslating = isLtr;

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({pageLanguage: 'ar', autoDisplay: false}, 'google_translate_element');
            }
          `
        }} />
      </head>
      <body className={`${cairo.className} bg-slate-50 text-slate-800 ${isTranslating ? 'animate-translation-fade' : ''}`} suppressHydrationWarning>
        <div id="google_translate_element" style={{ display: 'none' }}></div>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
