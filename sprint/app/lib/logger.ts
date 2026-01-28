type LogLevel = "info" | "error";

interface LogPayload {
  level: LogLevel;
  message: string;
  meta?: unknown;
  timestamp: string;
}

function log(level: LogLevel, message: string, meta?: unknown) {
  const payload: LogPayload = {
    level,
    message,
    meta,
    timestamp: new Date().toISOString(),
  };

  if (level === "error") {
    console.error(JSON.stringify(payload));
  } else {
    console.log(JSON.stringify(payload));
  }
}

export const logger = {
  info: (message: string, meta?: unknown) =>
    log("info", message, meta),
  error: (message: string, meta?: unknown) =>
    log("error", message, meta),
};
