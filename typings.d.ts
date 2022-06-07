type Comment = {
    created_at: String
    id: number
    post_id: number
    text: String
    username: String
}

type Vote = {
    created_at: String
    id: number
    post_id: number
    upvote: Boolean
    username: String
}

type Subreddit = {
    created_at: String
    id: number
    topic: String
}

type Post = {
    body: String
    created_at: string
    id: number
    image: string
    subreddit_id: number
    title: String
    username: String
    votes: Vote[]
    comments: Comment[]
    subreddit: Subreddit[]
}