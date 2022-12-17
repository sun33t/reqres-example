import { cx } from 'class-variance-authority';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type SectionProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export const Section = ({
  children,
  className,
  ...restOfProps
}: SectionProps) => {
  return (
    <section
      className={cx(['mx-auto w-full max-w-7xl px-4 md:px-8', className])}
      {...restOfProps}
    >
      {children}
    </section>
  );
};
