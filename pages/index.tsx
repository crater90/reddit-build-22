import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import PostBox from '../components/PostBox'
import SubredditRow from '../components/SubredditRow'
import { GET_SUBREDDIT_WITH_LIMIT } from '../graphql/queries'

const Home: NextPage = () => {
  const { data, loading } = useQuery(GET_SUBREDDIT_WITH_LIMIT, {
    variables: {
      limit: 5
    }
  })
  const subreddits: [Subreddit] = data?.getSubredditListByLimit

  return (
    <div className="max-w-5xl my-7 mx-auto">
      <Head>
        <title>Reddit 2.0 clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostBox />
      <div className='flex'>
        <Feed />
        <div className='sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline '>
          <p className='font-bold p-4 pb-3 mb-1'>Top Communities</p>
          <div>
            {subreddits?.map((subreddit, i) => (
              <SubredditRow key={subreddit.id} topic={subreddit.topic} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
