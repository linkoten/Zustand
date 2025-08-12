import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Récupérer tous les produits
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Convertir les prix Decimal en nombre pour Power BI
    const processedProducts = products.map((product) => ({
      id: product.id,
      title: product.title,
      category: product.category,
      genre: product.genre,
      species: product.species,
      price: product.price.toNumber(), // Convertir Decimal en number
      countryOfOrigin: product.countryOfOrigin,
      locality: product.locality,
      geologicalPeriod: product.geologicalPeriod,
      geologicalStage: product.geologicalStage,
      createdAt: product.createdAt.toISOString(), // Convertir Date en string
    }));

    return NextResponse.json({
      success: true,
      count: processedProducts.length,
      data: processedProducts,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la récupération des produits",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
