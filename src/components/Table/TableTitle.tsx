import { Button } from '@components/elements/Button';
import { InputWithButtonAndLabel } from '@components/elements/InputWithButtonAndLabel';
import { TableProps } from '@types';

export const TableTitle = ({
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
