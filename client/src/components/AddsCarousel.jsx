import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";

export default function AddsCarousel({ post }) {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      {post.adsimage1 !== "" ||
        (post.adsimage2 !== "" && (
          <Link to={post.adslink}>
            <Carousel slide={true}>
              <img src={post.adsimage1} alt="adsimg1" />
              <img src={post.adsimage2} alt="adsimg2" />
            </Carousel>
          </Link>
        ))}
    </div>
  );
}
