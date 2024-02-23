import Venture from "../models/institute.model.js";
import { errorHandler } from "../utils/error.js";

export const createInstitute = async (req, res, next) => {
  if (!req.body.name || !req.body.about) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const slug = req.body.name
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newInstitute = new Venture({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedInstitute = await newInstitute.save();
    res.status(201).json(savedInstitute);
  } catch (error) {
    next(error);
  }
};

export const getInstitute = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const institute = await Venture.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { name: { $regex: req.query.searchTerm, $options: "i" } },
          { about: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalInstitute = await Venture.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthInstitute = await Venture.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      institute,
      totalInstitute,
      lastMonthInstitute,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteInstitute = async (req, res, next) => {
  try {
    await Venture.findByIdAndDelete(req.params.postId);
    res.status(200).json("The post has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateInstitute = async (req, res, next) => {
  try {
    const updatedInstitute = await Venture.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          name: req.body.name,
          slug: req.body.slug,
          about: req.body.about,
          category: req.body.category,
          owner: req.body.owner,
          establishment: req.body.establishment,
          courses: req.body.courses,
          fees: req.body.fees,
          teachers: req.body.teachers,
          hours: req.body.hours,
          mode: req.body.mode,
          results: req.body.results,
          email: req.body.email,
          contact: req.body.contact,
          website: req.body.website,
          facebook: req.body.facebook,
          youtube: req.body.youtube,
          instagram: req.body.instagram,
          address: req.body.address,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedInstitute);
  } catch (error) {
    next(error);
  }
};
