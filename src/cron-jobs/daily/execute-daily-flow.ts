import { getParticipantsInfo } from "./functions/get-participants-info";
import { getPullrequestInfo } from "./functions/get-pullrequest-info";
import { getWeatherInfo } from "./functions/get-weather-info";

export async function executeDailyFlow() {
  console.log("Executing daily workflow");

  const weatherInfo = await getWeatherInfo(
    "Istanbul",
    "Ankara",
    "Konya",
    "Elazığ",
  );

  const participantsList = getParticipantsInfo(
    "Person 1",
    "Person 2",
    "Person 3",
    "Person 4",
  );

  const pullrequestInfo = await getPullrequestInfo();

  await callSlackWebhook({
    weatherInfo,
    participantsList,
    pullrequestInfo,
  });
}

async function callSlackWebhook(args: {
  weatherInfo: string;
  participantsList: string;
  pullrequestInfo: string;
}) {
  return fetch(process.env.SLACK_WEBHOOK_DAILYWORKFLOW_URL, {
    method: "POST",
    body: JSON.stringify({
      ...args,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      console.log(
        `Ran daily workflow with the following response from slack webhook: ${JSON.stringify(await res.json())}`,
      );
    })
    .catch((err) => {
      console.log("Something went wrong while executing daily flow", err);
    });
}
