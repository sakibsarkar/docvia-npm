import type { IAppWidget, IToken } from "../interface";

export const baseApiUrl = "https://docvia-backend.vercel.app/api/v1";

interface IResponse {
  widget: IAppWidget;
  token: IToken;
  uid?: string;
}
export const getApiAccess = async (apiKey: string) => {
  const uuid = localStorage.getItem("docvia_uid") || undefined;
  const response = await fetch(`${baseApiUrl}/chat-bot/access-token`, {
    method: "POST",
    body: JSON.stringify({ appSecret: apiKey, uuid }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = (await response.json()) as { data: IResponse };
  if (data?.data?.uid) {
    localStorage.setItem("docvia_uid", data.data.uid);
  }
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
