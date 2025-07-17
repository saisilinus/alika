const { MongoClient, ObjectId } = require("mongodb");
const { loadEnvConfig } = require("@next/env");

const projectDir = process.cwd();
loadEnvConfig(projectDir);

if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI environment variable is not set");
    process.exit(1);
}

async function initDatabase() {
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("alika");

        // Create indexes
        console.log("Creating indexes...");

        await db
            .collection("users")
            .createIndex({ email: 1 }, { unique: true });
        await db.collection("campaigns").createIndex({ category: 1 });
        await db.collection("campaigns").createIndex({ tags: 1 });
        await db.collection("campaigns").createIndex({ createdAt: -1 });
        await db.collection("campaigns").createIndex({ viewCount: -1 });
        await db.collection("campaigns").createIndex({ downloadCount: -1 });
        await db.collection("campaigns").createIndex({ isActive: 1 });
        await db.collection("generatedBanners").createIndex({ campaignId: 1 });
        await db.collection("generatedBanners").createIndex({ userId: 1 });
        await db.collection("comments").createIndex({ campaignId: 1 });
        await db.collection("comments").createIndex({ createdAt: -1 });
        await db.collection("comments").createIndex({ isApproved: 1 });

        console.log("Indexes created successfully");

        // Insert sample data
        console.log("Inserting sample data...");

        // Create admin user
        const adminUserId = new ObjectId();
        const adminUser = {
            _id: adminUserId,
            name: "Admin User",
            email: "admin@alika.com",
            image: "/placeholder-user.jpg",
            role: "admin",
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
        };

        await db
            .collection("users")
            .updateOne(
                { email: adminUser.email },
                { $setOnInsert: adminUser },
                { upsert: true }
            );

        // Create sample users
        const user1Id = new ObjectId();
        const user2Id = new ObjectId();
        const user3Id = new ObjectId();

        const sampleUsers = [
            {
                _id: user1Id,
                name: "John Designer",
                email: "john@example.com",
                image: "/placeholder-user.jpg",
                role: "user",
                createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
                updatedAt: new Date(),
                isActive: true,
            },
            {
                _id: user2Id,
                name: "Sarah Creative",
                email: "sarah@example.com",
                image: "/placeholder-user.jpg",
                role: "user",
                createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
                updatedAt: new Date(),
                isActive: true,
            },
            {
                _id: user3Id,
                name: "Mike Marketer",
                email: "mike@example.com",
                image: "/placeholder-user.jpg",
                role: "moderator",
                createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
                updatedAt: new Date(),
                isActive: true,
            },
        ];

        for (const user of sampleUsers) {
            await db
                .collection("users")
                .updateOne(
                    { email: user.email },
                    { $setOnInsert: user },
                    { upsert: true }
                );
        }

        // Sample campaigns with updated structure
        const campaign1Id = new ObjectId();
        const campaign2Id = new ObjectId();
        const campaign3Id = new ObjectId();
        const campaign4Id = new ObjectId();
        const campaign5Id = new ObjectId();
        const campaign6Id = new ObjectId();

        const sampleCampaigns = [
            // Trending campaigns (high view counts)
            {
                _id: campaign1Id,
                title: "Summer Sale Banner",
                description:
                    "Bright and colorful summer sale banner template perfect for retail promotions. Features vibrant colors and eye-catching design elements.",
                imageUrl: "/placeholder.svg?height=400&width=800",
                templateUrl: "/placeholder.svg?height=400&width=800",
                category: "sales",
                tags: ["summer", "sale", "colorful", "retail", "promotion"],
                createdBy: adminUserId,
                createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
                updatedAt: new Date(),
                viewCount: 1250,
                downloadCount: 345,
                isActive: true,
                isTrending: true,
                isFeatured: true,
                placeholderConfig: {
                    textAreas: [
                        {
                            id: "main-text",
                            x: 50,
                            y: 100,
                            width: 300,
                            height: 80,
                            placeholder: "Enter your sale text",
                        },
                        {
                            id: "discount-text",
                            x: 400,
                            y: 150,
                            width: 200,
                            height: 60,
                            placeholder: "Discount percentage",
                        },
                    ],
                    imageAreas: [
                        {
                            id: "product-image",
                            x: 600,
                            y: 50,
                            width: 150,
                            height: 150,
                            placeholder: "Upload product image",
                        },
                    ],
                },
            },
            {
                _id: campaign2Id,
                title: "Tech Conference 2024",
                description:
                    "Professional banner template for technology conferences and tech events. Clean, modern design with space for speaker photos and event details.",
                imageUrl: "/placeholder.svg?height=400&width=800",
                templateUrl: "/placeholder.svg?height=400&width=800",
                category: "events",
                tags: ["tech", "conference", "professional", "modern", "2024"],
                createdBy: user1Id,
                createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000), // 18 days ago
                updatedAt: new Date(),
                viewCount: 890,
                downloadCount: 234,
                isActive: true,
                isTrending: true,
                placeholderConfig: {
                    textAreas: [
                        {
                            id: "event-title",
                            x: 100,
                            y: 50,
                            width: 400,
                            height: 60,
                            placeholder: "Conference Title",
                        },
                        {
                            id: "event-date",
                            x: 100,
                            y: 120,
                            width: 300,
                            height: 40,
                            placeholder: "Event Date & Location",
                        },
                    ],
                    imageAreas: [
                        {
                            id: "speaker-photo",
                            x: 550,
                            y: 80,
                            width: 120,
                            height: 120,
                            placeholder: "Speaker photo",
                        },
                    ],
                },
            },
            {
                _id: campaign3Id,
                title: "Food Delivery Promo",
                description:
                    "Appetizing banner for food delivery promotions and restaurant marketing. Designed to make viewers hungry and drive orders.",
                imageUrl: "/placeholder.svg?height=400&width=800",
                templateUrl: "/placeholder.svg?height=400&width=800",
                category: "food",
                tags: ["food", "delivery", "promo", "restaurant", "hungry"],
                createdBy: user2Id,
                createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
                updatedAt: new Date(),
                viewCount: 1450,
                downloadCount: 567,
                isActive: true,
                isTrending: true,
                isFeatured: true,
                placeholderConfig: {
                    textAreas: [
                        {
                            id: "offer-text",
                            x: 50,
                            y: 80,
                            width: 350,
                            height: 100,
                            placeholder: "Special offer text",
                        },
                    ],
                    imageAreas: [
                        {
                            id: "food-image",
                            x: 450,
                            y: 50,
                            width: 300,
                            height: 200,
                            placeholder: "Delicious food photo",
                        },
                    ],
                },
            },
            // Latest campaigns (recent creation dates)
            {
                _id: campaign4Id,
                title: "Black Friday Mega Sale",
                description:
                    "High-impact Black Friday sale banner with bold typography and dramatic colors. Perfect for maximum conversion during the biggest shopping event.",
                imageUrl: "/placeholder.svg?height=400&width=800",
                templateUrl: "/placeholder.svg?height=400&width=800",
                category: "sales",
                tags: [
                    "black-friday",
                    "mega-sale",
                    "shopping",
                    "deals",
                    "dramatic",
                ],
                createdBy: user3Id,
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                updatedAt: new Date(),
                viewCount: 234,
                downloadCount: 45,
                isActive: true,
                placeholderConfig: {
                    textAreas: [
                        {
                            id: "sale-title",
                            x: 100,
                            y: 60,
                            width: 600,
                            height: 80,
                            placeholder: "BLACK FRIDAY SALE",
                        },
                        {
                            id: "discount-amount",
                            x: 200,
                            y: 160,
                            width: 400,
                            height: 120,
                            placeholder: "UP TO 70% OFF",
                        },
                    ],
                    imageAreas: [],
                },
            },
            {
                _id: campaign5Id,
                title: "Fitness Challenge 2024",
                description:
                    "Motivational fitness banner for gym promotions and workout challenges. Energetic design to inspire action and healthy lifestyle choices.",
                imageUrl: "/placeholder.svg?height=400&width=800",
                templateUrl: "/placeholder.svg?height=400&width=800",
                category: "fitness",
                tags: [
                    "fitness",
                    "challenge",
                    "gym",
                    "workout",
                    "motivation",
                    "2024",
                ],
                createdBy: adminUserId,
                createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
                updatedAt: new Date(),
                viewCount: 156,
                downloadCount: 23,
                isActive: true,
                placeholderConfig: {
                    textAreas: [
                        {
                            id: "challenge-title",
                            x: 50,
                            y: 100,
                            width: 400,
                            height: 60,
                            placeholder: "Challenge Name",
                        },
                        {
                            id: "motivation-text",
                            x: 50,
                            y: 180,
                            width: 350,
                            height: 80,
                            placeholder: "Motivational message",
                        },
                    ],
                    imageAreas: [
                        {
                            id: "fitness-image",
                            x: 500,
                            y: 80,
                            width: 250,
                            height: 180,
                            placeholder: "Fitness photo",
                        },
                    ],
                },
            },
            {
                _id: campaign6Id,
                title: "Holiday Gift Guide",
                description:
                    "Festive holiday banner template for gift promotions and seasonal marketing. Warm, inviting design perfect for the holiday shopping season.",
                imageUrl: "/placeholder.svg?height=400&width=800",
                templateUrl: "/placeholder.svg?height=400&width=800",
                category: "holidays",
                tags: [
                    "holiday",
                    "gifts",
                    "christmas",
                    "festive",
                    "shopping",
                    "seasonal",
                ],
                createdBy: user1Id,
                createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
                updatedAt: new Date(),
                viewCount: 89,
                downloadCount: 12,
                isActive: true,
                placeholderConfig: {
                    textAreas: [
                        {
                            id: "holiday-greeting",
                            x: 100,
                            y: 50,
                            width: 300,
                            height: 50,
                            placeholder: "Holiday greeting",
                        },
                        {
                            id: "gift-offer",
                            x: 100,
                            y: 120,
                            width: 400,
                            height: 80,
                            placeholder: "Gift offer details",
                        },
                    ],
                    imageAreas: [
                        {
                            id: "gift-image",
                            x: 550,
                            y: 60,
                            width: 180,
                            height: 180,
                            placeholder: "Gift photo",
                        },
                    ],
                },
            },
        ];

        await db.collection("campaigns").insertMany(sampleCampaigns);

        // Sample generated banners
        const sampleBanners = [
            {
                _id: new ObjectId(),
                campaignId: campaign1Id,
                userId: user1Id,
                imageUrl: "/generated-banner-1.jpg",
                customizations: {
                    text: "50% OFF Summer Collection",
                    photo: "/user-product-1.jpg",
                    colors: ["#FF6B6B", "#4ECDC4"],
                    fonts: ["Arial", "Helvetica"],
                    positioning: {
                        textX: 50,
                        textY: 100,
                        photoX: 600,
                        photoY: 50,
                    },
                },
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                downloadCount: 15,
            },
            {
                _id: new ObjectId(),
                campaignId: campaign2Id,
                userId: user2Id,
                imageUrl: "/generated-banner-2.jpg",
                customizations: {
                    text: "AI Summit 2024 - Join Us!",
                    photo: "/speaker-photo.jpg",
                    colors: ["#2C3E50", "#3498DB"],
                    fonts: ["Roboto", "Open Sans"],
                },
                createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                downloadCount: 8,
            },
            {
                _id: new ObjectId(),
                campaignId: campaign3Id,
                userId: user3Id,
                imageUrl: "/generated-banner-3.jpg",
                customizations: {
                    text: "Free Delivery on Orders Over $25",
                    photo: "/delicious-pizza.jpg",
                    colors: ["#E74C3C", "#F39C12"],
                },
                createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                downloadCount: 22,
            },
        ];

        await db.collection("generatedBanners").insertMany(sampleBanners);

        // Sample comments
        const sampleComments = [
            {
                _id: new ObjectId(),
                campaignId: campaign1Id,
                userId: user1Id,
                content:
                    "This template is perfect for our summer campaign! Love the vibrant colors.",
                createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                isApproved: true,
                likes: 12,
                likedBy: [user2Id, user3Id, adminUserId],
            },
            {
                _id: new ObjectId(),
                campaignId: campaign1Id,
                userId: user2Id,
                content:
                    "Great design! Could you add more text customization options?",
                createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
                isApproved: true,
                likes: 5,
                likedBy: [user1Id, adminUserId],
            },
            {
                _id: new ObjectId(),
                campaignId: campaign2Id,
                userId: user3Id,
                content:
                    "Professional and clean design. Perfect for our tech conference!",
                createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
                isApproved: true,
                likes: 8,
                likedBy: [user1Id, user2Id],
            },
            {
                _id: new ObjectId(),
                campaignId: campaign3Id,
                userId: adminUserId,
                content:
                    "This template has been very popular with our restaurant clients. Excellent work!",
                createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                isApproved: true,
                likes: 15,
                likedBy: [user1Id, user2Id, user3Id],
            },
            {
                _id: new ObjectId(),
                campaignId: campaign4Id,
                userId: user1Id,
                content:
                    "Just what we needed for Black Friday! The bold design really stands out.",
                createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                isApproved: true,
                likes: 3,
                likedBy: [user2Id],
            },
        ];

        await db.collection("comments").insertMany(sampleComments);

        console.log("Sample data inserted successfully");
        console.log("\n=== Database Initialization Summary ===");
        console.log(
            `✅ Created ${sampleUsers.length + 1} users (including admin)`
        );
        console.log(`✅ Created ${sampleCampaigns.length} campaigns`);
        console.log(
            `   - ${
                sampleCampaigns.filter((c) => c.isTrending).length
            } trending campaigns`
        );
        console.log(
            `   - ${
                sampleCampaigns.filter(
                    (c) =>
                        c.createdAt >
                        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                ).length
            } latest campaigns (last 7 days)`
        );
        console.log(
            `   - ${
                sampleCampaigns.filter((c) => c.isFeatured).length
            } featured campaigns`
        );
        console.log(`✅ Created ${sampleBanners.length} generated banners`);
        console.log(`✅ Created ${sampleComments.length} comments`);
        console.log("\n=== Campaign Categories ===");

        const categories = [...new Set(sampleCampaigns.map((c) => c.category))];
        categories.forEach((category) => {
            const count = sampleCampaigns.filter(
                (c) => c.category === category
            ).length;
            console.log(`   - ${category}: ${count} campaigns`);
        });

        console.log("\n=== View & Download Stats ===");
        const totalViews = sampleCampaigns.reduce(
            (sum, c) => sum + c.viewCount,
            0
        );
        const totalDownloads = sampleCampaigns.reduce(
            (sum, c) => sum + c.downloadCount,
            0
        );
        console.log(`   - Total views: ${totalViews.toLocaleString()}`);
        console.log(`   - Total downloads: ${totalDownloads.toLocaleString()}`);

        console.log("\nDatabase initialization completed successfully! 🎉");
    } catch (error) {
        console.error("Error initializing database:", error);
        process.exit(1);
    } finally {
        await client.close();
    }
}

initDatabase();
