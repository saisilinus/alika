import { type Db, type Collection, ObjectId } from "mongodb";
import clientPromise from "./mongodb";
import type { User, Campaign, GeneratedBanner, Comment } from "./types";

let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await clientPromise;
  const db = client.db("alika");
  cachedDb = db;
  return db;
}

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db("alika");
}

export async function getUsersCollection(): Promise<Collection<User>> {
  const db = await connectToDatabase();
  return db.collection<User>("users");
}

export async function getCampaignsCollection(): Promise<Collection<Campaign>> {
  const db = await connectToDatabase();
  return db.collection<Campaign>("campaigns");
}

export async function getGeneratedBannersCollection(): Promise<
  Collection<GeneratedBanner>
> {
  const db = await connectToDatabase();
  return db.collection<GeneratedBanner>("generatedBanners");
}

export async function getCommentsCollection(): Promise<Collection<Comment>> {
  const db = await connectToDatabase();
  return db.collection<Comment>("comments");
}

// Utility functions for common operations
export async function findUserByEmail(email: string): Promise<User | null> {
  const users = await getUsersCollection();
  return await users.findOne({ email: email.toLowerCase() });
}

export async function findUserById(id: string): Promise<User | null> {
  const users = await getUsersCollection();
  return await users.findOne({ _id: new ObjectId(id) });
}

export async function createUser(
  userData: Omit<User, "_id" | "createdAt" | "updatedAt">
): Promise<User> {
  const users = await getUsersCollection();
  const now = new Date();
  const user: Omit<User, "_id"> = {
    ...userData,
    email: userData.email?.toLowerCase(),
    createdAt: now,
    updatedAt: now,
  };

  const result = await users.insertOne(user as User);
  return { ...user, _id: result.insertedId };
}

export async function updateUser(
  id: string,
  updates: Partial<User>
): Promise<boolean> {
  const users = await getUsersCollection();
  const result = await users.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updates,
        updatedAt: new Date(),
      },
    }
  );
  return result.modifiedCount > 0;
}

export async function findCampaignById(id: string): Promise<Campaign | null> {
  const campaigns = await getCampaignsCollection();
  return await campaigns.findOne({ _id: new ObjectId(id) });
}

export async function createCampaign(
  campaignData: Omit<Campaign, "_id" | "createdAt" | "updatedAt">
): Promise<Campaign> {
  const campaigns = await getCampaignsCollection();
  const now = new Date();
  const campaign: Omit<Campaign, "_id"> = {
    ...campaignData,
    createdAt: now,
    updatedAt: now,
  };

  const result = await campaigns.insertOne(campaign as Campaign);
  return { ...campaign, _id: result.insertedId };
}

export async function updateCampaign(
  id: string,
  updates: Partial<Campaign>
): Promise<boolean> {
  const campaigns = await getCampaignsCollection();
  const result = await campaigns.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updates,
        updatedAt: new Date(),
      },
    }
  );
  return result.modifiedCount > 0;
}

export async function incrementCampaignViews(id: string): Promise<boolean> {
  const campaigns = await getCampaignsCollection();
  const result = await campaigns.updateOne(
    { _id: new ObjectId(id) },
    {
      $inc: { viewCount: 1 },
      $set: { updatedAt: new Date() },
    }
  );
  return result.modifiedCount > 0;
}

export async function incrementCampaignDownloads(id: string): Promise<boolean> {
  const campaigns = await getCampaignsCollection();
  const result = await campaigns.updateOne(
    { _id: new ObjectId(id) },
    {
      $inc: { downloadCount: 1 },
      $set: { updatedAt: new Date() },
    }
  );
  return result.modifiedCount > 0;
}

export async function createGeneratedBanner(
  bannerData: Omit<GeneratedBanner, "_id" | "createdAt">
): Promise<GeneratedBanner> {
  const banners = await getGeneratedBannersCollection();
  const banner: Omit<GeneratedBanner, "_id"> = {
    ...bannerData,
    createdAt: new Date(),
  };

  const result = await banners.insertOne(banner as GeneratedBanner);
  return { ...banner, _id: result.insertedId };
}

export async function createComment(
  commentData: Omit<Comment, "_id" | "createdAt" | "updatedAt">
): Promise<Comment> {
  const comments = await getCommentsCollection();
  const now = new Date();
  const comment: Omit<Comment, "_id"> = {
    ...commentData,
    createdAt: now,
    updatedAt: now,
  };

  const result = await comments.insertOne(comment as Comment);
  return { ...comment, _id: result.insertedId };
}

// Initialize database indexes
export async function initializeDatabase(): Promise<void> {
  const db = await connectToDatabase();

  // Users collection indexes
  await db.collection("users").createIndex({ email: 1 }, { unique: true });
  await db.collection("users").createIndex({ role: 1 });

  // Campaigns collection indexes
  await db.collection("campaigns").createIndex({ category: 1 });
  await db.collection("campaigns").createIndex({ isTrending: 1 });
  await db.collection("campaigns").createIndex({ createdAt: -1 });
  await db.collection("campaigns").createIndex({ viewCount: -1 });
  await db.collection("campaigns").createIndex({ creatorId: 1 });

  // Generated banners collection indexes
  await db.collection("generatedBanners").createIndex({ campaignId: 1 });
  await db.collection("generatedBanners").createIndex({ createdAt: -1 });
  await db.collection("generatedBanners").createIndex({ isPublic: 1 });

  // Comments collection indexes
  await db.collection("comments").createIndex({ campaignId: 1 });
  await db.collection("comments").createIndex({ parentId: 1 });
  await db.collection("comments").createIndex({ createdAt: -1 });
}

// Utility functions
export function isValidObjectId(id: string): boolean {
  return ObjectId.isValid(id);
}

export function createObjectId(id?: string): ObjectId {
  return id ? new ObjectId(id) : new ObjectId();
}

export function toObjectId(id: string): ObjectId {
  return new ObjectId(id);
}
