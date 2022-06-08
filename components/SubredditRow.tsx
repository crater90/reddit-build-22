import { ChevronUpIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'
import Avatar from './Avatar'

type Props = {
    topic: String
    index: number
}

function SubredditRow({ topic, index }: Props) {
    return (
        <div className='flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b'>
            <p>{index + 1}</p>
            <ChevronUpIcon className='h-4 w-4 flex shrink-0 text-green-400' />
            <Avatar seed={`subreddit/${topic}`} />
            <p className='flex-1 truncate'>r/{topic}</p>
            <Link href={`subreddit/${topic}`}>
                <div className='px-2 py-1 rounded-xl text-white bg-blue-400 cursor-pointer'>
                    View
                </div>
            </Link>

        </div>
    )
}

export default SubredditRow