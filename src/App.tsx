import { Layout } from '@components/Layout';
import { Section } from '@components/Section';
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
      <main>
        <Section>
          {isLoading && (
            <h2 data-testid='loading' className='text-xl'>
              Loading...
            </h2>
          )}
          {!isLoading &&
            users?.map((user) => (
              <div key={user?.id}>
                <h2>{`${user?.first_name} ${user?.last_name}`}</h2>
              </div>
            ))}
        </Section>
      </main>
      <footer>This is the footer</footer>
    </Layout>
  );
}

export default App;
