import { Button } from '@components/elements/Button';
import { InputWithButtonAndLabel } from '@components/elements/InputWithButtonAndLabel';
import { Label } from '@components/elements/Label';
import { TableTitleProps, UserSearchType } from '@types';
import { FormEventHandler, useState } from 'react';

export const TableTitle = ({
  clearSearchQueries,
  handleSearchQuery,
  isSearch,
}: TableTitleProps) => {
  const [searchType, setSearchType] = useState<UserSearchType>('email');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleSearchQuery({ query: searchQuery, type: searchType });
  };

  const handleClearSearch = () => {
    clearSearchQueries();
    setSearchQuery('');
  };

  return (
    <div className='sm:flex sm:items-center'>
      <div className='sm:flex-auto'>
        <h1 className='text-xl font-semibold text-gray-900'>
          {isSearch ? 'Search Results' : 'Users'}
        </h1>
        {!isSearch && (
          <p className='mt-2 text-sm text-gray-700'>
            A list of all the users returned from reqres.in
          </p>
        )}
      </div>
      <div>
        <div className='flex gap-8'>
          <form name='search' onSubmit={handleSubmit} className='flex gap-8'>
            <div>
              <Label htmlFor='location'>Search By</Label>
              <select
                data-testid='searchType'
                id='location'
                name='location'
                className='mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                defaultValue={searchType}
                onChange={(e) =>
                  setSearchType(e.target.value as UserSearchType)
                }
              >
                <option value='email'>Email</option>
                <option value='last_name'>Last Name</option>
              </select>
            </div>
            <InputWithButtonAndLabel
              className='self-end'
              labelProps={{
                htmlFor: 'email',
                children: 'Submit User Search',
                className: 'sr-only',
              }}
              inputProps={{
                'data-testid': 'searchInput',
                value: searchQuery,
                type: searchType === 'email' ? 'email' : 'text',
                name: 'search_input',
                id: 'search_input',
                onChange: (e) => setSearchQuery(e?.target?.value),
              }}
              buttonProps={{ type: 'submit', children: 'Search' }}
            />
          </form>

          <Button
            intent='secondary'
            onClick={handleClearSearch}
            className='self-end'
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};
