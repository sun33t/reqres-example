import { Button } from '@components/elements/Button';
import { Input } from '@components/elements/Input';
import { Label } from '@components/elements/Label';
import { EditUserFormProps } from '@types';
import { useEffect, useState } from 'react';

export const EditUserForm = ({ user }: EditUserFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    setFirstName(user?.first_name);
    setLastName(user?.last_name);
    setEmail(user?.email);
    setAvatar(user?.avatar);
  }, [user]);
  return (
    <form className='mt-2 w-full'>
      <fieldset>
        <div className='my-4 flex flex-col items-center justify-center'>
          <div className='h-10 w-10 flex-shrink-0'>
            <img
              className='h-10 w-10 rounded-full'
              src={avatar}
              alt={`avatar of ${user?.first_name} ${user?.last_name}`}
            />
          </div>
          <div className='mt-4'>
            <Button intent={'secondary'}>Change</Button>
          </div>
        </div>
        <div className='mt-4'>
          <Label htmlFor='first_name'>First Name</Label>
          <Input
            className='mt-2'
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e?.target?.value)}
            id='first_name'
            name='first_name'
          />
        </div>
        <div className='mt-4'>
          <Label htmlFor='last_name'>Last Name</Label>
          <Input
            className='mt-2'
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e?.target?.value)}
            id='last_name'
            name='last_name'
          />
        </div>
        <div className='mt-4'>
          <Label htmlFor='email'>Email Address</Label>
          <Input
            className='mt-2'
            type='email'
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
            id='email'
            name='email'
          />
        </div>
      </fieldset>
    </form>
  );
};
