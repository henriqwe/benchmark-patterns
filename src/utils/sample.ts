import { rand } from "./rand";

export const sample = <T>(arr: T[]): T => arr[rand(0, arr.length - 1)];
