import React from "react";
import {
  Alert,
  Button,
  FileInput,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import JoditEditor from "jodit-react";
import "./CreatePost.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

export default function CreatVentureX() {
  const [formData, setFormData] = useState({
    courses: [],
    teachers: [],
    hours: [],
  });
  const [inputcourse, setCourseValue] = useState("");
  const [inputTeacher, setInputTeacher] = useState("");
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  const handleOpenChange = (day, time) => {
    const updatedHours = [...formData.hours];
    const index = updatedHours.findIndex((hour) => hour.day === day);
    if (index !== -1) {
      updatedHours[index].open = time;
    } else {
      updatedHours.push({ day, open: time, close: "" });
    }
    setFormData((prevData) => ({
      ...prevData,
      hours: updatedHours,
    }));
  };

  const handleCloseChange = (day, time) => {
    const updatedHours = [...formData.hours];
    const index = updatedHours.findIndex((hour) => hour.day === day);
    if (index !== -1) {
      updatedHours[index].close = time;
    } else {
      updatedHours.push({ day, open: "", close: time });
    }
    setFormData((prevData) => ({
      ...prevData,
      hours: updatedHours,
    }));
  };

  const handleCourseChange = (e) => {
    e.preventDefault();
    setCourseValue(e.target.value);
  };
  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (inputcourse.trim() !== "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        courses: [...prevFormData.courses, inputcourse.trim()],
      }));
      setCourseValue("");
    }
  };

  const handleTeacherChange = (e) => {
    e.preventDefault();
    setInputTeacher(e.target.value);
  };

  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    if (inputTeacher.trim() !== "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        teachers: [...prevFormData.teachers, inputTeacher.trim()],
      }));
      setInputTeacher("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await fetch("/api/institute/createInstitute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/institute/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        List Your Business
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Name of Institution"
            required
            id="name"
            className="flex-1"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select Type of Institution</option>
            <option value="School">School</option>
            <option value="College">College</option>
            <option value="Coaching Institute">Coaching Institute</option>
            <option value="Others">Others</option>
          </Select>
        </div>
        <TextInput
          type="text"
          placeholder="Name of Owner | Director | Principal "
          required
          id="owner"
          className="flex-1"
          onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
        />
        <TextInput
          type="text"
          placeholder="Year of Establishment"
          required
          id="establishment"
          className="flex-1"
          onChange={(e) =>
            setFormData({ ...formData, establishment: e.target.value })
          }
        />
        <Textarea
          type="text"
          placeholder="About Us"
          required
          id="about"
          className="flex-1"
          onChange={(e) =>
            setFormData({ ...formData, about: e.target.value })
          }
        />
        <div className="gap-4 items-center justify-between  p-3">
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <TextInput
              type="text"
              id="inputcourse"
              className="flex-1"
              value={inputcourse}
              onChange={handleCourseChange}
              placeholder="Enter course"
            />
            <button onClick={handleAddCourse}>Add</button>
          </div>
          <div className="flex gap-2 mt-2 items-center justify-between border-2 border-green-300 border-spacing-1 p-3">
            <ul>
              {formData.courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>
        </div>
        <TextInput
          type="text"
          placeholder="Fees"
          required
          id="fees"
          className="flex-1"
          onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
        />
        <div className="gap-4 items-center justify-between  p-3">
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <TextInput
              type="text"
              id="teacherList"
              className="flex-1"
              value={inputTeacher}
              onChange={handleTeacherChange}
              placeholder="Enter teacher's name"
            />
            <button onClick={handleTeacherSubmit}>Add</button>
          </div>
          <div className="flex gap-2 mt-2 items-center justify-between border-2 border-green-300 border-spacing-1 p-3">
            <ul>
              {formData.teachers.map((teacher, index) => (
                <li key={index}>{teacher}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          {DaysOfWeek.map((day) => (
            <HoursSelector
              key={day}
              day={day}
              handleOpenChange={(e) => handleOpenChange(day, e.target.value)}
              handleCloseChange={(e) => handleCloseChange(day, e.target.value)}
            />
          ))}
          <hr />
          <h2>Hours of Operation</h2>
          <ul>
            {formData.hours.map(({ day, open, close }) => (
              <li key={day}>
                {day} {open}Am-{close}pm
              </li>
            ))}
          </ul>
        </div>
        <Select
          onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
        >
          <option value="uncategorized">Mode of Classes</option>
          <option value="Online">Online </option>
          <option value="Offline">Offline </option>
          <option value="Hybrid">Hybrid </option>
          <option value="All ">All </option>
        </Select>
        <TextInput
          type="text"
          placeholder="Past Results"
          required
          id="results"
          className="flex-1"
          onChange={(e) =>
            setFormData({ ...formData, results: e.target.value })
          }
        />
        <TextInput
          type="text"
          placeholder="Email id"
          required
          id="email"
          className="flex-1"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextInput
          type="text"
          placeholder="Contact number"
          required
          id="contact"
          className="flex-1"
          onChange={(e) =>
            setFormData({ ...formData, contact: e.target.value })
          }
        />
        <TextInput
          type="text"
          placeholder="Website "
          required
          id="website"
          className="flex-1"
          onChange={(e) =>
            setFormData({ ...formData, website: e.target.value })
          }
        />
        <TextInput
          type="text"
          placeholder="Facebook link"
          id="facebook"
          className="flex-1"
          onChange={(e) =>
            setFormData({ ...formData, facebook: e.target.value })
          }
        />
        <TextInput
          type="text"
          placeholder="Youtube Link"
          id="youtube"
          className="flex-1"
          onChange={(e) =>
            setFormData({ ...formData, youtube: e.target.value })
          }
        />
        <TextInput
          type="text"
          placeholder="Instagram Link"
          id="instagram"
          className="flex-1"
          onChange={(e) =>
            setFormData({ ...formData, instagram: e.target.value })
          }
        />
        <Textarea
          type="text"
          placeholder="Address"
          required
          id="address"
          className="flex-1"
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}

const DaysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const HoursSelector = ({ day, handleOpenChange, handleCloseChange }) => {
  return (
    <div className="flex gap-4 items-center justify-between">
      <label className="flex-1">{day}</label>
      <TextInput className="flex-1" type="time" onChange={handleOpenChange} />
      <TextInput className="flex-1" type="time" onChange={handleCloseChange} />
    </div>
  );
};
