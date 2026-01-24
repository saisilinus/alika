import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AuthProvider } from './provider';
import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alika',
  description: 'Event management app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>
          <Provider store={store}>{children}</Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
