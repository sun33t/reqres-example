import { TableProps } from '@types';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { TableTitle } from './TableTitle';

export const Table = ({
  users,
  clearSearchQueries,
  handleModal,
  isSearch,
  handleSearchQuery,
  ...restOfProps
}: TableProps) => {
  return (
    <div id='User Table' {...restOfProps}>
      <TableTitle
        isSearch={isSearch}
        clearSearchQueries={clearSearchQueries}
        handleSearchQuery={handleSearchQuery}
      />
      <div className='mt-8 flex flex-col'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-300'>
                <TableHeader />
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {users?.length ? (
                    users?.map((user) => (
                      <TableRow
                        key={user?.id}
                        user={user}
                        handleModal={handleModal}
                      />
                    ))
                  ) : (
                    <tr>
                      <td className='whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-900'>
                        No Users To Display
                      </td>
                      <td className='whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-900'></td>
                      <td className='whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-900'></td>
                      <td className='whitespace-nowrap py-4 px-3 text-sm font-medium text-gray-900'></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
