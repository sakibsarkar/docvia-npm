"use client";
import { useEffect, useState } from "react";
import { IAppWidget, IToken } from "../../interface";
import { getApiAccess } from "../../utils";
import ChatBot from "./ChatBot";

interface IResponse {
  widget: IAppWidget;
  token: IToken;
}
const ChatWidget: React.FC<{ apiKey: string }> = ({ apiKey }) => {
  const [widget, setWidget] = useState<IResponse | null>(null);

  useEffect(() => {
    const fetchWidget = async () => {
      try {
        const response = await getApiAccess(apiKey);
        setWidget(response);
      } catch (error) {
        console.error("Error fetching widget:", error);
      }
    };
    fetchWidget();
  }, [apiKey]);

  if (!widget || !widget.widget || !widget.token) return <></>;

  return (
    <ChatBot apiKey={apiKey} widget={widget.widget} token={widget.token} />
  );
};

export default ChatWidget;
