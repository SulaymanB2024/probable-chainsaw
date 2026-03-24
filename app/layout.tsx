import type {Metadata} from 'next';
import { Inter, JetBrains_Mono, Cormorant_Garamond } from 'next/font/google';
import './globals.css'; // Global styles
import AsciiBackground from '@/components/AsciiBackground';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { ThemeProvider } from '@/components/ThemeProvider';
import ScrollProgress from '@/components/ScrollProgress';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'], 
  style: ['normal', 'italic'], 
  variable: '--font-serif' 
});

export const metadata: Metadata = {
  title: 'Sulayman Bowles | Builder & Investor',
  description: 'Personal portfolio, projects, and investment theses.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-[#FAFAFA] text-[#050505] dark:bg-[#050505] dark:text-[#F2F2F2] antialiased selection:bg-[#050505] selection:text-[#FAFAFA] dark:selection:bg-[#F2F2F2] dark:selection:text-[#050505] transition-colors duration-500">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <CustomCursor />
          <AsciiBackground />
          <div className="pointer-events-none fixed inset-0 z-10 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
          <ScrollProgress />
          <Navigation />
          <div className="relative z-20 flex flex-col min-h-screen">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
