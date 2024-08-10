import { File } from "../models/files.js";


// Function for file creation
const createFile = async (fileData) =>{
    const file = new File(fileData);
    return await file.save();
}

export { createFile };