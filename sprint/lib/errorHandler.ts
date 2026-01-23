import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { logger } from "./logger";

export function handleError(error: unknown, context: string) {
  const isProd = process.env.NODE_ENV === "production";

  if (error instanceof ZodError) {
    logger.error(`Validation error in ${context}`, {
      issues: error.issues,
    });

    return NextResponse.json(
      {
        success: false,
        message: "Validation Error",
        errors: error.issues.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
      },
      { status: 400 }
    );
  }

  if (error instanceof Error) {
    logger.error(`Error in ${context}`, {
      message: error.message,
      stack: isProd ? "REDACTED" : error.stack,
    });

    return NextResponse.json(
      {
        success: false,
        message: isProd
          ? "Something went wrong. Please try again later."
          : error.message,
        stack: isProd ? undefined : error.stack,
      },
      { status: 500 }
    );
  }

  logger.error(`Unknown error in ${context}`, error);

  return NextResponse.json(
    {
      success: false,
      message: "Unexpected error occurred",
    },
    { status: 500 }
  );
}
