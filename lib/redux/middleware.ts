import {
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { showErrorToast } from "../toast-utils";

export const rtkQueryErrorLogger: Middleware =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  (_api: MiddlewareAPI) => (next) => (action: any) => {
    if (isRejectedWithValue(action)) {
      const errorPayload = action.payload;

      const message =
        typeof errorPayload?.data === "string"
          ? errorPayload.data
          : errorPayload?.data?.message ||
            errorPayload?.error ||
            "An error occurred";
      if (action.payload.error) {
        showErrorToast("Error", message);
      }
    }

    return next(action);
  };
