import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";
import logo from "../images/The Education Press logo - Transparent.png";

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <img
                src={logo}
                alt="education press"
                className="w-[320px] h-full"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/projects"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Our Blog
                </Footer.Link>
                <Footer.Link
                  href="/all-buissness"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  All Buissness
                </Footer.Link>
                <Footer.Link
                  href="/about-us"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  The Educational Press
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="http://www.facebook.com/theeducationpress"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </Footer.Link>
                <Footer.Link href="https://www.instagram.com/theeducationpress">
                  Instagram
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="/contact-us">Contact Us</Footer.Link>
                <Footer.Link href="/privicy-policy">Privacy Policy</Footer.Link>
                <Footer.Link href="/terms-and-condition">
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="The Education Press"
            // by="Bibhu De"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon
              href="http://www.facebook.com/theeducationpress"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="https://www.instagram.com/theeducationpress"
              icon={BsInstagram}
            />
            <Footer.Icon
              href="https://www.youtube.com/@THEEDUCATIONPRESS"
              icon={BsYoutube}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
