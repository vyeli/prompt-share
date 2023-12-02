"use client"

import Link from 'next/link' // Link component from Next.js to link to other pages in the app
import Image from 'next/image' // Image component from Next.js to optimize images
import { useState, useEffect } from 'react'
import {
  signIn, signOut, useSession,
  getProviders
} from 'next-auth/react' // NextAuth.js functions to sign in and out


const Nav = () => {
  const { data: session } = useSession()

  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  // Set up providers
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()

      setProviders(response)
    }

    setUpProviders()
  }, [])


  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image src="/assets/images/logo.svg" width={30} height={30} className='object-contain'
          alt="Promtshare Logo" />
        <p className='logo_text'>PromptShare</p>
      </Link>

      {/* Desktop navigation */}
      {/* sm screen size and above will be flex, smaller than sm will be hidden */}
      <div className='sm:flex hidden'>
        {/* If it is logged in, will show the create and profile */}
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
              Create Prompt
            </Link>

            <button type='button' onClick={signOut}
              className='outline_btn'>
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session.user.image}
                alt='PromptShare Logo'
                width={30}
                height={30}
                className='object-contain'
              />
            </Link>
          </div>
        ) : (
          <>
            {/* show different provides button */}
            {providers && Object.values(providers).map((provider) => (
              <button
                type='button'
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'
              >
                Sign in with {provider.name}
              </button>
            )
            )}
          </>
        )}
      </div>

      {/* Mobile navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session.user.image}
              alt='profile'
              width={37}
              height={37}
              className='rounded-full'
              onClick={() => setToggleDropdown(prev => !prev)}
            />
            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href="/profile"
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                  className='mt-5 w-full black_btn'>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button
                type='button'
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'
              >
                Sign in with {provider.name}
              </button>
            )
            )}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav