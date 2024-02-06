import { createContext, useEffect, useState } from "react";
import clientAxios from "../config/clientAxios";
import { useNavigate } from "react-router-dom";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalFormTask, setModalFormTask] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clientAxios.get("/projects", config);
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, []);

  const showAlert = (alert) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  const submitProject = async (project) => {
    if (project.id) {
      await editProject(project);
    } else {
      await newProject(project);
    }
  };

  const editProject = async (project) => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.put(
        `/projects/${project.id}`,
        project,
        config
      );
      const projectsUpdated = projects.map((projectState) =>
        projectState._id === data._id ? data : projectState
      );
      setProjects(projectsUpdated);
      setTimeout(() => {
        navigate("/projects");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  const newProject = async (project) => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post("/projects", project, config);

      setProjects([...projects, data]);

      setTimeout(() => {
        navigate("/projects");
      }, 3000);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getProject = async (id) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.get(`/projects/${id}`, config);
      setProject(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    console.log("project to delete:", id);

    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.delete(`/projects/${id}`, config);

      const projectsUpdated = projects.filter(
        (projectState) => projectState._id !== id
      );
      setProjects(projectsUpdated);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalTask = () => {
    setModalFormTask(!modalFormTask);
  };

  const submitTask = async (task) => {
    
    try {
      const token = localStorage.getItem("token");

      if(!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post("/tasks", task, config);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        showAlert,
        alert,
        submitProject,
        getProject,
        project,
        loading,
        deleteProject,
        modalFormTask,
        handleModalTask,
        submitTask,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
