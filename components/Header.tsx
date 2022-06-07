import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { signIn, signOut, useSession } from 'next-auth/react'

import { HomeIcon, ChevronDownIcon, SearchIcon } from '@heroicons/react/solid'
import { SparklesIcon, GlobeIcon, VideoCameraIcon, ChatIcon, BellIcon, PlusIcon, SpeakerphoneIcon, MenuIcon } from '@heroicons/react/outline'

function Header() {
    const { data: session } = useSession();
    return (
        <div className='sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm'>

            <div className='relative h-10 w-20 flex-shrink-0 cursor-pointer'>
                <Link href='/'>
                    <Image objectFit='contain' src='https://links.papareact.com/fqy' layout='fill' />
                </Link>
            </div>

            <div className=' mx-7 flex items-center xl:min-w-[300px]'>
                <HomeIcon className='h-5 w-5' />
                <p className='ml-2 hidden flex-1 lg:inline'>Home</p>
                <ChevronDownIcon className='h-5 w-5' />
            </div>

            <form className='flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100'>
                <SearchIcon className='h-5 w-5 text-gray-400 ml-2' />
                <input className='flex-1 bg-gray-100 outline-none' type='text' placeholder='Search Reddit' />
                <button type='submit' hidden />
            </form>

            <div className='mx-5 items-center text-gray-500 space-x-2 hidden lg:inline-flex'>
                <SparklesIcon className='icon' />
                <GlobeIcon className='icon' />
                <VideoCameraIcon className='icon' />
                <hr className='h-10 border border-gray-100' />
                <ChatIcon className='icon' />
                <BellIcon className='icon' />
                <PlusIcon className='icon' />
                <SpeakerphoneIcon className='icon' />
            </div>

            <div className='ml-5 flex items-center lg:hidden'>
                <MenuIcon className='icon' />
            </div>

            {session ?
                (<div onClick={() => signOut()} className='hidden lg:flex items-center space-x-2 p-2 border border-gray-100 cursor-pointer'>
                    <div className='relative h-5 w-5 flex-shrink-0'>
                        <Image src='https://links.papareact.com/23l' alt='' objectFit='contain' layout='fill' />
                    </div>
                    <div className='flex-1 text-xs'>
                        <p>{session?.user?.name}</p>
                        <p className='text-gray-500'>1 Karma</p>
                    </div>
                </div>) :
                (<div onClick={() => signIn()} className='hidden lg:flex items-center space-x-2 p-2 border border-gray-100 cursor-pointer'>
                    <div className='relative h-5 w-5 flex-shrink-0'>
                        <Image src='https://links.papareact.com/23l' alt='' objectFit='contain' layout='fill' />
                    </div>
                    <p className='text-gray-500'>Sign In</p>
                </div>)
            }

        </div>

    )
}

export default Header