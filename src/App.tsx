import { Layout } from '@components/Layout';
import { Section } from '@components/Section';
import { Table } from '@components/Table';
import { ApiResponse, User } from '@types';
import { fetch } from 'cross-fetch';
import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        await fetch('https://reqres.in/api/users')
          .then((res) => res.json())
          .then((res: ApiResponse) => setUsers(res?.data));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <Layout id='App'>
      <header className='py-4'>
        <h1 className='mx-auto max-w-7xl px-4 text-center text-3xl font-bold text-indigo-500 md:px-8'>
          API Fetch Example
        </h1>
      </header>
      <main className='pt-20'>
        <Section>
          {isLoading && (
            <h2 data-testid='loading' className='text-xl'>
              Loading...
            </h2>
          )}
          {!isLoading && <Table users={users} />}
        </Section>
      </main>
    </Layout>
  );
}

export default App;
