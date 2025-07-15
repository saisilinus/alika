import api from "@/lib/redux/api";
import type { Campaign, User } from "@/lib/types";

export interface AdminStats {
  totalUsers: number;
  totalCampaigns: number;
  totalGeneratedBanners: number;
  totalViews: number;
  totalDownloads: number;
  monthlyGrowth: {
    users: number;
    campaigns: number;
    views: number;
    downloads: number;
  };
  recentActivity?: Array<{
    type: "user_registered" | "campaign_created" | "banner_generated";
    description: string;
    timestamp: Date;
  }>;
  monthlyActivity?: Array<{
    month: string;
    users: number;
    campaigns: number;
  }>;
  categoryDistribution?: Array<{
    category: string;
    count: number;
  }>;
  engagementByCategory?: Array<{
    category: string;
    views: number;
    downloads: number;
  }>;
}

export interface AdminStatsResponse {
  stats: AdminStats;
  recentCampaigns: Campaign[];
}

export interface AdminUsersResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface AdminCampaignsResponse {
  campaigns: Campaign[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface UpdateUserRoleRequest {
  userId: string;
  role: "user" | "admin" | "moderator";
}

export interface UpdateCampaignRequest {
  campaignId: string;
  updates: Partial<Campaign>;
}

const apiWithAdminTags = api.enhanceEndpoints({
  addTagTypes: ["AdminStats", "AdminUsers", "AdminCampaigns"],
});

const adminApi = apiWithAdminTags.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query<AdminStatsResponse, void>({
      query: () => ({
        url: "admin/stats",
        method: "GET",
      }),
      providesTags: ["AdminStats"],
    }),

    getAdminUsers: builder.query<
      AdminUsersResponse,
      { page?: number; limit?: number; search?: string }
    >({
      query: (params) => ({
        url: "admin/users",
        method: "GET",
        params,
      }),
      providesTags: (result) =>
        result?.users
          ? [
              ...result.users.map(({ _id }) => ({
                type: "AdminUsers" as const,
                id: _id?.toString(),
              })),
              { type: "AdminUsers", id: "PARTIAL-USERS-LIST" },
            ]
          : [{ type: "AdminUsers", id: "PARTIAL-USERS-LIST" }],
    }),

    updateUserRole: builder.mutation<
      { success: boolean },
      UpdateUserRoleRequest
    >({
      query: ({ userId, role }) => ({
        url: `admin/users/${userId}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        { type: "AdminUsers", id: userId },
        { type: "AdminUsers", id: "PARTIAL-USERS-LIST" },
        "AdminStats",
      ],
    }),
  }),
});

export const {
  useGetAdminStatsQuery,
  useGetAdminUsersQuery,
  useUpdateUserRoleMutation,
} = adminApi;

export default adminApi;
