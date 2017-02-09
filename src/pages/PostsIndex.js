import React, { Component } from 'react';
import Header from '../components/header.js';
import PostsList from '../components/PostsList.js';

class PostsIndex extends Component {
  render() {
    return (
      <div>
        <Header type="posts_index"/>
        <PostsList />
      </div>
    );
  }
}


export default PostsIndex;
