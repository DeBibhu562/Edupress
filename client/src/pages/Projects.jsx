import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import CallToAction from "../components/CallToAction";
import { Helmet } from "react-helmet";

export default function Projects() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [startIndex, setStartIndex] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const urlParams = new URLSearchParams(location.search);
        urlParams.set("startIndex", startIndex);
        const res = await fetch(`/api/post/getposts?${urlParams.toString()}`);
        if (!res.ok) {
          setLoading(false);
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setPosts((prevPosts) => [...prevPosts, ...data.posts]);
          setLoading(false);
          if (data.posts.length < 6) {
            setShowMore(false);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchPosts();
  }, [startIndex]);

  const handleShowMore = async () => {
    setStartIndex((prevIndex) => prevIndex + 6);
  };

  return (
    <div className="min-h-screen max-w-9xl mx-auto flex justify-center items-center flex-col gap-6 p-3">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Best Coaching Institutes (Get Enrolled In Best Classes)</title>
        <meta name="description" content="Choose the best Coaching Institute / School / College / Tutor according to the requiremnets" />
        <link rel="canonical" href={`https://www.theeducationpress.com/blogs`} />
      </Helmet>
      <h1 className="text-3xl font-semibold">Blogs | Services</h1>
      <div className="w-full ">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 ">
          Posts results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4" data-aos="fade" data-aos-delay="100">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
      <CallToAction />
    </div>
  );
}
