import React from "react";
import { Link } from "react-router-dom";
import { Card } from 'flowbite-react';


export default function RelatedArticle({ post }) {
  return (
    <Card><div className="post-item flex flex-row">
      <img className="p-1 w-[75px] h-[60px]" src={post.image} alt="" height=""  />
      <div className="flex flex-col ml-2">
        <h4>
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h4>
        <time style={{fontSize:"10px"}} dateTime={post.daypost}>{new Date(post.daypost).toLocaleDateString()}</time>
      </div>
    </div></Card>
  );
}
