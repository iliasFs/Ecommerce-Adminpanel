import React, { useState } from "react";
import axios from "axios";

const PhotoUploadForm: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setSelectedFiles(files);

    const previews = files
      ? Array.from(files).map((file) => URL.createObjectURL(file))
      : [];
    setImagePreviews(previews);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (selectedFiles) {
      try {
        const formData = new FormData();

        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append("files", selectedFiles[i]);
        }

        const response = await axios.post("/upload-url", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("files uploaded succesfully");
        console.log("Files uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex flex-col space-y-4">
        <label htmlFor="photos" className="font-bold">
          Select photos:
        </label>
        <input
          type="file"
          id="photos"
          accept="image/*"
          onChange={handleFileChange}
          multiple
          className="border border-gray-300 py-2 px-4 rounded-lg"
        />
        <div className="mt-4">
          <p className="font-bold">Selected photos:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          disabled={!selectedFiles || selectedFiles.length === 0}
          onClick={handleSubmit}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default PhotoUploadForm;
