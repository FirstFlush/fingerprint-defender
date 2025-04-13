import detectEnvironment from "./detect";
import spoofEnvironment from "./spoof";


const detectedEnvironment = await detectEnvironment();
const spoofedEnvironment = await spoofEnvironment(detectedEnvironment);

console.log("detected environment:");
console.log(detectedEnvironment);
console.log("spoofed environment:");
console.log(spoofedEnvironment);
