import { Button, Spinner, Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import VenturexCard from "../components/VenturexCard";
import { Helmet } from "react-helmet";
import AddsCarousel from "../components/AddsCarousel";
import RelatedArticle from "../components/RelatedArticle";
import "./PostPage.css";
import TOC from "../components/Toc";

export default function InstitutePage() {
  const { instituteSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [institute, setInstitute] = useState({});
  const [recentInstitutes, setRecentInstitutes] = useState(null);
  const [modifiedContent, setModifiedContent] = useState("");

  useEffect(() => {
    const fetchInstitute = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/institute/getinstitute?slug=${instituteSlug}`);
        const data = await res.json();
        console.log(data.institute[0])
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setInstitute(data.institute[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchInstitute();
  }, [instituteSlug]);

  useEffect(() => {
    try {
      const fetchRecentInstitutes = async () => {
        const res = await fetch(`/api/institute/getinstitute?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentInstitutes(data.institute);
        }
      };
      fetchRecentInstitutes();
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
    console.log(institute)
  return (
    <main className="p-3 flex flex-col max-w-7xl mx-auto min-h-screen post-custom">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{institute.name}</title>
        <meta name="description" content={institute.about} />
        <link rel="canonical" href={`http://localhost:5173/institute/${instituteSlug}`} />
      </Helmet>

      <div className="flex flex-col-reverse md:flex-row-reverse">
        <div className="w-[65%] blog-content">
          <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
            {institute && institute.name}
          </h1>
          {/* <TOC key={institute._id} instituteContent={institute.content} setModifiedContent={setModifiedContent} /> */}

          <Link
            to={`/search?category=${institute && institute.category}`}
            className="self-center mt-5"
          >
            <Button color="gray" pill size="xs">
              {institute && institute.category}
            </Button>
          </Link>
          <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
            <span>{institute && new Date(institute.createdAt).toLocaleDateString()}</span>
            <span className="italic">
              {institute && (institute.about.length / 1000).toFixed(0)} mins read
            </span>
          </div>
          <div
            className="p-3 max-w-2xl mx-auto w-full post-content"
            dangerouslySetInnerHTML={{ __html:modifiedContent }}
          ></div>
          <div className="max-w-4xl mx-auto w-full">
            <CallToAction />
          </div>
          <CommentSection instituteId={institute._id} />

          <div className="flex flex-col justify-center items-center mb-5">
            <h1 className="text-xl mt-5">Recent articles</h1>
            <div className="flex flex-wrap gap-5 mt-5 justify-center">
              {recentInstitutes &&
                recentInstitutes.map((institute) => (
                  <VenturexCard key={institute._id} institute={institute} />
                ))}
            </div>
          </div>
        </div>
        {/* <div className=" w-[35%] blog-ads p-3 md:p-1 border-b md:border-l md:min-h-screen border-gray-500 md:order-first">
          <div className="sidebar-item recent-posts">
            <h3 className="sidebar-title">Recent institutes</h3>
            <div className="mt-3">
              {recentInstitutes &&
                recentInstitutes.map((institute) => (
                  <RelatedArticle key={institute._id} Institute={institute} />
                ))}
            </div>
          </div>
        </div> */}
      </div>
    </main>
  );
}
