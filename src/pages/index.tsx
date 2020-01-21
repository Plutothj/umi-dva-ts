import React from 'react';
import styles from './index.css';
import CommentList from '../components/home/CommentList';
import BlogPost from '../components/home/BlogPost';
import withSubscription from '../components/hocComponents/index'


const CommentListWithSubscription  = withSubscription(
  CommentList,
  (DataSource:any)=>DataSource.getComments()
)

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource:any, props:any) => DataSource.getBlogPost()
);




export default class extends React.Component<any,any>{
  constructor(props:any){
    super(props);

  }

  render(){
    const style = {
      width:'100%',
      'text-align': 'center',
      title:{
          color:'red'
      }
  }
    return(
            <div style={style}>
                <h1 style={style.title}>hello hoc</h1>
                <CommentListWithSubscription />
                <BlogPostWithSubscription />
            </div>
    )
  }
}
