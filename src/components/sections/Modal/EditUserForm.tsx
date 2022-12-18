import { Button } from '@components/elements/Button';
import { Input } from '@components/elements/Input';
import { Label } from '@components/elements/Label';
import { EditUserFormProps } from '@types';
import { FormEventHandler, useState } from 'react';

export const EditUserForm = ({
  user,
  handleModal,
  setOpen,
}: EditUserFormProps) => {
  const { setSelectedUser } = handleModal();

  const [avatar] = useState(user.avatar);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const baseURL = import.meta.env.VITE_REQRES_API_BASE_URL;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setSelectedUser({
      avatar,
      first_name: firstName,
      last_name: lastName,
      email,
      id: user?.id,
    });

    const updateUser = async () => {
      try {
        await fetch(`${baseURL}/users/${user?.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            avatar,
            first_name: firstName,
            last_name: lastName,
            email,
            id: user?.id,
          }),
        })
          .then((res) => res.json())
          .then((res) => console.log(res));
      } catch (error) {
        console.log({ error });
      }
    };
    updateUser();

    setOpen(false);
  };
  return (
    <form className='mt-2 w-full' onSubmit={handleSubmit}>
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
            <Button
              onClick={() =>
                window.alert('This is a simulation - welcome to the multiverse')
              }
              intent={'secondary'}
            >
              Change
            </Button>
          </div>
        </div>
        <div className='mt-4'>
          <Label htmlFor='first_name'>First Name</Label>
          <Input
            className='mt-2'
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
            onChange={(e) => setLastName(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
            id='email'
            name='email'
          />
        </div>
        <div className='mt-5 sm:mt-6'>
          <Button type='submit' fullWidth={true}>
            Submit Changes
          </Button>
        </div>
      </fieldset>
    </form>
  );
};
