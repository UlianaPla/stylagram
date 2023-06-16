import { createSlice, 
  PayloadAction, 
  createAsyncThunk,
  createEntityAdapter,} from '@reduxjs/toolkit';
import {FeedItem} from '../../types';
import { RootState } from '../../store';

const postsAdapter = createEntityAdapter<FeedState>({
});

// const feedsource:FeedItem[] = [
//     {
//       source:
//         'https://dag08uxs564ub.cloudfront.net/images/View_from_Mogielica_in_Beskid_Wyspowy_-_Pol.max-1280x768.jpg',
//       likes: '43',
//       comments: '3',
//       isVideo: false,
//       id: 0,
//     },
//     {
//       source:
//         'https://dag08uxs564ub.cloudfront.net/images/morskie_oko_lake.max-1280x768.jpg',
//       likes: '313',
//       comments: '10',
//       isVideo: true,
//       id: 1,
//     },
//     {
//       source:
//         'https://www.flydubai.com/en/media/poland-tatra-806x400_w806.jpg_tcm8-137320_w806.jpg',
//       likes: '29',
//       comments: '2',
//       isVideo: false,
//       id: 2,
//     },
//     {
//       source:
//         'https://www.swedishnomad.com/wp-content/images/2018/01/tatra-mountains.jpg',
//       likes: '18',
//       comments: '2',
//       isVideo: false,
//       id: 3,
//     },
//     {
//       source:
//         'https://media.wired.com/photos/59273e94af95806129f52071/master/w_1600%2Cc_limit/Kacper-Kowalski-SE_Seasons_Autumn_01.jpg',
//       likes: '30',
//       comments: '4',
//       isVideo: false,
//       id: 4,
//     },
//   ];
  
interface FeedState {
  loading:boolean,
  data:FeedItem[],
}

const initialState:FeedState = postsAdapter.getInitialState({
  loading:false,  
  data: [],
});

export const fetchPosts = createAsyncThunk(
  "feed/fetchPosts",
  async ():Promise<[FeedItem]> => {
  
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/1/photos`);
    return await response.json();
  }
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    // addPost: (state, action: PayloadAction<FeedItem>) => {
    //     state.value.push(action.payload);
    // },
    // archivePost: (state) => {
    // },
    likePost:(state, action: PayloadAction<number>)=>{
      const post = postById(state, action.payload);
      post.likes = (+post.likes + 1).toString();
    },
    // dislikePost:(state, action: PayloadAction<number>)=>{
    //   const post = postById(state, action.payload);
    //   post.likes = (+post.likes - 1).toString();
    // },
    // addComment: (state, action: PayloadAction<number>) => {
    //     const post = postById(state, action.payload);
    //     post.comments = (+post.comments + 1).toString();
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      console.log('pending')
        state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      console.log('fulfilled');
      console.log(action.payload)
        state.data = action.payload.slice(0, 9);
        state.loading = false;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      console.log('rejected')
        state.loading = false;
    });
    builder.addDefaultCase(() => {});
}
})

const postById = (state:FeedState, id:number):FeedItem => {
  const posts = state.data.filter((item) => item.id === id);
  return posts[0];
}

const { actions, reducer } = feedSlice;

export default reducer;

// Action creators are generated for each case reducer function
// export const { addPost, archivePost, addComment, likePost, dislikePost } = feedSlice.actions;
export const { likePost } = actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFeed = (state: RootState) => state.feed.data;
