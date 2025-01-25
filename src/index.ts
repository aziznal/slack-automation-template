import cron from "node-cron";
import { CronTime } from "cron-time-generator";

import { loadEnvIntoProcess } from "./lib/environment";
import { executeDailyFlow } from "./cron-jobs/daily/execute-daily-flow";

loadEnvIntoProcess();

cron.schedule(
  CronTime.everyWeekDayAt(9, 50, "monday", "friday"),
  executeDailyFlow,
  {
    // @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones (the TZ column, specifically)
    timezone: "Europe/Istanbul",

    // set to true to run the workflow after every save when running in dev mode
    runOnInit: false,
  },
);
