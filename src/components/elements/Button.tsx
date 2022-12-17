import { ButtonProps } from '@types';
import { cva, VariantProps } from 'class-variance-authority';

const buttonStyles = cva(
  'inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm',
  {
    variants: {
      intent: {
        primary:
          'bg-indigo-600  text-white  hover:bg-indigo-700  focus:ring-indigo-500',
        secondary:
          'bg-transparent text-black border-slate-500 hover:bg-slate-500 hover:text-white focus:ring-slate-500',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
  }
);

export const Button = ({
  children,
  className,
  intent = 'primary',
  fullWidth = false,
  ...restOfProps
}: ButtonProps<VariantProps<typeof buttonStyles>>) => {
  return (
    <button
      type='button'
      className={buttonStyles({ intent, className, fullWidth })}
      {...restOfProps}
    >
      {children}
    </button>
  );
};
