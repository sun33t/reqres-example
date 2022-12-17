import { Layout } from '@components/Layout';
import { Section } from '@components/Section';
import { Table } from '@components/Table';
import { ApiResponse, User } from '@types';
import { fetch } from 'cross-fetch';
import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const totalPagesAsArray = Array(totalPages).fill('button');

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        await fetch(`https://reqres.in/api/users?page=${currentPage}`)
          .then((res) => res.json())
          .then((res: ApiResponse) => {
            setUsers(res?.data);
            setTotalPages(res?.total_pages);
          });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [currentPage]);
  return (
    <Layout id='App'>
      <header className='py-4'>
        <h1 className='mx-auto max-w-7xl px-4 text-center text-3xl font-bold text-indigo-500 md:px-8'>
          API Fetch Example
        </h1>
      </header>
      <main className='pt-20'>
        <Section className='min-h-full'>
          {isLoading && (
            <h2 data-testid='loading' className='text-xl'>
              Loading...
            </h2>
          )}
          {!isLoading && (
            <div>
              <Table users={users} totalPages={totalPages} />
              <div
                id='pagination'
                className='flex items-center justify-center gap-4 py-4'
              >
                {totalPagesAsArray?.map((element, index) => (
                  <button
                    key={`page-${index + 1}`}
                    className='rounded-md border-2 border-indigo-500 px-2 text-indigo-500 hover:bg-indigo-500 hover:text-white'
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Section>
      </main>
    </Layout>
  );
}

export default App;
