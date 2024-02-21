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
import { useEffect, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdateVentureX() {
  const [formData, setFormData] = useState({
    courses: [],
    teachers: [],
    hours: [],
  });
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  const [inputCourse, setInputCourse] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [inputTeacher, setInputTeacher] = useState("");
  const [teacherIndex, setTeacherIndex] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

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
    setInputCourse(e.target.value);
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (inputCourse.trim() !== "") {
      if (editIndex !== null) {
        const updatedCourses = [...formData.courses];
        updatedCourses[editIndex] = inputCourse.trim();
        setFormData((prevFormData) => ({
          ...prevFormData,
          courses: updatedCourses,
        }));
        setEditIndex(null);
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          courses: [...prevFormData.courses, inputCourse.trim()],
        }));
      }
      setInputCourse("");
    }
  };

  const handleEditCourse = (index) => {
    setEditIndex(index);
    setInputCourse(formData.courses[index]);
  };

  const handleTeacherChange = (e) => {
    e.preventDefault();
    setInputTeacher(e.target.value);
  };

  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    if (inputTeacher.trim() !== "") {
      if (teacherIndex !== null) {
        const updatedTeachers = [...formData.teachers];
        updatedTeachers[teacherIndex] = inputTeacher.trim();
        setFormData((prevFormData) => ({
          ...prevFormData,
          teachers: updatedTeachers,
        }));
        setTeacherIndex(null);
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          teachers: [...prevFormData.teachers, inputTeacher.trim()],
        }));
      }
      setInputTeacher("");
    }
  };

  const handleEditTeacher = (index) => {
    setTeacherIndex(index);
    setInputTeacher(formData.teachers[index]);
  };

  useEffect(() => {
    try {
      const fetchInstitute = async () => {
        const res = await fetch(`/api/institute/getInstitute?instituteId=${postId}`);

        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.institute[0]);
        }
      };

      fetchInstitute();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/institute/updateinstitute/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
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
      <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Name of Institution"
            required
            id="name"
            className="flex-1"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
          />
        </div>
        <Select
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          value={formData.category}
        >
          <option value="uncategorized">Select Type of Institution</option>
          <option value="School">School</option>
          <option value="College">College</option>
          <option value="Coaching Institute">Coaching Institute</option>
          <option value="Others">Others</option>
        </Select>
        <TextInput
          type="text"
          placeholder="Name of Owner | Director | Principal "
          required
          id="owner"
          className="flex-1"
          onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
          value={formData.owner}
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
          value={formData.establishment}
        />
        <Textarea
          type="text"
          placeholder="About Us"
          required
          id="about"
          className="flex-1"
          onChange={(e) => setFormData({ ...formData, about: e.target.value })}
          value={formData.about}
        />
        <div className="gap-4 items-center justify-between  p-3">
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <TextInput
              type="text"
              id="inputcourse"
              className="flex-1"
              value={inputCourse}
              onChange={handleCourseChange}
              placeholder="Enter course"
            />
            <Button onClick={handleAddCourse} gradientMonochrome="success">
              {editIndex !== null ? "Update" : "Add"}
            </Button>
          </div>
          <div className="flex gap-2 mt-2 items-center justify-between border-2 border-green-300 border-spacing-1 p-3">
            <ul className="w-[100%]">
              {formData.courses.map((course, index) => (
                <li
                  key={index}
                  className="flex gap-4 items-center justify-between p-2"
                  dir="ltr"
                >
                  <p className="me-8">{course}</p>
                  <Button
                    gradientMonochrome="teal"
                    className="ms-8 px-2"
                    onClick={() => handleEditCourse(index)}
                  >
                    Edit
                  </Button>
                </li>
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
          value={formData.fees}
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
            <Button onClick={handleTeacherSubmit} gradientMonochrome="success">
              {teacherIndex !== null ? "Update" : "Add"}
            </Button>
          </div>
          <div className="flex gap-2 mt-2 items-center justify-between border-2 border-green-300 border-spacing-1 p-3">
            <ul className="w-[100%]">
              {formData.teachers.map((teacher, index) => (
                <li
                  key={index}
                  className="flex gap-4 items-center justify-between p-2"
                  dir="ltr"
                >
                  <p className="me-8">{teacher}</p>
                  <Button
                    gradientMonochrome="teal"
                    className="ms-8 px-2"
                    onClick={() => handleEditTeacher(index)}
                  >
                    Edit
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          {DaysOfWeek.map((day) => (
            <HoursSelector
              key={day}
              day={day}
              handleOpenChange={handleOpenChange}
              handleCloseChange={handleCloseChange}
              hours={formData.hours}
            />
          ))}
          <hr />
          <h2>Hours of Operation</h2>
          <ul>
            {formData.hours.map(({ day, open, close }) => (
              <li
                key={day}
                className="flex gap-4 items-center justify-between p-2"
                dir="ltr"
              >
                <p className="me-8 px-2">{day}</p>{" "}
                <p className="ms-8 px-2">
                  {open}Am-{close}pm
                </p>
              </li>
            ))}
          </ul>
        </div>
        <Select
          onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
          value={formData.mode}
        >
          <option value="nomode">Mode of Classes</option>
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
          value={formData.results}
        />
        <TextInput
          type="text"
          placeholder="Email id"
          required
          id="email"
          value={formData.email}
          className="flex-1"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextInput
          type="text"
          placeholder="Contact number"
          required
          id="contact"
          className="flex-1"
          value={formData.contact}
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
          value={formData.website}
          onChange={(e) =>
            setFormData({ ...formData, website: e.target.value })
          }
        />
        <TextInput
          type="text"
          placeholder="Facebook link"
          id="facebook"
          className="flex-1"
          value={formData.facebook}
          onChange={(e) =>
            setFormData({ ...formData, facebook: e.target.value })
          }
        />
        <TextInput
          type="text"
          placeholder="Youtube Link"
          id="youtube"
          className="flex-1"
          value={formData.youtube}
          onChange={(e) =>
            setFormData({ ...formData, youtube: e.target.value })
          }
        />
        <TextInput
          type="text"
          placeholder="Instagram Link"
          id="instagram"
          className="flex-1"
          value={formData.instagram}
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
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />

        <Button type="submit" gradientDuoTone="purpleToPink">
          Update post
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

const HoursSelector = ({ day, handleOpenChange, handleCloseChange, hours }) => {
  const hour = hours.find((h) => h.day === day);
  const openTime = hour ? hour.open : "";
  const closeTime = hour ? hour.close : "";

  return (
    <div className="flex gap-4 items-center justify-between">
      <label className="flex-1">{day}</label>
      <TextInput
        className="flex-1"
        type="time"
        value={openTime}
        onChange={(e) => handleOpenChange(day, e.target.value)}
      />
      <TextInput
        className="flex-1"
        type="time"
        value={closeTime}
        onChange={(e) => handleCloseChange(day, e.target.value)}
      />
    </div>
  );
};
