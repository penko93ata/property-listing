"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo-white.png";
import profileDefault from "@/assets/images/profile.png";
import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa";
import { SetStateAction, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import UnreadMessageCount from "./UnreadMessageCount";

function useGetActiveLinkClasses(activeLink: string, activeClass = "bg-black") {
  const pathName = usePathname();

  return twMerge(
    "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium",
    pathName === activeLink && activeClass
  );
}

type TAuthProvider = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [providers, setProviders] = useState<TAuthProvider>(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setAuthProviders();
  }, []);

  return (
    <nav className='bg-blue-700 border-b border-blue-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>
          <BurgerMenuButton toggleMenu={setIsMobileMenuOpen} />

          <DesktopNavbarLinks providers={providers} />
        </div>
      </div>

      {isMobileMenuOpen && <MobileNavbarLinks providers={providers} />}
    </nav>
  );
}

function DesktopNavbarLinks({ providers }: { providers: TAuthProvider }) {
  const { data: session } = useSession();
  const homeLinkClass = useGetActiveLinkClasses("/");
  const propertiesLinkClass = useGetActiveLinkClasses("/properties");
  const addPropertyLinkClass = useGetActiveLinkClasses("/properties/add");

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const profileImage = session?.user?.image;

  return (
    <>
      <div className='flex flex-1 items-center justify-center lg:items-stretch lg:justify-start'>
        <Link className='flex flex-shrink-0 items-center' href='/'>
          <Image className='h-10 w-auto' src={logo} alt='PropertyPulse' />

          <span className='hidden lg:block text-white text-2xl font-bold ml-2'>PropertyPulse</span>
        </Link>
        <div className='hidden lg:ml-6 lg:block'>
          <div className='flex space-x-2'>
            <Link href='/' className={homeLinkClass}>
              Home
            </Link>
            <Link href='/properties' className={propertiesLinkClass}>
              Properties
            </Link>
            {session && (
              <Link href='/properties/add' className={addPropertyLinkClass}>
                Add Property
              </Link>
            )}
          </div>
        </div>
      </div>
      {!session && (
        <div className='hidden lg:block lg:ml-6'>
          <div className='flex items-center'>
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  key={provider.id}
                  className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
                  onClick={() => signIn(provider.id)}
                >
                  <FaGoogle className='text-white mr-2' />
                  <span>Login or Register</span>
                </Button>
              ))}
          </div>
        </div>
      )}
      {session && (
        <div className='absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0 bg-red'>
          <Link href='/messages' className='relative group'>
            <button
              type='button'
              className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
            >
              <span className='absolute -inset-1.5'></span>
              <span className='sr-only'>View notifications</span>
              <MessagesIcon />
            </button>
            <UnreadMessageCount />
          </Link>
          <div className='relative ml-3'>
            <div>
              <button
                type='button'
                className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                id='user-menu-button'
                aria-expanded='false'
                aria-haspopup='true'
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              >
                <span className='absolute -inset-1.5'></span>
                <span className='sr-only'>Open user menu</span>
                <Image className='h-8 w-8 rounded-full' src={profileImage || profileDefault} alt='' width={40} height={40} />
              </button>
            </div>

            {isProfileMenuOpen && (
              <div
                id='user-menu'
                className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='user-menu-button'
                tabIndex={-1}
              >
                <Link
                  href='/profile'
                  className='block px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  tabIndex={-1}
                  id='user-menu-item-0'
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  href='/properties/saved'
                  className='block px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  tabIndex={-1}
                  id='user-menu-item-2'
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  Saved Properties
                </Link>
                <button
                  className='block px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  tabIndex={-1}
                  id='user-menu-item-2'
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function MobileNavbarLinks({ providers }: { providers: TAuthProvider }) {
  const homeLinkClass = useGetActiveLinkClasses("/");
  const propertiesLinkClass = useGetActiveLinkClasses("/properties");
  const addPropertyLinkClass = useGetActiveLinkClasses("/properties/add");

  const { data: session } = useSession();

  return (
    <div id='mobile-menu'>
      <div className='space-y-1 px-2 pb-3 pt-2'>
        <Link href='/' className={homeLinkClass}>
          Home
        </Link>
        <Link href='/properties' className={propertiesLinkClass}>
          Properties
        </Link>
        {session ? (
          <Link href='/properties/add' className={addPropertyLinkClass}>
            Add Property
          </Link>
        ) : (
          providers &&
          Object.values(providers).map((provider) => (
            <Button
              key={provider.id}
              className='flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-4'
              onClick={() => signIn(provider.id)}
            >
              <FaGoogle className='text-white mr-2' />
              <span>Login or Register</span>
            </Button>
          ))
        )}
      </div>
    </div>
  );
}

function MessagesIcon() {
  return (
    <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' aria-hidden='true'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
      />
    </svg>
  );
}

function BurgerMenuIcon() {
  return (
    <svg className='block h-6 w-6' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' aria-hidden='true'>
      <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
    </svg>
  );
}

function BurgerMenuButton({ toggleMenu }: { toggleMenu: (value: SetStateAction<boolean>) => void }) {
  return (
    <div className='absolute inset-y-0 left-0 flex items-center lg:hidden'>
      <Button
        type='button'
        id='mobile-dropdown-button'
        className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white bg-transparent'
        aria-controls='mobile-menu'
        aria-expanded='false'
        onClick={() => toggleMenu((prev) => !prev)}
      >
        <span className='absolute -inset-0.5'></span>
        <span className='sr-only'>Open main menu</span>
        <BurgerMenuIcon />
      </Button>
    </div>
  );
}
