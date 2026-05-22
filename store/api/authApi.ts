import { getAccessToken } from "@/utils/storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await getAccessToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Me"],

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
    }),

    sendOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/send-otp",
        method: "POST",
        body,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),

    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["Me"],
    }),

    uploadProfileImage: builder.mutation({
      query: (formData) => ({
        url: "/users/profile-image",
        method: "POST",
        body: formData,
      }),
    }),

    updateProfile: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Me"],
    }),

    switchRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/users/${id}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["Me"],
    }),

    uploadNationalId: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/national-id",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useSwitchRoleMutation,
  useUploadNationalIdMutation,
  useUpdateProfileMutation,
  useUploadProfileImageMutation,
  useGetMeQuery,
  useSignupMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} = authApi;
