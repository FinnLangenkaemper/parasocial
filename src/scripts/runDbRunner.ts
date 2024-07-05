import { setCreatorData } from "./populateDbRunner";

function startInterval(): void {
   
    setInterval(setCreatorData, 60 * 1000); // Set interval to 60 seconds (60000 milliseconds)
}

// Start the interval
startInterval();
