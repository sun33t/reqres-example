import { Button } from '@components/elements/Button';
import { Section } from '@components/elements/Section';
import { Layout } from '@components/global/Layout';
import { Modal } from '@components/Modal';
import { Table } from '@components/Table';
import useApi from '@hooks/useApi';
import { HandleSearchQuery, User } from '@types';
import { useState } from 'react';

function App() {
  const [isSearch, setIsSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQueryResult, setSearchQueryResult] = useState<User[]>([]);
  const [userBeingEdited, setUserBeingEdited] = useState<User>({} as User);

  // fetch data from api upon page load
  const { isLoading, users, totalPages } = useApi(
    'users',
    `page=${currentPage}`
  );

  const totalPagesAsArray = Array(totalPages).fill('button');

  const handleSearchQuery = ({ type, query }: HandleSearchQuery) => {
    if (type === 'email') {
      const emailSearchResult = users?.filter((user) =>
        user?.email.toLowerCase()?.includes(query.toLowerCase())
      );
      setSearchQueryResult(emailSearchResult);
    }
    if (type === 'last_name') {
      const lastNameSearchResult = users?.filter((user) =>
        user?.last_name?.toLowerCase()?.includes(query?.toLowerCase())
      );
      setSearchQueryResult(lastNameSearchResult);
    }
    setIsSearch(true);
  };

  const clearSearchQueries = () => {
    setSearchQueryResult([]);
    setIsSearch(false);
  };

  const handleModal = () => {
    const setSelectedUser = (user: User) => {
      setUserBeingEdited(user);
    };
    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);
    const clearSelectedUser = () => setUserBeingEdited({} as User);

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
                users={isSearch ? searchQueryResult : users}
                isSearch={isSearch}
                clearSearchQueries={clearSearchQueries}
                handleSearchQuery={handleSearchQuery}
              />
              {!isSearch && (
                <div
                  id='pagination'
                  className='flex items-center justify-center gap-4 py-4'
                >
                  {totalPagesAsArray?.map((_element, index) => (
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

        {Object.keys(userBeingEdited).length > 0 && (
          <Modal
            open={isModalOpen}
            setOpen={setIsModalOpen}
            user={userBeingEdited}
          />
        )}
      </main>
    </Layout>
  );
}

export default App;
