import React from 'react'
import { useSession } from 'next-auth/react'
import Avatar from './Avatar'
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations'
import client from '../apollo-client'
import { GET_ALL_POST, GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries'
import toast from 'react-hot-toast'


type FormData = {
    postTitle: String
    postBody: String
    postImage: String
    subReddit: String
}
type Props = {
    subreddit?: string
}

function PostBox({ subreddit }: Props) {
    const { data: session } = useSession()
    const [imageBoxOpen, setImageBoxOpen] = useState<Boolean>(false)
    const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm<FormData>()

    const [addPost] = useMutation(ADD_POST, {
        refetchQueries: [GET_ALL_POST, 'getPostList']
    })
    const [addSubreddit] = useMutation(ADD_SUBREDDIT)

    const submit = handleSubmit(async (formData) => {
        console.log(formData);
        const notification = toast.loading('Creating new post....')
        try {
            const { data: { getSubredditListByTopic } } = await client.query({
                query: GET_SUBREDDIT_BY_TOPIC,
                variables: {
                    topic: subreddit || formData.subReddit
                }
            })

            const subRedditExists = getSubredditListByTopic.length > 0
            if (!subRedditExists) {
                //create a new subreddit
                console.log('Subreddit is new --> Creating a new one...')
                const { data: { insertSubreddit: newSubreddit } } = await addSubreddit({
                    variables: {
                        topic: formData.subReddit
                    }
                })
                console.log('Creating post...', formData)
                const image = formData.postImage || ''
                const { data: { insertPost: newPost } } = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        subreddit_id: newSubreddit.id,
                        title: formData.postTitle,
                        username: session?.user?.name
                    }
                })
                console.log('New post added', newPost)
            } else {
                //use existing one 
                const image = formData.postImage || ''
                const { data: { insertPost: newPost } } = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        subreddit_id: getSubredditListByTopic[0].id,
                        title: formData.postTitle,
                        username: session?.user?.name
                    }
                })
                console.log('New post added', newPost)
            }
            setValue('postBody', '')
            setValue('postTitle', '')
            setValue('postImage', '')
            setValue('subReddit', '')
            toast.success('New Post created!', {
                id: notification
            })
        } catch (error) {
            toast.error('Something went wrong', {
                id: notification
            })

        }
    })

    return (
        <form onSubmit={submit} className='sticky top-20 z-50 p-2 bg-white border border-gray-300 rounded-md'>
            <div className='flex items-center space-x-3'>
                <Avatar seed='meo' />
                {/* Avatar */}
                <input
                    {...register('postTitle', { required: true })}
                    disabled={!session}
                    className=' flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none'
                    type='text'
                    placeholder={session ? subreddit ? `Create a post in r/${subreddit} ` : 'Create a post by entering a title' : 'Sign in to post'}
                />
                <PhotographIcon onClick={() => setImageBoxOpen(!imageBoxOpen)} className={`h-6 text-gray-300 cursor-pointer ${imageBoxOpen && 'text-blue-300'}`} />
                <LinkIcon className='h-6 text-gray-300' />
            </div>

            {!!watch('postTitle') && (
                <div className='flex flex-col py-2'>
                    <div className='flex items-center px-2'>
                        <p className='min-w-[90px]'>Body:</p>
                        <input className='m-2 flex-1 p-2 bg-blue-50 outline-none' {...register('postBody')} type='text' placeholder='text (optional)' />
                    </div>

                    {!subreddit &&
                        <div className='flex items-center px-2'>
                            <p className='min-w-[90px]'>SubReddit:</p>
                            <input className='m-2 flex-1 p-2 bg-blue-50 outline-none' {...register('subReddit', { required: true })} type='text' placeholder='i.e. reactjs' />
                        </div>
                    }

                    {imageBoxOpen && (
                        <div className='flex items-center px-2'>
                            <p className='min-w-[90px]'>Image URL:</p>
                            <input className='m-2 flex-1 p-2 bg-blue-50 outline-none' {...register('postImage')} type='text' placeholder='Optional...' />
                        </div>
                    )}

                    {Object.keys(errors).length > 0 && (
                        <div className='space-y-2 p-2 text-red-500'>
                            {(errors.postTitle as any)?.type === 'required' && (
                                <p>A Post Title is required.</p>
                            )}

                            {(errors.subReddit as any)?.type === 'required' && (
                                <p>A Subreddit is required.</p>
                            )}
                        </div>
                    )}

                    {!!watch('postTitle') && (
                        <button className='w-full rounded-full p-2 bg-blue-400 text-white' type='submit'>Create Post</button>
                    )}
                </div>

            )}
        </form>
    )
}

export default PostBox