import { useEffect, useState } from "react";
import type { IAppWidget } from "../../index";
import { ChatBot } from "../../index";

const ChatWidget: React.FC<{ apiKey: string }> = ({ apiKey }) => {
  const [widget, setWidget] = useState<IAppWidget | null>(null);

  useEffect(() => {
    const fetchWidget = async () => {
      try {
        const response = await fetch(`/api/widget?apiKey=${apiKey}`);
        const data = (await response.json()) as { data: IAppWidget };
        setWidget(data?.data);
      } catch (error) {
        console.error("Error fetching widget:", error);
      }
    };
    fetchWidget();
  }, [apiKey]);

  if (!widget) return <></>;
  return <ChatBot widget={widget} />;
};

export default ChatWidget;
