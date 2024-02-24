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
  deleteObject,
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

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [file1, setFile1] = useState(null);
  const [imageUploadProgress1, setImageUploadProgress1] = useState(null);
  const [imageUploadError1, setImageUploadError1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [imageUploadProgress2, setImageUploadProgress2] = useState(null);
  const [imageUploadError2, setImageUploadError2] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();

  const editor2 = useRef(null);
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);

        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleUpdloadImage1 = async () => {
    try {
      if (!file1) {
        setImageUploadError1("Please select an image");
        return;
      }
      setImageUploadError1(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file1.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file1);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress1(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError1("Image upload failed");
          setImageUploadProgress1(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress1(null);
            setImageUploadError1(null);
            setFormData({ ...formData, adsimage1: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError1("Image upload failed");
      setImageUploadProgress1(null);
      console.log(error);
    }
  };
  const handleUpdloadImage2 = async () => {
    try {
      if (!file2) {
        setImageUploadError2("Please select an image");
        return;
      }
      setImageUploadError2(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file2.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file2);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress2(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError2("Image upload failed");
          setImageUploadProgress2(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress2(null);
            setImageUploadError2(null);
            setFormData({ ...formData, adsimage2: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError2("Image upload failed");
      setImageUploadProgress2(null);
      console.log(error);
    }
  };

  const deleteImage = async (key) => {
      setFormData({ ...formData, [key]: "" });
      setImageUploadProgress(null);
      setImageUploadError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${postId}`, {
        method: "PUT",
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
        navigate(`/post/${data.slug}`);
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
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="ENTRANCE EXAMS">ENTRANCE EXAMS</option>
            <option value="GOVERNMENT EXAMS">GOVERNMENT EXAMS</option>
            <option value="JOB TRAINING">JOB TRAINING</option>
            <option value="SCHOOL">SCHOOL</option>
            <option value="COLLEGE">COLLEGE </option>
            <option value="COACHING INSTITUTE">COACHING INSTITUTE</option>
            <option value="TUTOR">TUTOR</option>
            <option value="LANGUAGE TRAINING">LANGUAGE TRAINING</option>
            <option value="SCHOOL TUTIONS">SCHOOL TUTIONS</option>
            <option value="PLAY SCHOOL">PLAY SCHOOL</option>
            <option value="ACCOUNTS & FINANCE TRAINING">
              ACCOUNTS & FINANCE TRAINING
            </option>
            <option value="OVERSEAS EDUCATION">OVERSEAS EDUCATION</option>
            <option value="BLOGS">BLOGS</option>
            <option value="Others">Others</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile1(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUpdloadImage1}
            disabled={imageUploadProgress1}
          >
            {imageUploadProgress1 ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress1}
                  text={`${imageUploadProgress1 || 0}%`}
                />
              </div>
            ) : (
              "Upload AdsImage1"
            )}
          </Button>
        </div>
        {imageUploadError1 && (
          <Alert color="failure">{imageUploadError1}</Alert>
        )}
        {formData.adsimage1 && (
          <img
            src={formData.adsimage1}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile2(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUpdloadImage2}
            disabled={imageUploadProgress2}
          >
            {imageUploadProgress2 ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress2}
                  text={`${imageUploadProgress2 || 0}%`}
                />
              </div>
            ) : (
              "Upload AdsImage2"
            )}
          </Button>
        </div>
        {imageUploadError2 && (
          <Alert color="failure">{imageUploadError2}</Alert>
        )}
        {formData.adsimage2 && (
          <img
            src={formData.adsimage2}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        {formData.image && (
          <div className="flex items-center">
            <img
              src={formData.image}
              alt="Uploaded"
              className="w-32 h-32 mr-4"
            />
            <Button onClick={() => deleteImage("image")}>Delete Image</Button>
          </div>
        )}
        {formData.adsimage1 && (
          <div className="flex items-center">
            <img
              src={formData.adsimage1}
              alt="Uploaded"
              className="w-32 h-32 mr-4"
            />
            <Button onClick={() => deleteImage("adsimage1")}>
              Delete Image
            </Button>
          </div>
        )}
        {formData.adsimage2 && (
          <div className="flex items-center">
            <img
              src={formData.adsimage2}
              alt="Uploaded"
              className="w-32 h-32 mr-4"
            />
            <Button onClick={() => deleteImage("adsimage2")}>
              Delete Image
            </Button>
          </div>
        )}

        <TextInput
          type="text"
          placeholder="AdsLink"
          value={formData.adslink}
          id="adslink"
          className="flex-1"
          onChange={(e) =>
            setFormData({ ...formData, adslink: e.target.value })
          }
        />
        <JoditEditor
          ref={editor2}
          value={formData.content}
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <TextInput
          type="text"
          placeholder="PermaLink"
          required
          id="slug"
          className="flex-1"
          maxLength={150}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          value={formData.slug}
        />
        <Textarea
          type="textarea"
          placeholder="Description"
          required
          id="description"
          className="flex-1"
          maxLength={150}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          value={formData.description}
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
