import React from "react";
import EnquiryForm from "../components/EnquiryForm";

export default function ContactUs() {
  return (
    <div>
      <h1 className="text-xl font-bold lg:text-2xl text-center">For Connecting with The Education Press mail at :- 
        <a className="text-lg font-bold lg:text-xl" href="mailto:theeducationpressofficial@gmail.com">
          theeducationpressofficial@gmail.com
        </a>
      </h1>
      <EnquiryForm />
    </div>
  );
}
