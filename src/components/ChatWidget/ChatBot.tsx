import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { IAppWidget,ChatMessage } from "../../index";




// Default Agent Icon SVG
const DefaultAgentIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="10" r="6" fill="currentColor" />
    <path
      d="M4 24C4 19.58 9.37 16 16 16C22.63 16 28 19.58 28 24"
      fill="currentColor"
    />
  </svg>
);

const ChatBot = ({ widget }: { widget: IAppWidget }) => {
  const {
    headerColor,
    headerTextColor,
    agentMessageColor,
    agentTextColor,
    visitorMessageColor,
    visitorTextColor,
    agentName,
    agentPhoto,
  } = widget || {};
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "agent",
      message: `Hi! I'm ${agentName}. How can I help you today?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add visitor message
    const visitorMessage: ChatMessage = {
      id: `visitor-${Date.now()}`,
      sender: "visitor",
      message: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, visitorMessage]);
    setInputValue("");

    // Simulate agent response after a short delay
    setTimeout(() => {
      const agentResponse: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: "agent",
        message:
          "Thanks for your message! I received it and will get back to you shortly.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const styles = {
    container: {
      position: "fixed" as const,
      bottom: "20px",
      right: "20px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      zIndex: 9999,
    },
    toggleButton: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      backgroundColor: headerColor,
      color: headerTextColor,
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      fontSize: "24px",
      fontWeight: "bold",
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": {
        transform: "scale(1.1)",
      },
    } as React.CSSProperties,
    chatBox: {
      position: "fixed" as const,
      bottom: "90px",
      right: "20px",
      width: "500px",
      height: "600px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 5px 40px rgba(0, 0, 0, 0.16)",
      display: "flex",
      flexDirection: "column" as const,
      overflow: "hidden",
    },
    header: {
      backgroundColor: headerColor,
      color: headerTextColor,
      padding: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderTopLeftRadius: "12px",
      borderTopRightRadius: "12px",
      minHeight: "60px",
    },
    headerContent: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      flex: 1,
    },
    agentPhoto: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      objectFit: "cover" as const,
    },
    agentIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    agentName: {
      fontSize: "16px",
      fontWeight: "600",
    },
    closeHeaderButton: {
      background: "none",
      border: "none",
      color: headerTextColor,
      fontSize: "24px",
      cursor: "pointer",
      padding: "0",
      width: "32px",
      height: "32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: 0.7,
      transition: "opacity 0.2s",
    } as React.CSSProperties,
    messagesContainer: {
      flex: 1,
      overflowY: "auto" as const,
      padding: "16px",
      display: "flex",
      flexDirection: "column" as const,
      gap: "12px",
    },
    messageGroup: {
      display: "flex",
      alignItems: "flex-end",
      gap: "8px",
    } as React.CSSProperties,
    messageGroupRight: {
      justifyContent: "flex-end",
    } as React.CSSProperties,
    messageBubble: {
      maxWidth: "70%",
      padding: "12px 16px",
      borderRadius: "12px",
      wordWrap: "break-word" as const,
      fontSize: "14px",
      lineHeight: "1.4",
    },
    agentMessage: {
      backgroundColor: agentMessageColor,
      color: agentTextColor,
    },
    visitorMessage: {
      backgroundColor: visitorMessageColor,
      color: visitorTextColor,
    },
    inputArea: {
      padding: "12px 16px",
      borderTop: "1px solid #e0e0e0",
      display: "flex",
      gap: "8px",
    },
    inputField: {
      flex: 1,
      padding: "10px 12px",
      border: "1px solid #d0d0d0",
      borderRadius: "6px",
      fontSize: "14px",
      fontFamily: "inherit",
      resize: "none" as const,
      outline: "none",
    } as React.CSSProperties,
    sendButton: {
      backgroundColor: headerColor,
      color: headerTextColor,
      border: "none",
      borderRadius: "6px",
      padding: "10px 16px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      transition: "opacity 0.2s",
    } as React.CSSProperties,
  };

  return (
    <div style={styles.container}>
      {/* Toggle Button */}
      <button
        style={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        title={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div style={styles.chatBox}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerContent}>
              {agentPhoto ? (
                <img
                  src={agentPhoto || "/placeholder.svg"}
                  alt={agentName}
                  style={styles.agentPhoto}
                />
              ) : (
                <div style={styles.agentIcon}>
                  <DefaultAgentIcon />
                </div>
              )}
              <span style={styles.agentName}>{agentName}</span>
            </div>
            <button
              style={styles.closeHeaderButton}
              onClick={() => setIsOpen(false)}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.7";
              }}
              title="Close"
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div style={styles.messagesContainer}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  ...styles.messageGroup,
                  ...(msg.sender === "visitor" ? styles.messageGroupRight : {}),
                }}
              >
                {msg.sender === "agent" && !agentPhoto && (
                  <div
                    style={{
                      ...styles.agentIcon,
                      width: "32px",
                      height: "32px",
                      color: agentTextColor,
                    }}
                  >
                    <DefaultAgentIcon />
                  </div>
                )}
                <div
                  style={{
                    ...styles.messageBubble,
                    ...(msg.sender === "agent"
                      ? styles.agentMessage
                      : styles.visitorMessage),
                  }}
                >
                  {msg.message}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={styles.inputArea}>
            <input
              type="text"
              style={styles.inputField}
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              style={styles.sendButton}
              onClick={handleSendMessage}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
              title="Send message"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
