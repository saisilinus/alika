// API client for Alika platform

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
    // Get token from localStorage if available
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("accessToken")
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      // Handle token refresh if needed
      if (response.status === 401 && this.token) {
        const refreshed = await this.refreshToken()
        if (refreshed) {
          // Retry the original request with new token
          headers.Authorization = `Bearer ${this.token}`
          return fetch(url, { ...options, headers })
        } else {
          this.clearToken()
          throw new Error("Authentication failed")
        }
      }

      return response
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = localStorage.getItem("refreshToken")
      if (!refreshToken) return false

      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      })

      if (response.ok) {
        const data = await response.json()
        this.setToken(data.accessToken)
        localStorage.setItem("refreshToken", data.refreshToken)
        return true
      }
    } catch (error) {
      console.error("Token refresh failed:", error)
    }
    return false
  }

  // Authentication methods
  async register(email: string, password: string, confirmPassword: string) {
    const response = await this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, confirmPassword }),
    })

    if (response.ok) {
      const data = await response.json()
      this.setToken(data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)
      return data
    } else {
      const error = await response.json()
      throw new Error(error.error || "Registration failed")
    }
  }

  async login(email: string, password: string) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      const data = await response.json()
      this.setToken(data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)
      return data
    } else {
      const error = await response.json()
      throw new Error(error.error || "Login failed")
    }
  }

  async logout() {
    const refreshToken = localStorage.getItem("refreshToken")
    await this.request("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    })
    this.clearToken()
  }

  async getProfile() {
    const response = await this.request("/auth/profile")
    if (response.ok) {
      return response.json()
    } else {
      throw new Error("Failed to fetch profile")
    }
  }

  // Campaign methods
  async getCampaigns(
    params: {
      category?: string
      search?: string
      sort?: string
      limit?: number
      offset?: number
    } = {},
  ) {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString())
      }
    })

    const response = await this.request(`/campaigns?${queryParams}`)
    if (response.ok) {
      return response.json()
    } else {
      throw new Error("Failed to fetch campaigns")
    }
  }

  async getCampaign(id: string) {
    const response = await this.request(`/campaigns/${id}`)
    if (response.ok) {
      return response.json()
    } else {
      throw new Error("Failed to fetch campaign")
    }
  }

  async getTrendingCampaigns() {
    const response = await this.request("/campaigns/trending")
    if (response.ok) {
      return response.json()
    } else {
      throw new Error("Failed to fetch trending campaigns")
    }
  }

  async getLatestCampaigns() {
    const response = await this.request("/campaigns/latest")
    if (response.ok) {
      return response.json()
    } else {
      throw new Error("Failed to fetch latest campaigns")
    }
  }

  async incrementViewCount(id: string) {
    await this.request(`/campaigns/${id}/view`, { method: "POST" })
  }

  async generateBanner(campaignId: string, userName: string, userPhoto?: string, isPublic = false) {
    const response = await this.request(`/campaigns/${campaignId}/generate`, {
      method: "POST",
      body: JSON.stringify({ userName, userPhoto, isPublic }),
    })

    if (response.ok) {
      return response.json()
    } else {
      const error = await response.json()
      throw new Error(error.error || "Failed to generate banner")
    }
  }

  // Upload methods
  async uploadPhoto(file: File) {
    const formData = new FormData()
    formData.append("photo", file)

    const response = await fetch(`${this.baseURL}/upload/photo`, {
      method: "POST",
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
      body: formData,
    })

    if (response.ok) {
      return response.json()
    } else {
      const error = await response.json()
      throw new Error(error.error || "Failed to upload photo")
    }
  }

  async uploadTemplate(file: File) {
    const formData = new FormData()
    formData.append("template", file)

    const response = await fetch(`${this.baseURL}/upload/template`, {
      method: "POST",
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
      body: formData,
    })

    if (response.ok) {
      return response.json()
    } else {
      const error = await response.json()
      throw new Error(error.error || "Failed to upload template")
    }
  }

  // Admin methods
  async getAdminStats() {
    const response = await this.request("/admin/stats")
    if (response.ok) {
      return response.json()
    } else {
      throw new Error("Failed to fetch admin stats")
    }
  }

  async getAdminCampaigns() {
    const response = await this.request("/admin/campaigns")
    if (response.ok) {
      return response.json()
    } else {
      throw new Error("Failed to fetch admin campaigns")
    }
  }

  async createCampaign(campaignData: {
    title: string
    description: string
    category: string
    templateUrl?: string
    placeholderConfig?: object
    tags?: string[]
  }) {
    const response = await this.request("/admin/campaigns", {
      method: "POST",
      body: JSON.stringify(campaignData),
    })

    if (response.ok) {
      return response.json()
    } else {
      const error = await response.json()
      throw new Error(error.error || "Failed to create campaign")
    }
  }

  async updateCampaign(id: string, updates: object) {
    const response = await this.request(`/admin/campaigns/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    })

    if (response.ok) {
      return response.json()
    } else {
      const error = await response.json()
      throw new Error(error.error || "Failed to update campaign")
    }
  }

  async deleteCampaign(id: string) {
    const response = await this.request(`/admin/campaigns/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to delete campaign")
    }
  }

  async getAdminUsers() {
    const response = await this.request("/admin/users")
    if (response.ok) {
      return response.json()
    } else {
      throw new Error("Failed to fetch admin users")
    }
  }

  async updateUserRole(userId: string, role: string) {
    const response = await this.request(`/admin/users/${userId}/role`, {
      method: "PUT",
      body: JSON.stringify({ role }),
    })

    if (response.ok) {
      return response.json()
    } else {
      const error = await response.json()
      throw new Error(error.error || "Failed to update user role")
    }
  }
}

// Create and export API client instance
export const api = new ApiClient(API_BASE_URL)

// Export types for TypeScript
export interface Campaign {
  id: string
  title: string
  description: string
  category: string
  template_url: string
  creator_id: string
  view_count: number
  download_count: number
  is_trending: boolean
  is_featured: boolean
  placeholder_config: object
  tags: string[]
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  role: "user" | "admin" | "moderator"
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface GeneratedBanner {
  id: string
  campaign_id: string
  user_name: string
  user_photo_url?: string
  generated_banner_url: string
  is_public: boolean
  created_at: string
}
