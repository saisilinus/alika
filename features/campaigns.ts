import api from "@/lib/redux/api";
import type { Campaign, GeneratedBanner } from "@/lib/types";

export interface CampaignQueryParams {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    tags?: string[];
    sortBy?: "createdAt" | "viewCount" | "downloadCount";
    sortOrder?: "asc" | "desc";
}

export interface CampaignResponse {
    campaigns: Campaign[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export interface CreateCampaignRequest {
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    tags: string[];
    templateData?: {
        width: number;
        height: number;
        elements: any[];
    };
}

export interface GenerateBannerRequest {
    campaignId: string;
    customizations: {
        text?: string;
        colors?: string[];
        fonts?: string[];
        photo?: string;
    };
}

export interface GenerateBannerResponse {
    banner: GeneratedBanner;
    imageUrl: string;
}

export interface UpdateCampaignRequest {
    title?: string;
    description?: string;
    imageUrl?: string;
    category?: string;
    tags?: string[];
    isActive?: boolean;
    templateData?: {
        width: number;
        height: number;
        elements: any[];
    };
}

const apiWithCampaignTags = api.enhanceEndpoints({
    addTagTypes: ["Campaign"],
});

const campaignApi = apiWithCampaignTags.injectEndpoints({
    endpoints: (builder) => ({
        getCampaigns: builder.query<CampaignResponse, CampaignQueryParams>({
            query: (params) => ({
                url: "campaigns",
                method: "GET",
                params,
            }),
            providesTags: (result) =>
                result?.campaigns
                    ? [
                          ...result.campaigns.map(({ _id }) => ({
                              type: "Campaign" as const,
                              id: _id?.toString(),
                          })),
                          { type: "Campaign", id: "PARTIAL-CAMPAIGN-LIST" },
                      ]
                    : [{ type: "Campaign", id: "PARTIAL-CAMPAIGN-LIST" }],
        }),

        getTrendingCampaigns: builder.query<
            Pick<CampaignResponse, "campaigns">,
            { limit?: number }
        >({
            query: (params) => ({
                url: "campaigns/trending",
                method: "GET",
                params,
            }),
            providesTags: (result) =>
                result?.campaigns
                    ? [
                          ...result?.campaigns.map(({ _id }) => ({
                              type: "Campaign" as const,
                              id: _id?.toString(),
                          })),
                          { type: "Campaign", id: "TRENDING-CAMPAIGNS" },
                      ]
                    : [{ type: "Campaign", id: "TRENDING-CAMPAIGNS" }],
        }),

        getLatestCampaigns: builder.query<
            Pick<CampaignResponse, "campaigns">,
            { limit?: number }
        >({
            query: (params) => ({
                url: "campaigns/latest",
                method: "GET",
                params,
            }),
            providesTags: (result) =>
                result?.campaigns
                    ? [
                          ...result.campaigns.map(({ _id }) => ({
                              type: "Campaign" as const,
                              id: _id?.toString(),
                          })),
                          { type: "Campaign", id: "LATEST-CAMPAIGNS" },
                      ]
                    : [{ type: "Campaign", id: "LATEST-CAMPAIGNS" }],
        }),

        getCampaignById: builder.query<Campaign, string>({
            query: (id) => ({
                url: `campaigns/${id}`,
                method: "GET",
            }),
            providesTags: (result) =>
                result
                    ? [{ type: "Campaign", id: result._id?.toString() }]
                    : ["Campaign"],
        }),
        // Get similar campaigns
        getSimilarCampaigns: builder.query<
            Campaign[],
            {
                campaignId: string;
                limit?: number;
            }
        >({
            query: ({ campaignId, limit = 4 }) => ({
                url: `/campaigns/${campaignId}/similar`,
                params: { limit },
            }),
            providesTags: ["Campaign"],
        }),

        createCampaign: builder.mutation<Campaign, CreateCampaignRequest>({
            query: (body) => ({
                url: "campaigns",
                method: "POST",
                body,
            }),
            invalidatesTags: [
                { type: "Campaign", id: "PARTIAL-CAMPAIGN-LIST" },
                { type: "Campaign", id: "TRENDING-CAMPAIGNS" },
                { type: "Campaign", id: "LATEST-CAMPAIGNS" },
            ],
        }),

        // Update campaign (would need admin route or user ownership check)
        updateCampaign: builder.mutation<
            Campaign,
            {
                id: string;
                updates: UpdateCampaignRequest;
            }
        >({
            query: ({ id, updates }) => ({
                url: `/campaigns/${id}`,
                method: "PUT",
                body: updates,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Campaign", id },
                "Campaign",
            ],
        }),

        // Delete campaign (would need admin route or user ownership check)
        deleteCampaign: builder.mutation<void, string>({
            query: (id) => ({
                url: `/campaigns/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Campaign"],
        }),

        incrementCampaignViews: builder.mutation<{ success: boolean }, string>({
            query: (campaignId) => ({
                url: `campaigns/${campaignId}/view`,
                method: "POST",
            }),
            invalidatesTags: (_result, _error, campaignId) => [
                { type: "Campaign", id: campaignId },
                { type: "Campaign", id: "TRENDING-CAMPAIGNS" },
            ],
        }),

        // Track campaign view
        trackCampaignView: builder.mutation<void, string>({
            query: (id) => ({
                url: `/campaigns/${id}/view`,
                method: "POST",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Campaign", id }],
        }),

        generateBanner: builder.mutation<
            GenerateBannerResponse,
            GenerateBannerRequest
        >({
            query: ({ campaignId, customizations }) => ({
                url: `campaigns/${campaignId}/generate`,
                method: "POST",
                body: { customizations },
            }),
            invalidatesTags: (_result, _error, { campaignId }) => [
                { type: "Campaign", id: campaignId },
            ],
        }),
    }),
});

export const {
    useGetCampaignsQuery,
    useGetTrendingCampaignsQuery,
    useGetLatestCampaignsQuery,
    useGetCampaignByIdQuery,
    useCreateCampaignMutation,
    useUpdateCampaignMutation,
    useDeleteCampaignMutation,
    useIncrementCampaignViewsMutation,
    useGenerateBannerMutation,
    useTrackCampaignViewMutation,
    useGetSimilarCampaignsQuery,
} = campaignApi;

export default campaignApi;
