import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import classNames from 'classnames'
import {
  Menu,
  Transition,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/react'

import Button from './Button'
import React from 'react'
import { MenuLink } from './menu-link'

export function MenuUser() {
  const { data, status } = useSession()

  if (status === 'loading') {
    return null
  }

  if (status === 'unauthenticated') {
    return (

      <div className="flex flex-col w-full sm:w-auto sm:flex-row p-4">

        <Link href="/register" passHref>{'Create my account'}
        </Link>
        <Link href="/login" passHref>
          {'Sign in'}
        </Link>
      </div>
    )
  }

  if (status === 'authenticated') {
    return (
      <div className="flex space-x-4">

        <Menu as="div" className="relative z-50">
          <MenuButton
            className="flex items-center justify-center space-x-1 hover:bg-faint-white cursor-pointer pl-4">

            
            <div className="flex flex-col text-sm px-2">

              <div className="flex items-center gap-2">
                <div className="">Welcome Back</div>
                <div className="text-sm font-medium bold-12">
                  {data.user.name}
                </div>
              </div>
            </div>
          </MenuButton>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <MenuItems
              className="absolute right-0 w-48 mt-2 origin-top-right bg-white border divide-y shadow-md border-border divide-border">
              <MenuItem as="div" className="flex flex-col px-3 py-2">
                <p className="font-semibold">{data.user.name}</p>
                <p className="text-sm truncate text-gray">{data.user.email}</p>
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <MenuLink
                    href="/account"
                    className={classNames(
                      'flex hover:bg-body w-full px-3 py-2 text-text',
                      {
                        'bg-body': active
                      }
                    )}
                  >
                    {'My account'}
                  </MenuLink>

                )}

              </MenuItem>
              <MenuItem>
                {({ active }) => (

                  <button
                    className={classNames('flex w-full px-3 py-2 text-text', {
                      'bg-body': active
                    })}
                    onClick={() => signOut()}
                  >
                    {'logout'}
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>

      </div>
    )
  }
}
