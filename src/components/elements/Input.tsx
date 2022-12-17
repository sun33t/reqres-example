import { InputProps } from '@types';
import { cx } from 'class-variance-authority';

export const Input = ({
  value,
  type,
  id,
  name,
  className,
  ...restOfProps
}: InputProps) => {
  return (
    <input
      className={cx([
        'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
        className,
      ])}
      type={type}
      value={value}
      id={id}
      name={name}
      {...restOfProps}
    />
  );
};
