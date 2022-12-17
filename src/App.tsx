import { Layout } from '@components/Layout';
import { Modal } from '@components/Modal';
import { Section } from '@components/Section';
import { Table } from '@components/Table';
import { ApiResponse, User } from '@types';
import { fetch } from 'cross-fetch';
import { FormEventHandler, useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailQuery, setEmailQuery] = useState('');
  const [emailQueryResult, setEmailQueryResult] = useState<User[]>([]);
  const [lastNameQuery, setLastNameQuery] = useState('');
  const [lastNameQueryResult, setLastNameQueryResult] = useState<User[]>([]);

  const totalPagesAsArray = Array(totalPages).fill('button');

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      await fetch(`https://reqres.in/api/users?page=${currentPage}`)
        .then((res) => res.json())
        .then((res: ApiResponse) => {
          if (emailQuery.length > 0) {
            setUsers(res?.data?.filter((user) => user?.email === emailQuery));
          }
          if (lastNameQuery.length > 0) {
            setUsers(
              res?.data?.filter((user) => user?.last_name === lastNameQuery)
            );
          }
          setUsers(res?.data);
          setTotalPages(res?.total_pages);
        });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const emailSearchResult = users.filter(
      (user) => user?.email.toLowerCase() === emailQuery.toLowerCase()
    );
    setEmailQueryResult(emailSearchResult);
    setEmailQuery('');
    setLastNameQueryResult([]);
  };
  const handleLastNameSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const lastNameSearchResult = users.filter(
      (user) => user?.last_name.toLowerCase() === lastNameQuery.toLowerCase()
    );
    setLastNameQueryResult(lastNameSearchResult);
    setLastNameQuery('');
    setEmailQueryResult([]);
  };

  const clearSearchQueries = () => {
    setEmailQuery('');
    setEmailQueryResult([]);
    setLastNameQuery('');
    setLastNameQueryResult([]);
  };

  useEffect(() => {
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
        <Section className='py-8'>
          <div>
            <div className='flex gap-8'>
              <form onSubmit={handleEmailSearch}>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Search By Email
                </label>
                <div className='mt-1 flex'>
                  <input
                    value={emailQuery}
                    onChange={(e) => setEmailQuery(e.target.value)}
                    type='email'
                    name='email'
                    id='email'
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    placeholder='you@example.com'
                  />
                  <button
                    className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
                    type={'submit'}
                  >
                    search
                  </button>
                </div>
              </form>
              <form onSubmit={handleLastNameSearch}>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Search By Last Name
                </label>
                <div className='mt-1 flex'>
                  <input
                    value={lastNameQuery}
                    onChange={(e) => setLastNameQuery(e?.target?.value)}
                    type='text'
                    name='name'
                    id='name'
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    placeholder='Joe Bloggs'
                  />
                  <button
                    className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
                    type={'submit'}
                  >
                    search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Section>
        <Section>
          {isLoading && (
            <h2 data-testid='loading' className='text-xl'>
              Loading...
            </h2>
          )}
          {!isLoading && (
            <div>
              <Table
                users={users}
                totalPages={totalPages}
                clearSearchQueries={clearSearchQueries}
              />
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
        <Section className='w-full'>
          {emailQueryResult.length > 0 && (
            <Table
              users={emailQueryResult}
              totalPages={0}
              clearSearchQueries={clearSearchQueries}
            />
          )}
          {lastNameQueryResult.length > 0 && (
            <Table
              users={lastNameQueryResult}
              totalPages={0}
              clearSearchQueries={clearSearchQueries}
            />
          )}
        </Section>
        <Modal open={isModalOpen} setOpen={setIsModalOpen} />
      </main>
    </Layout>
  );
}

export default App;
