import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Tweet {
    id: string,
    user_id: string,
    content: string,
    created_at: string,
    profiles: {
        username: string
    }
}

type TweetsState = {
    tweets: Tweet[],
}

const initialState: TweetsState = {
    tweets: []
}

const tweetsSlice = createSlice(
    {
        name: "tweets",
        initialState,
        reducers: {
            setTweets(state, action: PayloadAction<Tweet[]>){
                state.tweets = action.payload;
            },
            addTweet(state, action: PayloadAction<Tweet>){
                state.tweets.unshift(action.payload);
            }
        }
    }
)

export const { setTweets, addTweet } = tweetsSlice.actions;
export default tweetsSlice.reducer;