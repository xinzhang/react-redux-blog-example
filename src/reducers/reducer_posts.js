import * as actions from '../actions/posts';

const INITIAL_STATE = {
            postsList: {posts: [], error:null, loading: false},
            newPost:{post:null, error: null, loading: false},
            activePost:{post:null, error:null, loading: false},
            deletedPost: {post: null, error:null, loading: false}
};

export default function(state = INITIAL_STATE, action) {
  
  switch(action.type) {
    default:
      return state;
  }

}
