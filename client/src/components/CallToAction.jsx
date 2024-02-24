import { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import img1 from "../images/INDIA_S-NO-1-EDUCATIONAL-NEWSPAPER_20240217_143216_0000 (1).webp";

export default function CallToAction() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setLoaded(true);
    };
    image.src = img1;
  }, []);
  return (
    <div
      className={`flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center ${
        loaded ? "" : "hidden"
      }`}
    >
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">India's No 1 Educational Newspaper</h2>
        <p className="text-gray-500 my-2">Know All Latest Educational News</p>
        <Button
          gradientDuoTone="tealToLime"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a href="" target="_blank" rel="noopener noreferrer">
            Schools | Colleges | Coaching Institutes | Trainers | Tutors
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src={img1}
          alt="INDIA'S NO 1 EDUCATIONAL NEWSPAPER"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
