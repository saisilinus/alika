const { Pool } = require("pg")
const fs = require("fs")
const path = require("path")
require("dotenv").config()

// Create a direct connection for initialization
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres.cudsuspbbdavehxkpfnr:NHRILkxuAOSyuUEB@aws-0-eu-central-2.pooler.supabase.com:6543/postgres",
  ssl: {
    rejectUnauthorized: false,
  },
  max: 1, // Use single connection for initialization
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
})

async function initializeDatabase() {
  let client

  try {
    console.log("🚀 Starting database initialization...")

    // Get a client from the pool
    client = await pool.connect()
    console.log("✅ Connected to Supabase database")

    // Enable UUID extension
    console.log("📦 Enabling UUID extension...")
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    // Create users table
    console.log("👥 Creating users table...")
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
        is_active BOOLEAN DEFAULT TRUE,
        refresh_tokens JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)

    // Create campaigns table
    console.log("📋 Creating campaigns table...")
    await client.query(`
      CREATE TABLE IF NOT EXISTS campaigns (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        template_url VARCHAR(500),
        creator_id UUID,
        view_count INTEGER DEFAULT 0,
        download_count INTEGER DEFAULT 0,
        is_trending BOOLEAN DEFAULT FALSE,
        is_featured BOOLEAN DEFAULT FALSE,
        placeholder_config JSONB DEFAULT '{}'::jsonb,
        tags TEXT[] DEFAULT ARRAY[]::TEXT[],
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)

    // Add foreign key constraint separately
    await client.query(`
      ALTER TABLE campaigns 
      DROP CONSTRAINT IF EXISTS campaigns_creator_id_fkey
    `)
    await client.query(`
      ALTER TABLE campaigns 
      ADD CONSTRAINT campaigns_creator_id_fkey 
      FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE SET NULL
    `)

    // Create categories table
    console.log("📂 Creating categories table...")
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        icon_url VARCHAR(500),
        banner_count INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)

    // Create generated_banners table
    console.log("🖼️ Creating generated_banners table...")
    await client.query(`
      CREATE TABLE IF NOT EXISTS generated_banners (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        campaign_id UUID,
        user_name VARCHAR(255),
        user_photo_url VARCHAR(500),
        generated_banner_url VARCHAR(500),
        is_public BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)

    // Add foreign key constraint
    await client.query(`
      ALTER TABLE generated_banners 
      DROP CONSTRAINT IF EXISTS generated_banners_campaign_id_fkey
    `)
    await client.query(`
      ALTER TABLE generated_banners 
      ADD CONSTRAINT generated_banners_campaign_id_fkey 
      FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
    `)

    // Create comments table
    console.log("💬 Creating comments table...")
    await client.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        campaign_id UUID,
        user_id UUID,
        parent_id UUID,
        content TEXT NOT NULL,
        likes_count INTEGER DEFAULT 0,
        is_deleted BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)

    // Add foreign key constraints for comments
    await client.query(`
      ALTER TABLE comments 
      DROP CONSTRAINT IF EXISTS comments_campaign_id_fkey,
      DROP CONSTRAINT IF EXISTS comments_user_id_fkey,
      DROP CONSTRAINT IF EXISTS comments_parent_id_fkey
    `)
    await client.query(`
      ALTER TABLE comments 
      ADD CONSTRAINT comments_campaign_id_fkey 
      FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
    `)
    await client.query(`
      ALTER TABLE comments 
      ADD CONSTRAINT comments_user_id_fkey 
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    `)
    await client.query(`
      ALTER TABLE comments 
      ADD CONSTRAINT comments_parent_id_fkey 
      FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
    `)

    // Create indexes
    console.log("🔍 Creating indexes...")
    const indexes = [
      "CREATE INDEX IF NOT EXISTS idx_campaigns_category ON campaigns(category)",
      "CREATE INDEX IF NOT EXISTS idx_campaigns_trending ON campaigns(is_trending)",
      "CREATE INDEX IF NOT EXISTS idx_campaigns_created_at ON campaigns(created_at)",
      "CREATE INDEX IF NOT EXISTS idx_campaigns_view_count ON campaigns(view_count)",
      "CREATE INDEX IF NOT EXISTS idx_generated_banners_campaign_id ON generated_banners(campaign_id)",
      "CREATE INDEX IF NOT EXISTS idx_generated_banners_created_at ON generated_banners(created_at)",
      "CREATE INDEX IF NOT EXISTS idx_comments_campaign_id ON comments(campaign_id)",
      "CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id)",
      "CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)",
    ]

    for (const indexQuery of indexes) {
      await client.query(indexQuery)
    }

    // Create trigger function
    console.log("⚡ Creating trigger function...")
    await client.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
      END;
      $$ language 'plpgsql'
    `)

    // Create triggers
    const triggers = [
      "DROP TRIGGER IF EXISTS update_users_updated_at ON users",
      "CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()",
      "DROP TRIGGER IF EXISTS update_campaigns_updated_at ON campaigns",
      "CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()",
      "DROP TRIGGER IF EXISTS update_comments_updated_at ON comments",
      "CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()",
    ]

    for (const triggerQuery of triggers) {
      await client.query(triggerQuery)
    }

    // Insert admin user
    console.log("👤 Creating admin user...")
    await client.query(`
      INSERT INTO users (email, password, role) 
      VALUES ('admin@alika.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3QJL9.KeF2', 'admin')
      ON CONFLICT (email) DO NOTHING
    `)

    // Insert categories
    console.log("📁 Inserting categories...")
    const categories = [
      ["Education", "Educational events and campaigns", "/icons/education.svg"],
      ["Technology", "Tech events and conferences", "/icons/tech.svg"],
      ["Music", "Music festivals and concerts", "/icons/music.svg"],
      ["Business", "Business and corporate events", "/icons/business.svg"],
      ["Sports", "Sports events and competitions", "/icons/sports.svg"],
      ["Food", "Food festivals and culinary events", "/icons/food.svg"],
      ["Art", "Art exhibitions and creative events", "/icons/art.svg"],
      ["Health", "Health and wellness campaigns", "/icons/health.svg"],
    ]

    for (const [name, description, icon_url] of categories) {
      await client.query(
        "INSERT INTO categories (name, description, icon_url) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING",
        [name, description, icon_url],
      )
    }

    // Get admin user ID
    const adminResult = await client.query("SELECT id FROM users WHERE email = 'admin@alika.com'")
    const adminId = adminResult.rows[0]?.id

    if (adminId) {
      console.log("📋 Inserting sample campaigns...")

      const campaigns = [
        [
          "Cracking the Code 1.0",
          "University Life Career Launch & Beyond - Join us for an intensive workshop designed to help students transition from university life to successful careers.",
          "Education",
          "/templates/cracking-code.png",
          adminId,
          true,
          '{"photoArea": {"x": 450, "y": 150, "width": 120, "height": 120, "shape": "circle"}, "textArea": {"x": 200, "y": 300, "width": 200, "height": 40}}',
          ["Education", "Career", "University", "Workshop"],
        ],
        [
          "Summer Music Festival 2024",
          "Join us for the biggest music celebration of the year! Featuring top artists, food trucks, and an unforgettable experience under the stars.",
          "Music",
          "/templates/music-festival.png",
          adminId,
          true,
          '{"photoArea": {"x": 400, "y": 200, "width": 100, "height": 100, "shape": "circle"}, "textArea": {"x": 150, "y": 350, "width": 300, "height": 50}}',
          ["Music", "Festival", "Summer", "Entertainment"],
        ],
        [
          "Tech Conference 2024",
          "Innovation and Technology Summit - Connect with industry leaders, learn about cutting-edge technologies, and network with fellow tech enthusiasts.",
          "Technology",
          "/templates/tech-conference.png",
          adminId,
          false,
          '{"photoArea": {"x": 500, "y": 100, "width": 80, "height": 80, "shape": "circle"}, "textArea": {"x": 100, "y": 250, "width": 400, "height": 40}}',
          ["Technology", "Conference", "Innovation", "Networking"],
        ],
        [
          "Business Networking Event",
          "Connect with industry leaders and expand your professional network. Perfect for entrepreneurs, executives, and business professionals.",
          "Business",
          "/templates/business-networking.png",
          adminId,
          false,
          '{"photoArea": {"x": 350, "y": 180, "width": 90, "height": 90, "shape": "circle"}, "textArea": {"x": 200, "y": 320, "width": 200, "height": 35}}',
          ["Business", "Networking", "Professional", "Entrepreneurs"],
        ],
      ]

      for (const [
        title,
        description,
        category,
        template_url,
        creator_id,
        is_trending,
        placeholder_config,
        tags,
      ] of campaigns) {
        await client.query(
          `INSERT INTO campaigns (title, description, category, template_url, creator_id, is_trending, placeholder_config, tags)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT DO NOTHING`,
          [title, description, category, template_url, creator_id, is_trending, placeholder_config, tags],
        )
      }

      // Update view counts
      console.log("📊 Updating view counts...")
      await client.query("UPDATE campaigns SET view_count = 1250 WHERE title = 'Cracking the Code 1.0'")
      await client.query("UPDATE campaigns SET view_count = 890 WHERE title = 'Summer Music Festival 2024'")
      await client.query("UPDATE campaigns SET view_count = 2100 WHERE title = 'Tech Conference 2024'")
      await client.query("UPDATE campaigns SET view_count = 650 WHERE title = 'Business Networking Event'")
    }

    // Update category counts
    console.log("🔢 Updating category counts...")
    await client.query(`
      UPDATE categories SET banner_count = (
        SELECT COUNT(*) FROM campaigns WHERE category = categories.name
      )
    `)

    console.log("\n✅ Database initialization completed successfully!")
    console.log("📊 Created tables: users, campaigns, generated_banners, categories, comments")
    console.log("🔐 Admin user: admin@alika.com (password: admin123)")
    console.log("📋 Sample campaigns: 4")
    console.log("📁 Categories: 8")
  } catch (error) {
    console.error("❌ Database initialization failed:")
    console.error("Error:", error.message)
    console.error("Stack:", error.stack)
    throw error
  } finally {
    if (client) {
      client.release()
    }
    await pool.end()
  }
}

// Run the initialization
initializeDatabase()
  .then(() => {
    console.log("🎉 All done!")
    process.exit(0)
  })
  .catch((error) => {
    console.error("💥 Fatal error:", error.message)
    process.exit(1)
  })
