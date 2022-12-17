import { TableProps, TableRowProps } from '@types';
import { Button } from './elements/Button';
import { InputWithButtonAndLabel } from './elements/InputWithButtonAndLabel';

// The jsx and tailwind styles for this component were sourced from https://tailwindui.com/components/application-ui/lists/tables and were not my own work. I used this resource to bootstrap the these table components for expediency

const TableTitle = ({
  users,
  clearSearchQueries,
  handleEmailSearch,
  emailQuery,
  setEmailQuery,
  handleLastNameSearch,
  lastNameQuery,
  setLastNameQuery,
}: Pick<
  TableProps,
  | 'users'
  | 'clearSearchQueries'
  | 'handleEmailSearch'
  | 'emailQuery'
  | 'setEmailQuery'
  | 'handleLastNameSearch'
  | 'lastNameQuery'
  | 'setLastNameQuery'
>) => (
  <div className='sm:flex sm:items-center'>
    <div className='sm:flex-auto'>
      <h1 className='text-xl font-semibold text-gray-900'>
        {users.length > 1 ? 'Users' : 'Search Results'}
      </h1>
      <p className='mt-2 text-sm text-gray-700'>
        {users.length > 1
          ? 'A list of all the users returned from reqres.in'
          : null}
      </p>
    </div>
    <div>
      <div className='flex gap-8'>
        <form onSubmit={handleEmailSearch}>
          <InputWithButtonAndLabel
            labelProps={{ htmlFor: 'email', children: 'Search By Email' }}
            inputProps={{
              value: emailQuery,
              type: 'email',
              name: 'email',
              id: 'email',
              onChange: (e) => setEmailQuery(e?.target?.value),
            }}
            buttonProps={{ type: 'submit', children: 'Search' }}
          />
        </form>
        <form onSubmit={handleLastNameSearch}>
          <InputWithButtonAndLabel
            labelProps={{
              htmlFor: 'last_name',
              children: 'Search By Last Name',
            }}
            inputProps={{
              value: lastNameQuery,
              type: 'last_name',
              name: 'last_name',
              id: 'last_name',
              onChange: (e) => setLastNameQuery(e?.target?.value),
            }}
            buttonProps={{ type: 'submit', children: 'Search' }}
          />
        </form>
        {users?.length === 1 && (
          <Button
            intent='secondary'
            onClick={clearSearchQueries}
            className='self-end'
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  </div>
);

const TableHeader = () => (
  <thead className='bg-gray-50'>
    <tr>
      <th
        scope='col'
        className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
      >
        User
      </th>
      <th
        scope='col'
        className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
      >
        Email
      </th>
      <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
        <span className='sr-only'>Edit</span>
      </th>
    </tr>
  </thead>
);

const TableRow = ({ user, handleModal }: TableRowProps) => {
  const { setSelectedUser, openModal } = handleModal();

  const handleEdit = () => {
    setSelectedUser(user);
    openModal();
  };
  return (
    <tr>
      <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6'>
        <div className='flex items-center'>
          <div className='h-10 w-10 flex-shrink-0'>
            <img
              className='h-10 w-10 rounded-full'
              src={user?.avatar}
              alt={`avatar of ${user?.first_name} ${user?.last_name}`}
            />
          </div>
          <div className='ml-4'>
            <div className='font-medium text-gray-900'>{`${user?.first_name} ${user?.last_name}`}</div>
          </div>
        </div>
      </td>
      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
        {user?.email}
      </td>
      <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
        <button
          className='text-indigo-600 hover:text-indigo-900'
          onClick={handleEdit}
        >
          Edit
          <span
            data-testid={`${user?.first_name} ${user?.last_name}`}
            className='sr-only'
          >
            {`${user?.first_name} ${user?.last_name}`}
          </span>
        </button>
      </td>
    </tr>
  );
};

export const Table = ({
  users,
  clearSearchQueries,
  handleModal,
  handleEmailSearch,
  emailQuery,
  setEmailQuery,
  handleLastNameSearch,
  lastNameQuery,
  setLastNameQuery,
  ...restOfProps
}: TableProps) => {
  return (
    users && (
      <div id='User Table' {...restOfProps}>
        <TableTitle
          users={users}
          clearSearchQueries={clearSearchQueries}
          emailQuery={emailQuery}
          handleEmailSearch={handleEmailSearch}
          handleLastNameSearch={handleLastNameSearch}
          lastNameQuery={lastNameQuery}
          setEmailQuery={setEmailQuery}
          setLastNameQuery={setLastNameQuery}
        />
        <div className='mt-8 flex flex-col'>
          <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
              <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                <table className='min-w-full divide-y divide-gray-300'>
                  <TableHeader />
                  <tbody className='divide-y divide-gray-200 bg-white'>
                    {users?.map((user) => (
                      <TableRow
                        key={user?.id}
                        user={user}
                        handleModal={handleModal}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
