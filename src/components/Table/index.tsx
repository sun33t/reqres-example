import { TableProps } from '@types';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { TableTitle } from './TableTitle';

/**
 * The layout and styles for this Table component and child elements has been adapted from https://tailwindui.com/components/application-ui/lists/tables and were not my own work. I used this resource to bootstrap these table components in order to aid test completion.
 */
export const Table = ({
  users,
  clearSearchQueries,
  handleModal,
  isSearch,
  handleSearchQuery,
  ...restOfProps
}: TableProps) => {
  return (
    users && (
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
