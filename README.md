# Slack Automation Template

This is a repo you can use as a template for a slack action that repeats on a schedule and requires custom logic.

The included example runs a pre-meeting workflow for a daily standup where it does the following:

- Gets weather information from weatherapi.com for the different cities of participants
- Provides a randomized list of the candidates supposed to speak in the meeting
- Gets the amount of pending pull requests using the github api

Actions are scheduled using cron jobs.

Check out [this](https://medium.com/@aziznal/create-a-daily-standup-bot-with-slack-automations-7c863ee6faad) article to see how you can setup a working example using slack automations.

## Environment Variables

an `.env.sample` file is included that you can copy-paste and fill in. The environment is validated and loaded
into runtime

## Local Development / Testing

- `npm run dev` runs the app and watches for changes. Combine this withe `runOnInit: true` option and you'll call the slack automation everytime you save. Very annoying.
- `npm run start` runs the current build.
- `npm run lint` lints & `npm run typecheck` checks types

```typescript
cron.schedule(
  CronTime.everyWeekDayAt(9, 50, "monday", "friday"),
  executeDailyFlow,
  {
    // causes the cron job to run once when it's first initialized. Running in dev mode causes it to re-run after every save.
    runOnInit: true,
  },
);
```

## Compiling

`npm run build` which uses `tsc` under the hood.

## Formatting

If you notice your computer slowing down, formatting may help breath some life into it.

## Deploying

I personally used railway since it does a re-deploy when you push to the repo and setting things up like variables isn't too big of a pain.

## TSConfig

Yes.
