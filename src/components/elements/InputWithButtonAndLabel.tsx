import { Button } from '@components/elements/Button';
import { Input } from '@components/elements/Input';
import { Label } from '@components/elements/Label';
import { ComponentProps, DetailedHTMLProps, HTMLAttributes } from 'react';

type InputWithButtonAndLabelProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  labelProps: ComponentProps<typeof Label>;
  inputProps: ComponentProps<typeof Input>;
  buttonProps: ComponentProps<typeof Button>;
};

export const InputWithButtonAndLabel = ({
  labelProps,
  inputProps,
  buttonProps,
  ...restOfProps
}: InputWithButtonAndLabelProps) => {
  return (
    <div {...restOfProps}>
      <Label {...labelProps} />
      <div className='flex'>
        <Input {...inputProps} className='rounded-r-none border-r-0' />
        <Button {...buttonProps} className='rounded-l-none' />
      </div>
    </div>
  );
};
