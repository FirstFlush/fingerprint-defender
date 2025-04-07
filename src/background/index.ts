import detectEnvironment from "./detect";
import spoofEnvironment from "./spoof";
import setEnvironment from "./setEnv";

const environment = await detectEnvironment();
const spoofedEnvironment = spoofEnvironment(environment);

await setEnvironment(spoofedEnvironment);
