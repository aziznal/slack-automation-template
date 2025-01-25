import * as dotenv from "dotenv";
import { ZodError, z } from "zod";

// add variables to this schema and they'll be available in process.env
const environmentSchema = z.object(
  {
    SLACK_WEBHOOK_DAILYWORKFLOW_URL: z.string(),
    WEATHERAPI_API_KEY: z.string(),
    GITHUB_ACCESS_TOKEN: z.string(),
  },
  {
    required_error: "Environment was not found",
  },
);

export type Environment = z.infer<typeof environmentSchema>;

export const loadEnvIntoProcess = () => {
  try {
    // if available, load .env file into process.env
    dotenv.config();

    // env is implicity allowed to be loaded from hosting providers as well

    // make sure process.env contains all required variables
    environmentSchema.parse(process.env);
  } catch (error) {
    console.error("Something went wrong while parsing environment");

    if (error instanceof ZodError) {
      console.error(error.format());
      // format zod error to show which env variables are missing then print it to console (including name of the missing env variable)
      process.exit(1);
    }

    throw error;
  }
};
