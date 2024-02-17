import { Button, Spinner, Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import { Helmet } from "react-helmet";
import AddsCarousel from "../components/AddsCarousel";
import RelatedArticle from "../components/RelatedArticle";
import "./PostPage.css";
import TOC from "../components/Toc";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const [modifiedContent, setModifiedContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-7xl mx-auto min-h-screen post-custom">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={`http://localhost:5173/post/${postSlug}`} />
      </Helmet>

      <div className="flex flex-col-reverse md:flex-row-reverse">
        <div className="w-[65%] blog-content">
          <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
            {post && post.title}
          </h1>
          <TOC key={post._id} postContent={post.content} setModifiedContent={setModifiedContent} />

          <Link
            to={`/search?category=${post && post.category}`}
            className="self-center mt-5"
          >
            <Button color="gray" pill size="xs">
              {post && post.category}
            </Button>
          </Link>
          <img
            src={post && post.image}
            alt={post && post.title}
            className="mt-10 p-3 max-h-[500px] w-full object-cover"
          />
          <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="italic">
              {post && (post.content.length / 1000).toFixed(0)} mins read
            </span>
          </div>
          <div
            className="p-3 max-w-2xl mx-auto w-full post-content"
            dangerouslySetInnerHTML={{ __html:modifiedContent }}
          ></div>
          <div className="max-w-4xl mx-auto w-full">
            <CallToAction />
          </div>
          <CommentSection postId={post._id} />

          <div className="flex flex-col justify-center items-center mb-5">
            <h1 className="text-xl mt-5">Recent articles</h1>
            <div className="flex flex-wrap gap-5 mt-5 justify-center">
              {recentPosts &&
                recentPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
            </div>
          </div>
        </div>
        <div className=" w-[35%] blog-ads p-3 md:p-1border-b md:border-l md:min-h-screen border-gray-500 md:order-first">
          <div className="sidebar-item recent-posts">
            <h3 className="sidebar-title">Recent Posts</h3>
            <div className="mt-3">
              {recentPosts &&
                recentPosts.map((post) => (
                  <RelatedArticle key={post._id} post={post} />
                ))}
            </div>
          </div>
          <AddsCarousel key={post._id} post={post} />
        </div>
      </div>
    </main>
  );
}
