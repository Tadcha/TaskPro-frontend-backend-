// MongoDB initialization script for TaskPro
print("🚀 Initializing TaskPro database...");

// Switch to taskpro database
db = db.getSiblingDB("taskpro");

// Create collections with indexes
print("📋 Creating collections and indexes...");

// Users collection with indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: 1 });
print("✅ Users collection ready");

// Dashboards collection with indexes
db.dashboards.createIndex({ owner: 1 });
db.dashboards.createIndex({ createdAt: 1 });
db.dashboards.createIndex({ title: "text" });
print("✅ Dashboards collection ready");

// Columns collection with indexes
db.columns.createIndex({ dashboard: 1 });
db.columns.createIndex({ order: 1 });
print("✅ Columns collection ready");

// Cards collection with indexes
db.cards.createIndex({ column: 1 });
db.cards.createIndex({ owner: 1 });
db.cards.createIndex({ priority: 1 });
db.cards.createIndex({ deadline: 1 });
db.cards.createIndex({ title: "text", description: "text" });
print("✅ Cards collection ready");

// Insert sample data for development
print("📝 Inserting sample data...");

// Sample user (password: 'password123' hashed with bcrypt)
const sampleUser = {
  name: "Demo User",
  email: "demo@taskpro.com",
  password: "$2b$10$dXnU/7iTSgg9Ejgr/5jxou69BHjxTkzyoz0Ztn0B98ThVdZQbUpje",
  theme: "light",
  avatarURL: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const userResult = db.users.insertOne(sampleUser);
print(`✅ Sample user created with ID: ${userResult.insertedId}`);

// Sample dashboard
const sampleDashboard = {
  title: "Welcome to TaskPro",
  icon: "project",
  background: "default",
  owner: userResult.insertedId,
  columns: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const dashboardResult = db.dashboards.insertOne(sampleDashboard);
print(`✅ Sample dashboard created with ID: ${dashboardResult.insertedId}`);

// Sample columns
const columns = [
  {
    title: "To Do",
    dashboard: dashboardResult.insertedId,
    order: 0,
    cards: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "In Progress",
    dashboard: dashboardResult.insertedId,
    order: 1,
    cards: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Done",
    dashboard: dashboardResult.insertedId,
    order: 2,
    cards: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const columnResults = db.columns.insertMany(columns);
print(
  `✅ Sample columns created: ${Object.keys(columnResults.insertedIds).length}`
);

// Sample cards
const cards = [
  {
    title: "Setup Docker Environment",
    description: "Configure Docker containers for full-stack deployment",
    priority: "high",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    column: columnResults.insertedIds[2], // Done
    owner: userResult.insertedId,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Implement Authentication",
    description: "JWT-based authentication with refresh tokens",
    priority: "high",
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    column: columnResults.insertedIds[2], // Done
    owner: userResult.insertedId,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Create User Dashboard",
    description: "Build responsive kanban board interface",
    priority: "medium",
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    column: columnResults.insertedIds[1], // In Progress
    owner: userResult.insertedId,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Write Documentation",
    description: "Complete README and deployment guides",
    priority: "low",
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
    column: columnResults.insertedIds[0], // To Do
    owner: userResult.insertedId,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const cardResults = db.cards.insertMany(cards);
print(
  `✅ Sample cards created: ${Object.keys(cardResults.insertedIds).length}`
);

// Update dashboard with column references
db.dashboards.updateOne(
  { _id: dashboardResult.insertedId },
  { $set: { columns: Object.values(columnResults.insertedIds) } }
);

// Update columns with card references
Object.values(columnResults.insertedIds).forEach((columnId, index) => {
  const columnCards = Object.values(cardResults.insertedIds).filter(
    (_, cardIndex) => {
      return Math.floor(cardIndex / 2) === index;
    }
  );

  db.columns.updateOne({ _id: columnId }, { $set: { cards: columnCards } });
});

print("🎉 TaskPro database initialization completed successfully!");
print("📊 Database ready with sample data for development and testing");
print("👤 Demo user: demo@taskpro.com / password123");
