import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import VenturexCard from "../components/VenturexCard";
import { Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

export default function AllVentureX() {
  const { currentUser } = useSelector((state) => state.user);
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [startIndex, setStartIndex] = useState(0);

  const location = useLocation();

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        setLoading(true);
        const urlParams = new URLSearchParams(location.search);
        urlParams.set("startIndex", startIndex);
        const res = await fetch(
          `/api/institute/getInstitute?${urlParams.toString()}`
        );
        if (!res.ok) {
          setLoading(false);
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setInstitutes((prevInstitutes) => [
            ...prevInstitutes,
            ...data.institute,
          ]);
          setLoading(false);
          if (data.institute.length === 0) {
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
    fetchInstitutes();
  }, [startIndex]);

  const handleShowMore = async () => {
    setStartIndex((prevIndex) => prevIndex + 9);
  };

  return (
    <div className="min-h-screen max-w-9xl mx-auto flex justify-center items-center flex-col gap-6 p-3">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Best Coaching Institutes All Buissness</title>
        <meta name="description" content="Choose the best Coaching Institute / School / College / Tutor according to the requiremnets" />
        <link rel="canonical" href={`https://www.theeducationpress.com/all-buissness`} />
      </Helmet>
      <h1 className="text-3xl font-semibold">All Institute | Buissness</h1>
      <div className="w-full ">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 ">
          Buissness Listings:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && institutes.length === 0 && (
            <p className="text-xl text-gray-500">
              No Institute/Buissness found.
            </p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading &&
            institutes &&
            institutes.map((institute) => (
              <VenturexCard key={institute.name} institute={institute} />
            ))}
        </div>
        <div className="flex justify-center">
          {showMore && (
            <Button
              onClick={handleShowMore}
              className="text-lg p-1 "
              gradientMonochrome="cyan"
            >
              Show More
            </Button>
          )}
        </div>
        <div className="flex justify-center mt-2">
          {currentUser && (
            <Link to={"/list-business"}>
              <Button
                type="button"
                gradientDuoTone="purpleToPink"
                className="w-full"
              >
                List Your Business
              </Button>
            </Link>
          )}
        </div>
      </div>
      <CallToAction />
    </div>
  );
}
