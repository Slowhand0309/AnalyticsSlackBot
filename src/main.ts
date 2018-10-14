//import { postSlack, IPostPayload } from "./lib/slack";

declare var global: any;

global.report = () => {
  const profileId = process.env.PROFILE_ID;
  if (profileId) {
    Logger.log(profileId);
  }
};