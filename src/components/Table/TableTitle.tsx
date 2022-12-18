import { Button } from '@components/elements/Button';
import { InputWithButtonAndLabel } from '@components/elements/InputWithButtonAndLabel';
import { TableTitleProps } from '@types';
import { FormEventHandler, useState } from 'react';

export const TableTitle = ({
  clearSearchQueries,
  handleSearchQuery,
  isSearch,
}: TableTitleProps) => {
  const [emailSearch, setEmailSearch] = useState('');
  const [lastNameSearch, setLastNameSearch] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    if (target) {
      if (target?.name === 'emailSearch') {
        handleSearchQuery({ type: 'email', query: emailSearch });
      }

      if (target?.name === 'lastNameSearch') {
        handleSearchQuery({ type: 'last_name', query: lastNameSearch });
      }
    }
  };

  const handleClearSearch = () => {
    clearSearchQueries();
    setEmailSearch('');
    setLastNameSearch('');
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
          <form name='emailSearch' onSubmit={handleSubmit}>
            <InputWithButtonAndLabel
              labelProps={{ htmlFor: 'email', children: 'Search By Email' }}
              inputProps={{
                value: emailSearch,
                type: 'email',
                name: 'email',
                id: 'email',
                onChange: (e) => setEmailSearch(e?.target?.value),
              }}
              buttonProps={{ type: 'submit', children: 'Search' }}
            />
          </form>
          <form name='lastNameSearch' onSubmit={handleSubmit}>
            <InputWithButtonAndLabel
              labelProps={{
                htmlFor: 'last_name',
                children: 'Search By Last Name',
              }}
              inputProps={{
                value: lastNameSearch,
                type: 'last_name',
                name: 'last_name',
                id: 'last_name',
                onChange: (e) => setLastNameSearch(e?.target?.value),
              }}
              buttonProps={{ type: 'submit', children: 'Search' }}
            />
          </form>
          {isSearch && (
            <Button
              intent='secondary'
              onClick={handleClearSearch}
              className='self-end'
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
