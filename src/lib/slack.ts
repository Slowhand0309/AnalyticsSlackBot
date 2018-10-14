
export interface IPostPayload {
  text: string,
  channel: string,
  username: string,
  icon_url: string
}

interface IPostParams extends GoogleAppsScript.URL_Fetch.URLFetchRequestOptions {
  method: 'post',
  payload: IPostPayload
}

export const postSlack = (params: IPostPayload) => {
  const p: IPostParams = { method: 'post', payload: params};
  return UrlFetchApp.fetch('', p);
}