import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  emailStart,
  emailSuccess,
  emailFailure,
  otpStart,
  otpSuccess,
  otpFailure,
} from "../redux/user/resetPasswordSlice";

export default function ResetEmailInp() {
  const otp = useSelector((state) => state.resetpass.otp);
  const email = useSelector((state) => state.resetpass.email);
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);

  const handleChange = (e) => {
    dispatch(emailStart());
    dispatch(emailSuccess(e.target.value));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const OTP = Math.floor(Math.random() * 9000 + 1000);
    dispatch(otpStart());

    if (!email) {
      return dispatch(emailFailure("Email not found Try Again"));
    }
    try {
      dispatch(emailStart());
      dispatch(otpSuccess(OTP));
      const res = await fetch("/api/auth/resetpass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email:email, Otp:OTP}),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(emailFailure(data.message));
      }
    } catch (error) {
      dispatch(emailFailure(error.message));
    }
  };

  const resendOTP = async (e) => {
    e.preventDefault();
    if (disable) return;
    const OTP = Math.floor(Math.random() * 9000 + 1000);
    dispatch(otpStart());
    try {
      dispatch(emailStart());
      dispatch(otpSuccess(OTP));
      const res = await fetch("/api/auth/resetpass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, Otp: OTP }),
      });
      const data = await res.json();
      setDisable(true);
      alert("A new OTP has successfully been sent to your email.");
      setTimer(60);
      if (data.success === false) {
        dispatch(emailFailure("put correct email"));
      }
      if (res.ok) {
        dispatch(setOtp(OTP));
      }
    } catch (error) {
    }
  };

  function verfiyOTP() {
    dispatch(otpStart());
    if (parseInt(OTPinput.join("")) === otp) {
      navigate("/set-new-pass");
      return;
    }
    dispatch(otpFailure("Error The code you have entered is not correct"));
    return;
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              The Education Press
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Enter your Existing Email for getting OTP.
          </p>
        </div>
        {/* right */}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              onClick={handleSubmit}
            >
              Sent Otp
            </Button>
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              <div className="w-16 h-16 ">
                <input
                  maxLength="1"
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                  name=""
                  id=""
                  onChange={(e) =>
                    setOTPinput([
                      e.target.value,
                      OTPinput[1],
                      OTPinput[2],
                      OTPinput[3],
                    ])
                  }
                ></input>
              </div>
              <div className="w-16 h-16 ">
                <input
                  maxLength="1"
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                  name=""
                  id=""
                  onChange={(e) =>
                    setOTPinput([
                      OTPinput[0],
                      e.target.value,
                      OTPinput[2],
                      OTPinput[3],
                    ])
                  }
                ></input>
              </div>
              <div className="w-16 h-16 ">
                <input
                  maxLength="1"
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                  name=""
                  id=""
                  onChange={(e) =>
                    setOTPinput([
                      OTPinput[0],
                      OTPinput[1],
                      e.target.value,
                      OTPinput[3],
                    ])
                  }
                ></input>
              </div>
              <div className="w-16 h-16 ">
                <input
                  maxLength="1"
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                  name=""
                  id=""
                  onChange={(e) =>
                    setOTPinput([
                      OTPinput[0],
                      OTPinput[1],
                      OTPinput[2],
                      e.target.value,
                    ])
                  }
                ></input>
              </div>
            </div>

            <div className="flex flex-col space-y-5">
              <div>
                <a
                  onClick={() => verfiyOTP()}
                  className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                >
                  Verify Account
                </a>
              </div>

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't recieve code?</p>{" "}
                <a
                  className="flex flex-row items-center"
                  style={{
                    color: disable ? "gray" : "blue",
                    cursor: disable ? "none" : "pointer",
                    textDecorationLine: disable ? "none" : "underline",
                  }}
                  onClick={resendOTP}
                >
                  {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                </a>
              </div>
            </div>
          </form>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
