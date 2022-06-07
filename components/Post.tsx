import React from 'react'

import Avatar from './Avatar'

import Link from 'next/link'

import { ArrowDownIcon, ArrowUpIcon, BookmarkIcon, ChatAltIcon, DotsHorizontalIcon, ShareIcon, GiftIcon } from '@heroicons/react/outline'

import TimeAgo from 'react-timeago'
import { Jelly } from '@uiball/loaders'

type Props = {
    post: Post
}

function Post({ post }: Props) {
    if (!post) return (
        <div className='w-full flex items-center justify-center text-xl p-10'>
            <Jelly size={50} color='orange' />
        </div>
    )
    return (
        <Link href={`/post/${post.id}`}>
            <div className='flex rounded-md border border-gray-300 bg-white hover:border-gray-600 bh-white shadow-sm cursor-pointer'>
                {/* upvote */}
                <div className='flex flex-col items-center p-4 justify-start rounded-l-md bg-gray-50 text-gray-400 space-y-1'>
                    <ArrowUpIcon className='voteBtns hover:text-red-400' />
                    <p className='text-black font-bold text-xs'>0</p>
                    <ArrowDownIcon className='voteBtns hover:text-blue-400' />

                </div>
                <div className='p-3 pb-1'>
                    {/* Header */}
                    <div className='flex items-center space-x-1'>
                        <Avatar seed={post.subreddit[0]?.topic} />
                        <p className='text-xs text-gray-400'>
                            <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                                <span className='font-bold text-black hover:text-blue-400 hover:underline'>
                                    r/{post.subreddit[0]?.topic}
                                </span>
                            </Link> * Posted by u/
                            {post.username} <TimeAgo date={post.created_at} />
                        </p>
                    </div>
                    <div className='py-4 '>
                        <h2 className='text-xl font-semibold'>{post.title}</h2>
                        <p className='mt-2 text-sm font-light'>{post.body}</p>

                    </div>
                    <img className='w-full' src={post.image} alt='' />

                    <div className='flex space-x-4 text-gray-400'>
                        <div className='postBtns'>
                            <ChatAltIcon className='h-6 w-6' />
                            <p className=''>{post.comments.length} comments</p>
                        </div>
                        <div className='postBtns'>
                            <GiftIcon className='h-6 w-6' />
                            <p className='hidden sm:inline'>awards</p>
                        </div>
                        <div className='postBtns'>
                            <ShareIcon className='h-6 w-6' />
                            <p className='hidden sm:inline'>share</p>
                        </div>
                        <div className='postBtns'>
                            <BookmarkIcon className='h-6 w-6' />
                            <p className='hidden sm:inline'>save</p>
                        </div>
                        <div className='postBtns'>
                            <DotsHorizontalIcon className='h-6 w-6' />
                        </div>

                    </div>

                </div>


            </div>
        </Link>
    )
}

export default Post