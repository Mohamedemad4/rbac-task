import { CustomAppError } from "#errors/CustomAppError";

export const catchAppErrorsHTTP = async <T>(s: Promise<T>) => {
  try {
    const r = await s;
    return { status: 200 as const, body: r };
  } catch (error) {
    if (error instanceof CustomAppError) {
      return { status: error.statusCode, body: { message: error.message } };
    } else {
      console.error(error);
      return {
        status: 500 as const,
        body: { message: "Something went wrong" },
      };
    }
  }
};
