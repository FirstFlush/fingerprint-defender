import { InferredBrowser } from "@/types/inferredBrowser";
import { SensorAccess } from "@/types/environment";


const spoofSensor = (name: string, isAvailable: boolean) => {
  Object.defineProperty(window, name, {
    configurable: true,
    writable: true,
    value: isAvailable ? function () {} : undefined,
  });
};

const spoofMotionPermission = (isAvailable: boolean) => {
  if (typeof DeviceMotionEvent !== "undefined") {
    Object.defineProperty(DeviceMotionEvent, "requestPermission", {
      configurable: true,
      writable: true,
      value: isAvailable ? async () => "granted" : undefined,
    });
  }
  if (typeof DeviceOrientationEvent !== "undefined") {
    Object.defineProperty(DeviceOrientationEvent, "requestPermission", {
      configurable: true,
      writable: true,
      value: isAvailable ? async () => "granted" : undefined,
    });
  }
};

export const spoofSensorAccess = (inferredBrowser: InferredBrowser): SensorAccess => {
  const isMobile = inferredBrowser.deviceType === "mobile" || inferredBrowser.deviceType === "tablet";
  const enableSensors = isMobile && inferredBrowser.browser !== "Safari"; // Safari blocks most sensor APIs

  spoofSensor("Accelerometer", enableSensors);
  spoofSensor("Gyroscope", enableSensors);
  spoofSensor("Magnetometer", enableSensors);
  spoofMotionPermission(enableSensors);

  return {
    accelerometer: enableSensors,
    gyroscope: enableSensors,
    magnetometer: enableSensors,
    motionAccess: enableSensors,
  };
};
