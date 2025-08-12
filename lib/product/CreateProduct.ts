"use server";
import { Category, GeologicalPeriod, PrismaClient } from "../generated/prisma";
import { z } from "zod";

const prisma = new PrismaClient();

// Schéma de validation avec zod
const productSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  category: z.enum(Category),
  genre: z.string().min(1, "Le genre est requis"),
  species: z.string().min(1, "L'espèce est requise"),
  price: z.number().positive("Le prix doit être positif"),
  countryOfOrigin: z.string().min(1, "Le pays d'origine est requis"),
  locality: z.string().min(1, "La localité est requise"),
  geologicalPeriod: z.enum(GeologicalPeriod),
  geologicalStage: z.string().min(1, "L'étage géologique est requis"),
});

export async function createProductAction(data: unknown) {
  console.log("Données reçues :", data); // Log pour déboguer

  try {
    // Valider les données avec zod
    const validatedData = productSchema.parse(data);

    // Créer le produit dans la base de données
    const product = await prisma.product.create({
      data: validatedData,
    });

    // Convertir les champs de type Decimal en types natifs
    const productWithNativeTypes = {
      ...product,
      price: product.price.toNumber(), // Convertir Decimal en number
    };

    console.log("Produit créé :", productWithNativeTypes); // Log pour confirmer la création
    return productWithNativeTypes;
  } catch (error) {
    console.error("Erreur lors de la création du produit :", error);
    throw error; // Relancer l'erreur pour la gestion côté client
  }
}
