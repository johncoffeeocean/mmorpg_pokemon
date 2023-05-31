import { useEffect, useState } from "react";

var LocationContainer = ({ path }) => {
  const [locationImage, setLocationImage] = useState("");
  const [showCountedString, setShowCountedString] = useState("");
  const [showPathString, setShowPathString] = useState("");
  const [dialogFlag, setDialogFlag] = useState(false);
  useEffect(() => {
    if (path.length > 0) {
      setLocationImage(require("./../../assets/images/location-1.png"));
      if (path.length === 1) {
        setShowCountedString("This is where you are in now.");
        setShowPathString("");
      } else {
        setShowCountedString(
          "It will take " + (path.length - 1) + " hours to reach there"
        );

        setShowPathString(path.join("-> "));
      }
    }
  }, [path]);
  return (
    <div id="location-container" className="location-container w-full h-full">
      <div className="w-full h-1/4 pt-5 ">
        {locationImage !== "" && (
          <img src={locationImage} alt="" className="w-full h-full" />
        )}
      </div>
      <div className="location_container_title">{showCountedString}</div>
      <div>{showPathString}</div>
      {dialogFlag && (
        <div id="dialog-area" className="flex space-x-3 justify-center">
          <button className="rounded-md bg-black w-1/3 h-10 text-white">
            Cancel
          </button>
          <button className="rounded-md bg-blue-600 w-1/3 h-10 text-white">
            Move
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationContainer;
