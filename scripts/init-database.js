#!/usr/bin/env node

const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");
const { loadEnvConfig } = require("@next/env");

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function initializeDatabase() {
  if (!process.env.MONGODB_URI) {
    log("❌ MONGODB_URI not found in environment variables", "red");
    log("Please add MONGODB_URI to your .env.local file", "yellow");
    process.exit(1);
  }

  let client;

  try {
    log("🔄 Connecting to MongoDB...", "blue");
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    const db = client.db("alika");
    log("✅ Connected to MongoDB successfully", "green");

    // Create indexes
    log("🔄 Creating database indexes...", "blue");

    // Users collection indexes
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    await db.collection("users").createIndex({ role: 1 });
    log("✅ Users collection indexes created", "green");

    // Campaigns collection indexes
    await db.collection("campaigns").createIndex({ category: 1 });
    await db.collection("campaigns").createIndex({ isTrending: 1 });
    await db.collection("campaigns").createIndex({ createdAt: -1 });
    await db.collection("campaigns").createIndex({ viewCount: -1 });
    await db.collection("campaigns").createIndex({ creatorId: 1 });
    log("✅ Campaigns collection indexes created", "green");

    // Generated banners collection indexes
    await db.collection("generatedBanners").createIndex({ campaignId: 1 });
    await db.collection("generatedBanners").createIndex({ createdAt: -1 });
    await db.collection("generatedBanners").createIndex({ isPublic: 1 });
    log("✅ Generated banners collection indexes created", "green");

    // Comments collection indexes
    await db.collection("comments").createIndex({ campaignId: 1 });
    await db.collection("comments").createIndex({ parentId: 1 });
    await db.collection("comments").createIndex({ createdAt: -1 });
    log("✅ Comments collection indexes created", "green");

    // Insert sample data if collections are empty
    const campaignsCount = await db.collection("campaigns").countDocuments();

    if (campaignsCount === 0) {
      log("🔄 Inserting sample campaigns...", "blue");

      const sampleCampaigns = [
        {
          title: "Welcome to Alika",
          description:
            "Create your first personalized banner with this welcome template",
          category: "Welcome",
          templateUrl: "/templates/welcome.png",
          creatorId: "system",
          viewCount: 0,
          downloadCount: 0,
          isTrending: true,
          isFeatured: true,
          placeholderConfig: {
            namePosition: { x: 100, y: 50 },
            photoPosition: { x: 200, y: 100 },
          },
          tags: ["welcome", "intro", "getting-started"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Birthday Celebration",
          description: "Celebrate birthdays with this festive banner template",
          category: "Birthday",
          templateUrl: "/templates/birthday.png",
          creatorId: "system",
          viewCount: 0,
          downloadCount: 0,
          isTrending: false,
          isFeatured: true,
          placeholderConfig: {
            namePosition: { x: 150, y: 75 },
            photoPosition: { x: 50, y: 50 },
          },
          tags: ["birthday", "celebration", "party"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Achievement Award",
          description:
            "Recognize achievements with this professional award template",
          category: "Achievement",
          templateUrl: "/templates/achievement.png",
          creatorId: "system",
          viewCount: 0,
          downloadCount: 0,
          isTrending: true,
          isFeatured: false,
          placeholderConfig: {
            namePosition: { x: 120, y: 60 },
            photoPosition: { x: 180, y: 120 },
          },
          tags: ["achievement", "award", "recognition"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      await db.collection("campaigns").insertMany(sampleCampaigns);
      log("✅ Sample campaigns inserted", "green");
    }

    log("🎉 Database initialization completed successfully!", "bright");
    log("\n📋 Summary:", "cyan");
    log("   ✅ Database connection established", "green");
    log("   ✅ Indexes created for all collections", "green");
    log("   ✅ Sample data inserted (if needed)", "green");
    log("\n🚀 You can now start the application with: pnpm dev", "bright");
  } catch (error) {
    log(`❌ Database initialization failed: ${error.message}`, "red");
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

initializeDatabase();
