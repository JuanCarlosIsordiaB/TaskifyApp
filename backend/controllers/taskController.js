import Project from '../models/Project.js';
import Task from '../models/Task.js';

const addTask = async(req, res) => {
    const {project} = req.body;

    const existsProject = await Project.findById(project);

    if(!existsProject){
        const error = new Error('No project Found');
        return res.status(404).json({msg: error.message});
    }
    if(existsProject.creator.toString() !== req.user._id.toString()){
        const error = new Error('You cant add Tasks ');
        return res.status(404).json({msg: error.message});
    }

    try {
        const taskStored = await Task.create(req.body);
        res.json(taskStored);
    } catch (error) {
        console.log(error)
    }
}

const getTask = async(req, res) => {

}

const updateTask = async(req, res) => {

}

const deleteTask = async(req, res) => {

}

const changeStateTask = async(req, res) => {
    
}

export{
    addTask,
    getTask,
    updateTask,
    deleteTask,
    changeStateTask
}