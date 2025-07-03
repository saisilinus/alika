import type { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  name?: string
  email: string
  image?: string
  role: "user" | "admin" | "moderator"
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Campaign {
  _id?: ObjectId
  title: string
  description: string
  category: string
  templateUrl?: string
  creatorId: string
  viewCount: number
  downloadCount: number
  isTrending: boolean
  isFeatured: boolean
  placeholderConfig: Record<string, any>
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface GeneratedBanner {
  _id?: ObjectId
  campaignId: string
  userName: string
  userPhotoUrl?: string
  generatedBannerUrl: string
  isPublic: boolean
  createdAt: Date
}

export interface Comment {
  _id?: ObjectId
  campaignId: string
  userId?: string
  parentId?: string
  content: string
  likesCount: number
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
}

export interface DatabaseCollections {
  users: "users"
  campaigns: "campaigns"
  generatedBanners: "generatedBanners"
  comments: "comments"
}

export const COLLECTIONS: DatabaseCollections = {
  users: "users",
  campaigns: "campaigns",
  generatedBanners: "generatedBanners",
  comments: "comments",
}
