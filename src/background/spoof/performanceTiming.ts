import { PerformanceTiming } from "@/types/environment"

const spoofTimeOrigin = () => {
    const now = Date.now()
    const spoofed = now - Math.floor(Math.random() * 3000)
    Object.defineProperty(performance, "timeOrigin", {
        configurable:true,
        get: () => spoofed,
    })
}

const getClockDrift = (timeOrigin: number, perfNow: number): number => {
    return perfNow + timeOrigin - Date.now()
}

export const spoofPerformanceTiming = (): PerformanceTiming => {
    spoofTimeOrigin()
    const timeOrigin = performance.timeOrigin;
    const perfNow = performance.now();

    return {
        timeOrigin: timeOrigin,
        clockDrift: getClockDrift(timeOrigin, perfNow),
    }
}



// export interface PerformanceTiming {
//     timeOrigin: number;
//     clockDrift: number;
//   }