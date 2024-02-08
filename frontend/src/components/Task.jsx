import React from "react";
import { formatDate } from "../helpers/formatDate";
import useProjects from "../hooks/useProjects";

export const Task = ({ task }) => {
  const { description, name, priority, deliverDate, state, _id } = task;

  const { handleModalEdit , handleModalDeleteTask} = useProjects();

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="mb-1 text-xl">{name}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
        <p className="mb-1 text-sm">{formatDate(deliverDate)}</p>
        <p className="mb-1 text-gray-600">{priority}</p>
      </div>
      <div className="flex gap-1">
        <button
          className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalEdit(task)}
        >
          Edit
        </button>
        {state ? (
          <button className="bg-green-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Completed
          </button>
        ) : (
          <button className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
            Incomplete
          </button>
        )}

        <button 
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalDeleteTask(task)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
