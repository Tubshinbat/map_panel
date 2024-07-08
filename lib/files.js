import axios from "axios-base";
import base from "./base";

export const uploadImage = async (file, config = null) => {
  try {
    const fData = new FormData();
    fData.append("file", file);
    const res = await axios.post("/upload/imgupload", fData, config);
    const url = `${base.cdnUrl}/` + res.data.data;
    const name = res.data.data;
    return { url, name };
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async (file) => {
  try {
    await axios.delete("/upload/imgupload", { data: { file } });
  } catch (error) {
    console.log(error);
  }
};
