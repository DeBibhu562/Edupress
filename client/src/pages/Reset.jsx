import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  emailFailure,
  passwordStart,
  passwordSuccess,
  passwordFailure,
} from "../redux/user/resetPasswordSlice";
import { useNavigate } from "react-router-dom";

export default function Reset() {
  const email = useSelector((state) => state.resetpass.email);
  const password = useSelector((state) => state.resetpass.password);

  const [verified, setVerified] = useState(false);
  const [npass, setNpass] = useState("");
  const [cpass, setCpass] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNPass = (e) => {
    setNpass(e.target.value);
  };
  const handleCPass = (e) => {
    setCpass(e.target.value);
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (!email) {
      return dispatch(emailFailure("Email not found Try Again"));
    }
    try {
      dispatch(passwordStart());
      if (!verified) {
        console.log("passwords not match");
      } else {
        const res = await fetch("/api/auth/setnewpass", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: npass }),
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(passwordFailure("Enter same password for both the field"));
        } else {
          navigate("/sign-in");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  function verfiyPass() {
    if (cpass === npass) {
      dispatch(passwordSuccess(npass));
      setVerified(true);
      return;
    }
    return dispatch(passwordFailure("Both the password not matched"));
  }

  return (
    <div>
      <section className="bg-gray-50 w-screen dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={handleNPass}
                ></input>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={handleCPass}
                ></input>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  ></input>
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="newsletter"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
            </form>
            <button
              type="submit"
              onClick={() => verfiyPass()}
              className="w-full mb-2 mt-2 text-white bg-sky-600  hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Verify passwords
            </button>
            <button
              type="submit"
              onClick={changePassword}
              className="w-full text-white bg-sky-600  hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset password
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
