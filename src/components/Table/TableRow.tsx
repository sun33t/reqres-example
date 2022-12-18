import { TableRowProps } from '@types';

export const TableRow = ({ user, handleModal }: TableRowProps) => {
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
