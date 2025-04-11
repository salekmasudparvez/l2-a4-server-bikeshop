import { TBlogPost } from "./blog.interface";
import { Blogs } from "./blog.model";


const createBlogFunc =async(payload:TBlogPost)=>{
  const res = await Blogs.create(payload);
  return res;
}

const updateBlogFunc = async (payload:TBlogPost)=>{
    const res = await Blogs.findByIdAndUpdate(payload?._id, payload);
    return res;
}
const deleteBlogFunc = async(id : any)=>{
    const res = await Blogs.findOneAndDelete(id)
    return res
}
const getAllBlogsFunc = async ()=>{
    const res = await Blogs.find()
    return res
}
const getSingleBlogFunc = async (id :any)=>{
    const res = await Blogs.findOne(id)
    return res
}
export const blogService = {
    createBlogFunc,
    updateBlogFunc,
    getAllBlogsFunc,
    deleteBlogFunc,
    getSingleBlogFunc
}