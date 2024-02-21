import { Button, Spinner, Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import VenturexCard from "../components/VenturexCard";
import { Helmet } from "react-helmet";
import "./PostPage.css";

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
        const res = await fetch(
          `/api/institute/getInstitute?slug=${instituteSlug}`
        );
        const data = await res.json();
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
        const res = await fetch(`/api/institute/getInstitute?limit=3`);
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
  return (
    <main className="p-3 flex flex-col max-w-7xl mx-auto min-h-screen post-custom">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{institute.name}</title>
        <meta name="description" content={institute.about} />
        <link
          rel="canonical"
          href={`https://www.theeducationpress.com/institute/${instituteSlug}`}
        />
      </Helmet>

      <div className="flex justify-center">
        <div className="w-[100%]">
          <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
            {institute && institute.name}
          </h1>

          <Link
            to={`/search?category=${institute && institute.category}`}
            className="flex justify-center mt-5"
          >
            <Button color="gray" pill size="xs">
              {institute && institute.category}
            </Button>
          </Link>
          <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
            <span>
              {institute && new Date(institute.createdAt).toLocaleDateString()}
            </span>
            <span className="italic">
              {institute && (institute.about.length / 10).toFixed(0)} mins
              read
            </span>
          </div>
          <div className="p-3 max-w-2xl mx-auto w-full post-content">
            <p>{institute && institute.about}</p>
            <p>{institute && institute.establishment}</p>
            <h2>Courses Offered:</h2>
            <p>Fees: {institute && institute.fees}</p>
            <ul>
              {institute && institute.courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
            <h2>Teachers:</h2>
            <ul>
              {institute && institute.teachers.map((teacher, index) => (
                <li key={index}>{teacher}</li>
              ))}
            </ul>
            <h2>Operating Hours:</h2>
            <ul>
              {institute && institute.hours.map((hour, index) => (
                <li key={index}>{hour.day}: {hour.open} - {hour.close}</li>
              ))}
            </ul>
            <h2>Results:</h2>
            <p>{institute && institute.results}</p>
            <h2>Contact Information:</h2>
            <p>Email: {institute && institute.email}</p>
            <p>Contact: {institute && institute.contact}</p>
            <p>Website: {institute && institute.website}</p>
            <p>Facebook: {institute && institute.facebook}</p>
            <p>Youtube: {institute && institute.youtube}</p>
            <p>Instagram: {institute && institute.instagram}</p>
            <h2>Address:</h2>
            <p>{institute && institute.address}</p>
          </div>
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
      </div>
    </main>
  );
}
