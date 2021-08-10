import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllPosts = createAsyncThunk(
    "posts/fetchallPosts",
    async () => {
      const { data } = await axios.get(
        "https://SocialMedia.kunalgupta9.repl.co/post/feed"
      );
  
      return data;
    }
  );

  export const likePost = createAsyncThunk(
    "post/likePost",
    async (postid, { fulfillWithValue, rejectWithValue }) => {
      try {
        const { status, data } = await axios.post(
          `https://SocialMedia.kunalgupta9.repl.co/post/${postid}/like`
        );
        if (status === 201) {
          return fulfillWithValue(data);
        }
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  export const unlikePost = createAsyncThunk(
    "post/unlikePost",
    async (postid, { fulfillWithValue, rejectWithValue }) => {
      try {
        const { status, data } = await axios.post(
          `https://SocialMedia.kunalgupta9.repl.co/post/${postid}/unlike`
        );
        if (status === 200) {
          return fulfillWithValue(data);
        }
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  export const fetchSinglePost = createAsyncThunk(
    "post/fetchSinglePost",
    async (postid, { fulfillWithValue, rejectWithValue }) => {
      try {
        const { status, data } = await axios.get(
          `https://SocialMedia.kunalgupta9.repl.co/post/${postid}`
        );
        if (status === 200) {
          return fulfillWithValue(data);
        }
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const likeSinglePost = createAsyncThunk(
    "post/likeSinglePost",
    async (postid, { fulfillWithValue, rejectWithValue }) => {
      try {
        const { status, data } = await axios.post(
          `https://SocialMedia.kunalgupta9.repl.co/post/${postid}/likeone`
        );
        if (status === 201) {
          return fulfillWithValue(data);
        }
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  export const unLikeSinglePost = createAsyncThunk(
    "post/unlikeSinglePost",
    async (postid, { fulfillWithValue, rejectWithValue }) => {
      try {
        const { status, data } = await axios.post(
          `https://SocialMedia.kunalgupta9.repl.co/post/${postid}/unlikeone`
        );
        if (status === 200) {
          return fulfillWithValue(data);
        }
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const postComment = createAsyncThunk(
    "post/postComment",
    async ({ postid, comment }, { fulfillWithValue, rejectWithValue }) => {
      try {
        const { status, data } = await axios.post(
          `https://SocialMedia.kunalgupta9.repl.co/post/${postid}/comment`,
          { comment }
        );
        if (status === 201) {
          return fulfillWithValue(data);
        }
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  export const createPost = createAsyncThunk(
    "post/createPost",
    async ({ content, image }, { fulfillWithValue, rejectWithValue }) => {
      let postData = {
        desc: content,
      };
      if (image) {
        const formData = new FormData();
        const fileName = Date().now + image.name;
        formData.append("image", image);
        formData.append("name", fileName);
        try {
          const { data, status } = await axios.post(
            "https://SocialMedia.kunalgupta9.repl.co/images/upload",
            formData
          );
          if (status === 201) {
            postData.image = data.url;
          }
        } catch (err) {
          console.log(err.message);
        }
      }
      try {
        const { data } = await axios.post(
          "https://SocialMedia.kunalgupta9.repl.co/post",
          postData
        );
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response);
      }
    }
  );
  
  export const getAllUserPost = createAsyncThunk(
    "post/getAllUserPost",
    async (userid) => {
      const response = await axios.get(
        `https://SocialMedia.kunalgupta9.repl.co/post/${userid}/allposts`
      );
        console.log(userid)
      return response.data;
    }
  );
  
  export const getAllLikedPost = createAsyncThunk(
    "post/getAllLikedPost",
    async (userid) => {
      const response = await axios.get(
        `https://SocialMedia.kunalgupta9.repl.co/post/${userid}/likedposts`
      );
  
      return response.data;
    }
  );
  

const postSlice = createSlice({
    name: "posts",
    initialState: {
      posts: [],
      singlePost: "",
      status: "idle",
      error: null,
    },
    reducers: {},
    extraReducers: {
      [fetchAllPosts.pending]: (state) => {
        state.status = "pending";
      },
      [fetchAllPosts.fulfilled]: (state, action) => {
        state.status = "success";
        state.posts = action.payload;
      },
  
      [likePost.pending]: (state) => {
        state.status = "pending";
      },
      [likePost.fulfilled]: (state, action) => {
        state.status = "success";
        const existingPost = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        state.posts.splice(existingPost, 1, action.payload);
      },
      [likePost.rejected]: (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      },
      [unlikePost.pending]: (state) => {
        state.status = "pending";
      },
      [unlikePost.fulfilled]: (state, action) => {
        state.status = "success";
        const existingPost = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        state.posts.splice(existingPost, 1, action.payload);
      },
      [unlikePost.rejected]: (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      },
      [fetchSinglePost.fulfilled]: (state, action) => {
        state.singlePost = action.payload;
      },
      [likeSinglePost.fulfilled]: (state, action) => {
        state.singlePost = action.payload;
      },
      [unLikeSinglePost.fulfilled]: (state, action) => {
        state.singlePost = action.payload;
      },
      [postComment.fulfilled]: (state, action) => {
        state.singlePost = action.payload;
      },
      [createPost.fulfilled]: (state, action) => {
        state.posts.push(action.payload);
        console.log("reducer", action.payload);
      },
      [getAllUserPost.pending]: (state) => {
        state.status = "pending";
      },
      [getAllUserPost.fulfilled]: (state, action) => {
        state.status = "success";
        state.posts = action.payload;
      },
      [getAllUserPost.rejected]: (state, action) => {
        state.status = "failed";
        state.error = action.error;
      },
      [getAllLikedPost.pending]: (state) => {
        state.status = "pending";
      },
      [getAllLikedPost.fulfilled]: (state, action) => {
        state.status = "success";
        state.posts = action.payload;
      },
      [getAllLikedPost.rejected]: (state, action) => {
        state.status = "failed";
        state.error = action.error;
      },
    },
  });
  
  export const { postAdded, likedPost, commentPost } = postSlice.actions;
  export default postSlice.reducer;
  
  export const selectPostById = (state, id) =>
    state.post.posts.find((item) => item._id === id);