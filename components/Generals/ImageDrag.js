"use client";
import axios from "axios-base";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

//Libs
import { uploadImage, deleteImage } from "lib/files";
import base from "lib/base";
import { useEffect, useState } from "react";

export const OneImageDrag = ({ setDeletePictures, setPhoto, photo }) => {
  const { Dragger } = Upload;
  const [progress, setProgress] = useState(0);

  // Config
  const customUpload = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) setTimeout(() => setProgress(0), 1000);
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    try {
      const { name, url } = await uploadImage(file, config);
      const data = {
        name,
        url,
      };
      setPhoto(data);

      onSuccess("ok");
      message.success(name + "Хуулагдлаа");
    } catch (err) {
      message.error(err);
    }
  };

  const uploadOptions = {
    onRemove: (file) => handleRemove("cover", file),
    fileList: photo && photo.name && [photo],
    customRequest: (options) => customUpload(options),
    accept: "image/*",
    name: "logo",
    listType: "picture",
    maxCount: 1,
  };

  const handleRemove = (file) => {
    setPhoto(null);
    setDeletePictures((bf) => [...bf, file.name]);
  };

  return (
    <div className="white-input">
      <Dragger {...uploadOptions}>
        {" "}
        <p className="ant-upload-drag-icon white-input">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text white-input">
          Зургаа энэ хэсэг рүү чирч оруулна уу
        </p>
      </Dragger>
    </div>
  );
};

const ImageDrag = ({ setPictures, pictures, setDeletePictures }) => {
  const { Dragger } = Upload;
  const [progress, setProgress] = useState(0);

  // Config
  const customUpload = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) setTimeout(() => setProgress(0), 1000);
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    try {
      const { name, url } = await uploadImage(file, config);
      const data = {
        name,
        url,
      };

      setPictures((prevPictures) => [...prevPictures, data]);

      onSuccess("ok");
      message.success(name + "Хуулагдлаа");
    } catch (err) {
      message.error(err);
    }
  };

  const handleRemove = (file) => {
    let index, deleteFile, list;
    index = pictures.indexOf(file);
    deleteFile = pictures[index].name;
    list = pictures.slice();
    list.splice(index, 1);
    setPictures(list);

    setDeletePictures((bf) => [...bf, deleteFile]);
  };

  const uploadOptions = {
    onRemove: (file) => handleRemove(file),
    fileList: [...pictures],
    customRequest: customUpload,
    accept: "image/*",
    name: "pictures",
    multiple: true,
  };

  return (
    <Dragger {...uploadOptions} className="upload-list-inline">
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Зургаа энэ хэсэг рүү чирч оруулна уу</p>
      <p className="ant-upload-hint">
        Нэг болон түүнээс дээш файл хуулах боломжтой
      </p>
    </Dragger>
  );
};

export default ImageDrag;
