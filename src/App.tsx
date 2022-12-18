import { Button } from '@components/elements/Button';
import { Layout } from '@components/Layout';
import { Modal } from '@components/Modal';
import { Section } from '@components/Section';
import { Table } from '@components/Table';
import useApi from '@hooks/useApi';
import { User } from '@types';
import { FormEventHandler, useState } from 'react';

// need to simplify the search queries. We don't need seperate state to hold the input from each field. Replace emailQuery and lastNameQuery with one searchQuery state. It can be an object that holds both the query string and the type of search e.g. { query: string; type: 'email' | 'last_name }

// then we would only need one handleSearch click handler. Additionaly, rather than doing the ternary in the users prop for the table to determine which object to pass through to the table, we should check for whether isSearch is true, and then either pass in the whole users array (if false) or the results of the search (if true)

// Then within the table component we can determine whether or not to show the table (if users.length > 0) or show a <NoSearchResults /> component if the users array is empty (and the isSearch boolean is true)

function App() {
  const [isSearch, setIsSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailQuery, setEmailQuery] = useState('');
  const [emailQueryResult, setEmailQueryResult] = useState<User[]>([]);
  const [lastNameQuery, setLastNameQuery] = useState('');
  const [lastNameQueryResult, setLastNameQueryResult] = useState<User[]>([]);
  const [currentlySelectedUser, setCurrentlySelectedUser] = useState<User>(
    {} as User
  );

  const { isLoading, users, totalPages } = useApi(
    'users',
    `page=${currentPage}`
  );

  const totalPagesAsArray = Array(totalPages).fill('button');

  const handleEmailSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const emailSearchResult = users.filter((user) =>
      user?.email.toLowerCase()?.includes(emailQuery.toLowerCase())
    );
    setEmailQueryResult(emailSearchResult);
    setLastNameQueryResult([]);
    setIsSearch(true);
  };
  const handleLastNameSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const lastNameSearchResult = users.filter((user) =>
      user?.last_name.toLowerCase()?.includes(lastNameQuery.toLowerCase())
    );
    setLastNameQueryResult(lastNameSearchResult);
    setEmailQueryResult([]);
    setIsSearch(true);
  };

  const clearSearchQueries = () => {
    setEmailQuery('');
    setEmailQueryResult([]);
    setLastNameQuery('');
    setLastNameQueryResult([]);
    setIsSearch(false);
  };

  const handleModal = () => {
    const setSelectedUser = (user: User) => {
      setCurrentlySelectedUser(user);
    };
    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);
    const clearSelectedUser = () => setCurrentlySelectedUser({} as User);

    return { setSelectedUser, closeModal, openModal, clearSelectedUser };
  };
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
          {!isLoading && (
            <div>
              <Table
                handleModal={handleModal}
                users={
                  Object.keys(emailQueryResult).length > 0
                    ? emailQueryResult
                    : Object.keys(lastNameQueryResult).length > 0
                    ? lastNameQueryResult
                    : users
                }
                isSearch={isSearch}
                clearSearchQueries={clearSearchQueries}
                handleEmailSearch={handleEmailSearch}
                emailQuery={emailQuery}
                setEmailQuery={setEmailQuery}
                handleLastNameSearch={handleLastNameSearch}
                lastNameQuery={lastNameQuery}
                setLastNameQuery={setLastNameQuery}
              />
              {!isSearch && (
                <div
                  id='pagination'
                  className='flex items-center justify-center gap-4 py-4'
                >
                  {totalPagesAsArray?.map((element, index) => (
                    <Button
                      intent={'secondary'}
                      key={`page-${index + 1}`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
        </Section>

        {Object.keys(currentlySelectedUser).length > 0 && (
          <Modal
            open={isModalOpen}
            setOpen={setIsModalOpen}
            user={currentlySelectedUser}
          />
        )}
      </main>
    </Layout>
  );
}

export default App;
