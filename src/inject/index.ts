import spoofEnvironment from "@/background/spoof";
import detectEnvironment from "@/background/detect";

(async () => {
  const detected = await detectEnvironment();
  await spoofEnvironment(detected);
})();
