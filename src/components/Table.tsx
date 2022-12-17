import { TableProps, TableRowProps } from '@types';

// The jsx and tailwind styles for this component were sourced from https://tailwindui.com/components/application-ui/lists/tables and were not my own work. I used this resource to bootstrap the these table components for expediency

const TableTitle = () => (
  <div className='sm:flex sm:items-center'>
    <div className='sm:flex-auto'>
      <h1 className='text-xl font-semibold text-gray-900'>Users</h1>
      <p className='mt-2 text-sm text-gray-700'>
        A list of all the users returned from reqres.in
      </p>
    </div>
    <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
      <button
        type='button'
        className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
      >
        Add user
      </button>
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

const TableRow = ({ user }: TableRowProps) => (
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
      <a href='#' className='text-indigo-600 hover:text-indigo-900'>
        Edit
        <span
          data-testid={`${user?.first_name} ${user?.last_name}`}
          className='sr-only'
        >
          {`${user?.first_name} ${user?.last_name}`}
        </span>
      </a>
    </td>
  </tr>
);

export const Table = ({ users, totalPages, ...restOfProps }: TableProps) => {
  return (
    <div
      // className='max-w-3xl px-4 sm:px-6 lg:px-8'
      id='User Table'
      {...restOfProps}
    >
      <TableTitle />
      <div className='mt-8 flex flex-col'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-300'>
                <TableHeader />
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {users?.map((user) => (
                    <TableRow key={user?.id} user={user} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
