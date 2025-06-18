// pages/index.js
import Head from 'next/head';
import Calculator from '../components/Calculator';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Head>
        <title>Calculadora Simples</title>
        <meta name="description" content="Calculadora simples desenvolvida com Next.js" />
      </Head>

      <Calculator />
    </div>
  );
}