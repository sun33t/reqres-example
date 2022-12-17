import { Button } from '@components/elements/Button';
import { Layout } from '@components/Layout';
import { Modal } from '@components/Modal';
import { Section } from '@components/Section';
import { Table } from '@components/Table';
import { ApiResponse, User } from '@types';
import { fetch } from 'cross-fetch';
import { FormEventHandler, useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailQuery, setEmailQuery] = useState('');
  const [emailQueryResult, setEmailQueryResult] = useState<User[]>([]);
  const [lastNameQuery, setLastNameQuery] = useState('');
  const [lastNameQueryResult, setLastNameQueryResult] = useState<User[]>([]);
  const [currentlySelectedUser, setCurrentlySelectedUser] = useState<User>(
    {} as User
  );

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
    setIsSearch(true);
  };
  const handleLastNameSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const lastNameSearchResult = users.filter(
      (user) => user?.last_name.toLowerCase() === lastNameQuery.toLowerCase()
    );
    setLastNameQueryResult(lastNameSearchResult);
    setLastNameQuery('');
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
