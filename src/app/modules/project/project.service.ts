import { TProject } from "./project.interface"
import { Project } from "./project.model"

const createProjectFunc =async(payload:TProject)=>{
  const res = await Project.create(payload);
  return res;
}

const updateProjectFunc = async (payload:TProject)=>{
    const res = await Project.findByIdAndUpdate(payload?._id, payload);
    return res;
}
const deleteProjectFunc = async(id : any)=>{
    const res = await Project.findOneAndDelete(id)
    return res
}
const getAllProjectFunc = async ()=>{
    const res = await Project.find()
    return res
}
const getSingleProjectFunc = async (id :any)=>{
    const res = await Project.findOne(id)
    return res
}
export const projectService = {
    createProjectFunc,
    updateProjectFunc,
    getAllProjectFunc,
    deleteProjectFunc,
    getSingleProjectFunc
}