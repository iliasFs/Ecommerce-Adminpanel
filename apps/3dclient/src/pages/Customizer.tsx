import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";


import state from "../store";

import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  AIPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components";
import { download } from "../assets";

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState<File>();
  const [prompt, setPromt] = useState<string>("");
  const [generatingImage, setGeneratingImage] = useState<boolean>(false);
  const [activeEditorTab, setActiveEditorTab] = useState<string>("");
  const [activeFilterTab, setActiveFilterTab] = useState<FilterTab>({
    logoShirt: true,
    stylishShirt: false,
  });
  //show tab content depending on the active tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPromt}
            generatingImage={generatingImage}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (type: keyof typeof DecalTypes) => {
    if (!prompt) return alert("Please enter a prompt");
    try {
      setGeneratingImage(true);

      const response = await fetch("http://localhost:4000/api/v1/dalle", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImage(false);
    }
  };

  interface FilterTab {
    logoShirt: boolean;
    stylishShirt: boolean;
    [key: string]: boolean;
  }
  function handleDecals(type: keyof typeof DecalTypes, result: unknown) {
    const decalType = DecalTypes[type];
    (state as { [key: string]: unknown })[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  }

  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;

      default:
        state.isFullTexture = true;
        state.isFullTexture = false;
        break;
    }
    //after setting the state, activeFilterTab to update the UI
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const readFile = (type: keyof typeof DecalTypes) => {
    if (file) {
      reader(file).then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      });
    }
  };

  const handleDownloadModel = () => {

    const canvas = document.getElementById('canvas')as HTMLCanvasElement
    if(canvas) {// Replace 'canvas' with the ID of your canvas element
    const dataURL = canvas.toDataURL('image/png'); // Convert the canvas content to a data URL
  
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'model.png'; // Set the desired file name and extension
  
    // Trigger the click event to download the model
    link.click();
    }
  };
  
  

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => {
                      setActiveEditorTab(tab.name);
                    }}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTAb
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
             <button className='download-btn' onClick={downloadCanvasToImage}>
              <img
                src={download}
                alt='download_image'
                className='w-3/5 h-3/5 object-contain'
              />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
