
import { useEffect, useState } from 'react';
import GameContainer from './GameContainer';
import LocationContainer from './LocationContainer';
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && (event.key === "=" || event.key === "-")) {
    event.preventDefault();
  }
 
});
document.addEventListener('wheel', (event) => {
  event.preventDefault();
});
function GameWindow() {
  const [path,setPath] = useState([])
  

  return (
    <div id="game-window" className='relative flex w-full h-[100vh]'>
      <div className='w-2/12'>
        <button className='w-5 h-full bg-blue-500 rounded-md hover:bg-black '></button>
      </div>
      <div className='w-7/12 -ml-2/12 h-full'>
        <GameContainer setPath={setPath}/>
      </div>
      <div className='w-3/12 px-2'>

        <LocationContainer path={path} />

      </div>

      {/* <PointsGroup mapData={mapData} /> */}
    </div>
  )
}

export default GameWindow;