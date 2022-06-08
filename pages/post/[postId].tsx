import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import React from 'react'
import Post from '../../components/Post';
import { GET_POST_BY_POST_ID } from '../../graphql/queries';
import { useForm, SubmitHandler } from 'react-hook-form'
import { ADD_COMMENT } from '../../graphql/mutations';
import toast from 'react-hot-toast';
import Avatar from '../../components/Avatar';
import TimeAgo from 'react-timeago'

function SinglePostView() {
    const router = useRouter();
    const { data: session } = useSession();
    const [addComment] = useMutation(ADD_COMMENT, {
        refetchQueries: [GET_POST_BY_POST_ID, 'getPostByPostId']
    })
    const { data } = useQuery(GET_POST_BY_POST_ID, {
        variables: {
            post_id: router.query.postId
        }
    })

    const post: Post = data?.getPostByPostId;

    type FormData = {
        comment: string
    }

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>()

    const submit: SubmitHandler<FormData> = async (data) => {
        console.log(data);
        const notification = toast.loading('Posting your comment...');
        await addComment({
            variables: {
                post_id: router.query.postId,
                username: session?.user?.name,
                text: data.comment
            }
        })
        setValue('comment', '');
        toast.success('Posted successfully', {
            id: notification
        })

    }

    return (
        <div className='mx-auto max-w-5xl my-7'>
            <Post post={post} />
            {post &&
                <div className=' -mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16'>
                    <p className='text-sm'>Comment as
                        <span className='text-red-500'> {session?.user?.name}</span>
                    </p>
                    <form onSubmit={handleSubmit(submit)} className='flex flex-col space-y-2'>
                        <textarea
                            {...register('comment')}
                            disabled={!session}
                            className='h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50'
                            placeholder={session ? 'What are your thoughts ?' : 'Please sign in to comment'}
                        />
                        <button type='submit'
                            className='rounded-full bg-red-500 font-semibold p-3 text-white disabled:bg-gray-200'>Comment</button>
                    </form>
                </div>

            }
            {post &&
                <div className='-my-5 rounded-b-md border-t-0 border border-gray-300 bg-white py-5 px-10'>
                    <hr className='py-2' />
                    {(post?.comments as any).map((comment: { id: string; username: string; created_at: string | number | Date; text: string; }) => (
                        <div className='relative flex items-center space-x-2 space-y-5' key={comment.id}>
                            <hr className='absolute left-7 top-10 z-0 h-16 border' />
                            <div className='z-50'>
                                <Avatar seed={comment.username} />
                            </div>
                            <div className='flex flex-col'>
                                <p className='py-2 text-xs text-gray-400'>
                                    <span className='font-semibold text-gray-600'> {comment.username}</span> {''}
                                    <TimeAgo date={comment.created_at} />
                                </p>
                                <p>{comment.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default SinglePostView