import detectEnvironment from "./detect";
import spoofEnvironment from "./spoof";
import setEnvironment from "./setEnv";

const detectedEnvironment = await detectEnvironment();
const spoofedEnvironment = spoofEnvironment(detectedEnvironment);

await setEnvironment(spoofedEnvironment);
