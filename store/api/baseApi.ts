import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth, TAG_TYPES } from "../../utils/api";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(TAG_TYPES),
  endpoints: () => ({}),
});

export const {} = baseApi;
