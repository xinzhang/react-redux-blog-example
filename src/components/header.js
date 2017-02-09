import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Header extends Component {
  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.deletedPost.error && nextProps.deletedPost.error.message) {//delete failure
      alert(nextProps.deletedPost.error.message || 'Could not delete. Please try again.');
    } else if(nextProps.deletedPost.post && !nextProps.deletedPost.error) {//delete success
      this.context.router.push('/');
    } else if(this.props.user.user && !nextProps.user.user) {//logout (had user(this.props.user.user) but no loger the case (!nextProps.user.user))
      this.context.router.push('/');
    }
  }

  renderLinks() {
  		const { type, authenticatedUser } = this.props;
  		if(type === 'posts_index') {
         return (
          <div className="container">
            <ul className="nav  nav-pills navbar-right">
        			<li style={{paddingRight: '10px'}} role="presentation">
        				<Link style={{color:'#337ab7',  fontSize: '17px'}} to="/posts/new">
        				New Post
      					</Link>
              </li>
      			</ul>
            {/*this.renderSignInLinks(authenticatedUser)*/}
          </div>
    		 );
    	} else if(type === 'posts_new') {
         return (
          <div className="container">
            {this.renderSignInLinks(authenticatedUser)}
            <ul className="nav  nav-pills navbar-left">
        			<li style={{paddingRight: '10px'}} role="presentation">
        				<Link className="text-xs-right"  style={{color:'#337ab7',  fontSize: '17px'}}  to="/">Back To Index</Link>
        			</li>
      			</ul>
          </div>
    		 );
    	} else if(type === 'posts_show') {
    			return (
    			 <div className="container">
      			<ul className="nav  nav-pills navbar-left">
        			<li style={{paddingRight: '10px'}} style={{color:'#337ab7',  fontSize: '17px'}}  role="presentation"><Link to="/">Back To Index</Link></li>
      			</ul>

      			<div className="navbar-form navbar-right" style={{paddingRight: '50px'}}>
        			<button className="btn btn-warning pull-xs-right"  onClick={()=> {this.props.onDeleteClick()}}>Delete Post</button>
        		</div>
             {/*this.renderSignInLinks(authenticatedUser)*/}
      	   </div>
    		);
    	}
  	};

  render() {
    return (
     <nav className="navbar navbar-default navbar-static-top">
          <div id="navbar" className="navbar-collapse collapse">
          {this.renderLinks()}
          </div>
     </nav>
    );
  }

}

function mapStateToProps(state) {
  return {
    deletedPost: state.posts.deletedPost,
    //authenticatedUser: state.user.status === 'authenticated' ? state.user.user : null,
    //user: state.user
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  	 onDeleteClick: () => {
      // let token = sessionStorage.getItem('jwtToken');
      // if (!token || token === '') { //if there is no token, dont bother,
      //     let data = {data: {message: 'Please Sign In'}};//axios like error
      //     dispatch(deletePostFailure(data)); // but let other comps know
      //     return;
      // }

    // 	dispatch(deletePost(ownProps.postId, token))
    //   	.then((response) => {
    //         !response.error ? dispatch(deletePostSuccess(response.payload)) : dispatch(deletePostFailure(response.payload));
    //       });
  	},

     resetMe: () =>{
        //dispatch(resetDeletedPost());
     },

     logout: () => {
         //sessionStorage.removeItem('jwtToken');
         //dispatch(logoutUser());
     }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
