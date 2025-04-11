import { Skill } from "./skill.model"


const getSkillFunc = async() => {
    const res =await Skill.find()
    return res;
}
export const skillService = {
    getSkillFunc
}