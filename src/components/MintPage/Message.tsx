interface MessageProps {
  message: string
}

function Message({ message }: MessageProps) {
  if (!message) return null;

  const lower = message.toLowerCase();
  const isError =
    message.includes("失败") ||
    message.includes("错误") ||
    lower.includes("fail") ||
    lower.includes("error");

  return (
    <div className={`message ${isError ? "error" : "success"}`}>{message}</div>
  );
}

export default Message
