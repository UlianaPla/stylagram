import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { FeedItem } from "../../types";
import { RootState } from "../../store";

const postsAdapter = createEntityAdapter<FeedState>({});

const userId = `ZOa3HudHsi0Eoar4xJeBykUb74T9MDHysDlC6Y4swXg`;

interface FeedState {
  loading: boolean;
  data: FeedItem[];
}

interface APIDto {
  total: number;
  total_pages: number;
  results: [];
}

const initialState: FeedState = postsAdapter.getInitialState({
  loading: false,
  data: [],
});

export const fetchPosts = createAsyncThunk(
  "feed/fetchPosts",
  async (page: number): Promise<APIDto> => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=minimal&page=${page}&client_id=${userId}`
    );
    return await response.json();
  }
);

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    likePost: (state, action: PayloadAction<number>) => {
      const post = postById(state, action.payload);
      if (post.isLikedByUser) {
        post.likes = (+post.likes - 1).toString();
        post.isLikedByUser = false;
      } else {
        post.likes = (+post.likes + 1).toString();
        post.isLikedByUser = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      const posts: FeedItem[] = action.payload.results.map(_transformPost);
      state.data = [...state.data, ...posts];
      state.loading = false;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.loading = false;
    });
    builder.addDefaultCase(() => {});
  },
});

const postById = (state: FeedState, id: number): FeedItem => {
  const posts = state.data.filter((item) => item.id === id);
  return posts[0];
};

const _transformPost = (post: {
  id: number;
  description: string;
  urls: { thumb: string; small: string };
  likes: number;
  liked_by_user: boolean;
}): FeedItem => {
  return {
    id: post.id,
    title: post.description || "There is no description",
    url: post.urls.small,
    thumbnailUrl: post.urls.thumb,
    likes: post.likes.toString(),
    comments: "100",
    isVideo: false,
    isLikedByUser: post.liked_by_user,
  };
};

const { actions, reducer } = feedSlice;

export default reducer;

// Action creators are generated for each case reducer function
export const { likePost } = actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFeed = (state: RootState) => state.feed.data;
