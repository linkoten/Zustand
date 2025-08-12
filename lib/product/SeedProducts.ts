const {
  PrismaClient,
  Category,
  GeologicalPeriod,
} = require("../generated/prisma");

const prisma = new PrismaClient();

async function clearUsers() {
  try {
    console.log("🗑️ Suppression de tous les utilisateurs...");

    const result = await prisma.user.deleteMany({});

    console.log(`✅ ${result.count} utilisateurs supprimés avec succès`);
  } catch (error) {
    console.error("❌ Erreur lors de la suppression :", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearUsers();
