import React, { Component } from 'react';
import Header from '../components/header.js';
import PostsNew from '../components/PostsNew.js';

class PostsIndex extends Component {
  render() {
    return (
      <div>
        <Header type="posts_new"/>
        <PostsNew />
      </div>
    );
  }
}


export default PostsIndex;
