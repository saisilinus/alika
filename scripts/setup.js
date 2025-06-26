#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

console.log("🚀 Setting up Alika Platform...\n")

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
}

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function checkFile(filePath) {
  return fs.existsSync(filePath)
}

function copyEnvFile(source, destination) {
  if (!checkFile(destination)) {
    if (checkFile(source)) {
      fs.copyFileSync(source, destination)
      log(`✅ Created ${destination}`, "green")
      return true
    } else {
      log(`❌ Source file ${source} not found`, "red")
      return false
    }
  } else {
    log(`⚠️  ${destination} already exists, skipping`, "yellow")
    return true
  }
}

function runCommand(command, description) {
  try {
    log(`🔄 ${description}...`, "blue")
    execSync(command, { stdio: "inherit" })
    log(`✅ ${description} completed`, "green")
    return true
  } catch (error) {
    log(`❌ ${description} failed: ${error.message}`, "red")
    return false
  }
}

async function main() {
  log("📋 Setup Checklist:", "bright")

  // 1. Check Node.js version
  log("\n1. Checking Node.js version...", "cyan")
  const nodeVersion = process.version
  const majorVersion = Number.parseInt(nodeVersion.slice(1).split(".")[0])

  if (majorVersion >= 18) {
    log(`✅ Node.js ${nodeVersion} is supported`, "green")
  } else {
    log(`❌ Node.js ${nodeVersion} is not supported. Please upgrade to Node.js 18+`, "red")
    process.exit(1)
  }

  // 2. Install frontend dependencies
  log("\n2. Installing frontend dependencies...", "cyan")
  if (!runCommand("pnpm install", "Frontend dependency installation")) {
    log("❌ Failed to install frontend dependencies", "red")
    process.exit(1)
  }

  // 3. Setup environment files
  log("\n3. Setting up environment files...", "cyan")

  // Frontend environment
  const frontendEnvCreated = copyEnvFile(".env.example", ".env.local")

  // Backend environment
  const backendEnvCreated = copyEnvFile("server/.env.example", "server/.env")

  // 4. Install backend dependencies
  log("\n4. Installing backend dependencies...", "cyan")
  if (!runCommand("cd server && pnpm install", "Backend dependency installation")) {
    log("❌ Failed to install backend dependencies", "red")
    process.exit(1)
  }

  // 5. Create necessary directories
  log("\n5. Creating necessary directories...", "cyan")
  const directories = ["server/uploads", "server/temp", "server/logs"]

  directories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
      log(`✅ Created directory: ${dir}`, "green")
    } else {
      log(`⚠️  Directory already exists: ${dir}`, "yellow")
    }
  })

  // 6. Setup summary
  log("\n🎉 Setup completed!", "bright")
  log("\n📝 Next Steps:", "cyan")

  if (frontendEnvCreated || backendEnvCreated) {
    log("\n🔧 Environment Configuration:", "yellow")

    if (frontendEnvCreated) {
      log("   1. Edit .env.local and update:", "yellow")
      log("      - NEXT_PUBLIC_API_URL (default: http://localhost:5000/api)", "yellow")
      log("      - NEXT_PUBLIC_SUPABASE_URL", "yellow")
      log("      - NEXT_PUBLIC_SUPABASE_ANON_KEY", "yellow")
    }

    if (backendEnvCreated) {
      log("   2. Edit server/.env and update:", "yellow")
      log("      - DATABASE_URL (your Supabase database URL)", "yellow")
      log("      - JWT_ACCESS_SECRET (generate with: openssl rand -base64 32)", "yellow")
      log("      - JWT_REFRESH_SECRET (generate with: openssl rand -base64 32)", "yellow")
    }
  }

  log("\n🗄️  Database Setup:", "cyan")
  log("   1. Create a Supabase project at https://supabase.com", "cyan")
  log("   2. Get your database URL from Project Settings > Database", "cyan")
  log("   3. Update DATABASE_URL in server/.env", "cyan")
  log("   4. Run database initialization:", "cyan")
  log("      pnpm setup:db", "cyan")

  log("\n🚀 Start Development:", "green")
  log("   1. Start backend:  cd server && pnpm dev", "green")
  log("   2. Start frontend: pnpm dev", "green")
  log("   3. Open http://localhost:3000", "green")

  log("\n🔐 Default Admin Account:", "magenta")
  log("   Email: admin@alika.com", "magenta")
  log("   Password: admin123", "magenta")
  log("   ⚠️  Change this password in production!", "red")

  log("\n📚 Documentation:", "blue")
  log("   - README.md for detailed setup instructions", "blue")
  log("   - Visit /terminal for web-based database setup", "blue")
  log("   - Visit /admin for admin dashboard", "blue")

  log("\n✨ Happy coding!", "bright")
}

// Run setup
main().catch((error) => {
  log(`❌ Setup failed: ${error.message}`, "red")
  process.exit(1)
})
