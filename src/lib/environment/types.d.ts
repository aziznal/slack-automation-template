import { Environment } from ".";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Environment {}
  }
}
