import { postSlack, IPostPayload } from "./lib/slack";

function showMessage(message: string): void {
  Logger.log(message);
}

showMessage('first ts gas');

const params: IPostPayload = {
  text: 'hoge',
  channel: '#general',
  icon_url: '',
  username: 'hoge'
};
postSlack(params);