import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>My Next.js App</title>
        <meta name="description" content="A simple Next.js application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to My Next.js App</h1>
        {error && <p>Error: {error}</p>}
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <Link href={`/item/${item.id}`}>
                <a>{item.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}