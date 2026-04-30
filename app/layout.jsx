import './globals.css';

export const metadata = {
  title: 'RankForge AI — Premium AI SEO Writing Assistant',
  description: 'Optimize content with Hybrid SEO, Rank Math, Yoast, NLP, and HCU-ready workflows.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
