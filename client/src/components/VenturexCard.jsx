import { Link } from "react-router-dom";

export default function VenturexCard({ institute }) {
  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-[335px] overflow-hidden rounded-lg sm:w-[430px] transition-all">
      <div className="p-3 flex flex-col gap-2 ">
        <Link to={`/institute/${institute.slug}`}>
          <p className="text-lg font-semibold line-clamp-2">{institute.name}</p>
        </Link>
        <p className="text-lg font-semibold line-clamp-2">
          Modes : {institute.mode}
        </p>
        <p className="text-lg font-semibold line-clamp-2">
          Director : {institute.owner}
        </p>
        <p className="text-lg font-semibold line-clamp-2">
          Established At : {institute.establishment}
        </p>
        <p className="text-lg font-semibold line-clamp-2">
          Reguler Fees : {institute.fees}
        </p>
        <p className="text-lg font-semibold line-clamp-2">
          Email : {institute.email}
        </p>
        <p className="text-lg font-semibold line-clamp-2">
          Contact Number : {institute.contact}
        </p>
        <span className="italic text-sm">{institute.category}</span>
      </div>
      <Link
        to={`/institute/${institute.slug}`}
        className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
      >
        Read article
      </Link>
    </div>
  );
}
