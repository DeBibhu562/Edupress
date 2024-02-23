import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png",
    },
    adsimage1: {
      type: String,
      default:
        "https://www.theeducationpress.com/assets/INDIA'S%20NO%201%20EDUCATIONAL%20NEWSPAPER_20240217_143216_0000-Lxyk_ILz.png",
    },
    adsimage2: {
      type: String,
      default:
        "https://www.theeducationpress.com/assets/INDIA'S%20NO%201%20EDUCATIONAL%20NEWSPAPER_20240217_143216_0000-Lxyk_ILz.png",
    },
    adslink: {
      type: String,
      default:
        "https://www.theeducationpress.com/",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
