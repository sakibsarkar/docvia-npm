import type { IAppWidget, IToken } from "../interface";

export const baseApiUrl = "http://localhost:5000/api/v1";

interface IResponse {
  widget: IAppWidget;
  token: IToken;
}
export const getApiAccess = async (apiKey: string) => {
  const response = await fetch(`${baseApiUrl}/chat-bot/access-token`, {
    method: "POST",
    body: JSON.stringify({ appSecret: apiKey }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = (await response.json()) as { data: IResponse };
  return data?.data;
};

export const getQueryAns = async ({
  apiKey,
  query,
  token,
}: {
  apiKey: string;
  query: string;
  token: IToken;
}) => {
  let tokenString = token.token;
  const isValidToken = new Date(token.expireAt) > new Date();

  if (!isValidToken) {
    const response = await getApiAccess(apiKey);
    tokenString = response.token.token;
  }

  const response = await fetch(`${baseApiUrl}/chat-bot/query`, {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenString}`,
    },
  });
  const data = (await response.json()) as { data: string };
  return data?.data;
};
