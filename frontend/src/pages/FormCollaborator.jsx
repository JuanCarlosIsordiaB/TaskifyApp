import React, { useState } from "react";
import useProjects from "../hooks/useProjects";
import Alert from "../components/Alert";

export const FormCollaborator = () => {
  const [email, setEmail] = useState("");

  const { showAlert, alert,submitCollaborator } = useProjects();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      showAlert({
        msg: "Email is required",
        error: true,
      });
      return;
    }
    submitCollaborator(email);
    
  };

  const { msg } = alert;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alert alert={alert} />}
      <div className="mb-5 ">
        <div className="mb-5">
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="email"
          >
            Email Collaborator 
          </label>

          <input
            type="email"
            id="email"
            placeholder="Email of the collaborator to add"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 text-white uppercase font-bold w-full p-2 rounded-md cursor-pointer transition-colors text-sm"
          value="Add Collaborator"
        />
      </div>
    </form>
  );
};
