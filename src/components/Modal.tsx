import { Button } from '@components/elements/Button';
import { Input } from '@components/elements/Input';
import { Label } from '@components/elements/Label';
import { Dialog, Transition } from '@headlessui/react';
import { ModalProps } from '@types';
import { Fragment, useEffect, useState } from 'react';

export const Modal = ({ setOpen, open, user }: ModalProps) => {
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
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
                <div>
                  <div className='mt-3 sm:mt-5'>
                    <Dialog.Title
                      as='h3'
                      className='text-center text-lg font-medium leading-6 text-gray-900'
                    >
                      Edit User
                    </Dialog.Title>
                    <div className='mt-2'>
                      <form className='w-full'>
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
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6'>
                  <Button fullWidth={true} onClick={() => setOpen(false)}>
                    Submit Changes
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
