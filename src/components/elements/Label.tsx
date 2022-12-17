import { LabelProps } from '@types';
import { cx } from 'class-variance-authority';

export const Label = ({ children, className, ...restOfProps }: LabelProps) => {
  return (
    <label
      className={cx(['block text-sm font-medium text-gray-700', className])}
      {...restOfProps}
    >
      {children}
    </label>
  );
};
