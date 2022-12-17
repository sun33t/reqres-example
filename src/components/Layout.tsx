import { cx } from 'class-variance-authority';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type LayoutProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Layout = ({
  children,
  className,
  ...restOfProps
}: LayoutProps) => {
  return (
    <div
      className={cx([
        'min-h-screen grid-rows-[auto_1fr_auto] bg-neutral-50',
        className,
      ])}
      {...restOfProps}
    >
      {children}
    </div>
  );
};
