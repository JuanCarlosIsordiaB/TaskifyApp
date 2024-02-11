import Project from "../models/Project.js";
import User from "../models/User.js";

const getProjects = async (req, res) => {
  const projects = await Project.find()
    .where("creator")
    .equals(req.user)
    .select("-tasks");

  res.json(projects);
};

const newProject = async (req, res) => {
  const project = new Project(req.body);
  project.creator = req.user._id;

  try {
    const projectStored = await project.save();
    res.json(projectStored);
  } catch (error) {
    console.log(error);
  }
};

const getProject = async (req, res) => {
  const { id } = req.params;

  if (id.length === 24) {
    const project = await Project.findById(id)
      .populate("tasks")
      .populate("collaborators", 'name email');
    if (!project) {
      const error = new Error("Not Found");
      return res.status(404).json({ msg: error.message });
    }

    if (project.creator.toString() !== req.user._id.toString()) {
      const error = new Error("Error! Invalid Action");
      return res.status(404).json({ msg: error.message });
    }

    res.json(project);
  } else {
    return res.status(404).json({ msg: "Not Found" });
  }
};

const editProject = async (req, res) => {
  const { id } = req.params;
  const { name, client, description, deliverDate } = req.body;

  if (id.length === 24) {
    const project = await Project.findById(id);
    if (!project) {
      const error = new Error("Not Found");
      return res.status(404).json({ msg: error.message });
    }

    if (project.creator.toString() !== req.user._id.toString()) {
      const error = new Error("Error! Invalid Action");
      return res.status(404).json({ msg: error.message });
    }
    project.name = name || project.name;
    project.client = client || project.client;
    project.description = description || project.description;
    project.deliverDate = deliverDate || project.deliverDate;

    try {
      const projectStored = await project.save();
      res.json(projectStored);
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(404).json({ msg: "Not Found" });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (id.length === 24) {
    const project = await Project.findById(id);
    if (!project) {
      const error = new Error("Not Found");
      return res.status(404).json({ msg: error.message });
    }

    if (project.creator.toString() !== req.user._id.toString()) {
      const error = new Error("Error! Invalid Action");
      return res.status(404).json({ msg: error.message });
    }

    try {
      await project.deleteOne();
      res.json({ msg: "Project Deleted" });
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(404).json({ msg: "Not Found" });
  }
};

const findCollaborator = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email }).select(
    "-confirmed -createdAt -password -token -updatedAt -__v"
  );

  if (!user) {
    const error = new Error("User not found");
    return res.status(404).json({ msg: error.message });
  }

  res.json(user);
};

const addCollaborator = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    const error = new Error("ERROR - Project not found");
    return res.status(404).json({ msg: error.message });
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("ERROR - Invalid Action :(");
    return res.status(404).json({ msg: error.message });
  }

  const { email } = req.body;
  const user = await User.findOne({ email }).select(
    "-confirmed -createdAt -password -token -updatedAt -__v"
  );

  if (!user) {
    const error = new Error("User not found");
    return res.status(404).json({ msg: error.message });
  }

  //Collaborator is not the admin
  if (project.creator.toString() === user._id.toString()) {
    const error = new Error("Creator can't be collaborator");
    return res.status(404).json({ msg: error.message });
  }

  //Check if is already a collaborator
  if (project.collaborators.includes(user._id)) {
    const error = new Error("User is already a collaborator");
    return res.status(404).json({ msg: error.message });
  }

  //Everything is ok
  project.collaborators.push(user._id);
  await project.save();
  res.json({ msg: "Collaborator Added" });
};

const deleteCollaborator = async (req, res) => {};

export {
  getProjects,
  newProject,
  getProject,
  editProject,
  deleteProject,
  addCollaborator,
  deleteCollaborator,
  findCollaborator,
};
