import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";

type PhotoUploaderProps = {
  setProductImages: React.Dispatch<React.SetStateAction<string[]>>;
  productImages?: string[] | undefined;
};
const PhotoUploadForm = ({
  setProductImages,
  productImages,
}: PhotoUploaderProps) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[] | undefined>();

  useEffect(() => {
    setImagePreviews(productImages);
  }, [productImages]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setSelectedFiles(files);

    //we could do the preview with fileReader(mdn search)--FileReader.readAsURL but for now we use URL.create... to convert the file to a url and place it in the src attribute of the preview photos.Faster and easier.
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

        const response = await axios.post(
          "http://localhost:8080/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response) {
          const imageArray = response.data.map((item: { data: any }) => {
            return item.data;
          });
          
          setProductImages(imageArray);
        }

        
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  };

  const removePhoto = (ind: number) => {
    setImagePreviews([
      ...(imagePreviews?.filter((item, index) => item[index] !== item[ind]) ??
        []),
    ]);
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
            {imagePreviews?.map((preview, index) => (
              <div
                key={index}
                className="relative flex flex-col gap-1 items-center"
              >
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="w-[120px] h-[100px] object-cover object-top rounded-2xl hover:bg-opacity-40"
                />
                <button
                  type="button"
                  onClick={() => {
                    removePhoto(index);
                  }}
                  className="absolute inset-0 flex items-center justify-center top-1/2 left-1/2 color-white rounded-xl max-w-[100px] px-2 py-1 font-bold  text-white transition duration-300 ease-in-out hover:bg-red-700 hover:text-white hover:scale-105"
                >
                  <RiDeleteBin5Line size={30} />
                </button>
              </div>
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

//ofbmy8vl
