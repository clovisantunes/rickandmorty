import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthContext';
function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
export default App;