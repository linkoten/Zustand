"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProductAction } from "@/lib/product/CreateProduct";
import { z } from "zod";

const productSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  category: z.string(),
  genre: z.string().min(1, "Le genre est requis"),
  species: z.string().min(1, "L'espèce est requise"),
  price: z.number().positive("Le prix doit être positif"),
  countryOfOrigin: z.string().min(1, "Le pays d'origine est requis"),
  locality: z.string().min(1, "La localité est requise"),
  geologicalPeriod: z.string(),
  geologicalStage: z.string().min(1, "L'étage géologique est requis"),
});

export default function CreateProductForm() {
  const [formData, setFormData] = useState({
    title: "",
    category: "TRILOBITE",
    genre: "",
    species: "",
    price: "",
    countryOfOrigin: "",
    locality: "",
    geologicalPeriod: "CAMBRIEN",
    geologicalStage: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Valider les données avec zod côté client
      productSchema.parse({
        ...formData,
        price: parseFloat(formData.price.replace(",", ".")), // Convertir le prix en nombre avec un point
      });

      // Appeler l'action serveur
      const product = await createProductAction({
        ...formData,
        price: parseFloat(formData.price.replace(",", ".")), // Convertir le prix en nombre avec un point
        category: formData.category.toUpperCase(), // Convertir en majuscules pour correspondre à l'enum Prisma
        geologicalPeriod: formData.geologicalPeriod.toUpperCase(), // Convertir en majuscules pour correspondre à l'enum Prisma
      });

      console.log("Produit créé :", product);
      setError(null);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
      } else {
        setError("Une erreur est survenue.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <Input
        name="title"
        placeholder="Titre"
        value={formData.title}
        onChange={handleChange}
      />

      <Select
        name="category"
        value={formData.category}
        onValueChange={(value) =>
          setFormData((prev) => ({ ...prev, category: value }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="TRILOBITE">Trilobite</SelectItem>
          <SelectItem value="AMMONITE">Ammonite</SelectItem>
          <SelectItem value="DENT">Dent</SelectItem>
          <SelectItem value="COQUILLAGE">Coquillage</SelectItem>
        </SelectContent>
      </Select>

      <Input
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
      />

      <Input
        name="species"
        placeholder="Espèce"
        value={formData.species}
        onChange={handleChange}
      />

      <Input
        name="price"
        type="text"
        placeholder="Prix"
        value={formData.price}
        onChange={handleChange}
      />

      <Input
        name="countryOfOrigin"
        placeholder="Pays d'origine"
        value={formData.countryOfOrigin}
        onChange={handleChange}
      />

      <Input
        name="locality"
        placeholder="Localité"
        value={formData.locality}
        onChange={handleChange}
      />

      <Select
        name="geologicalPeriod"
        value={formData.geologicalPeriod}
        onValueChange={(value) =>
          setFormData((prev) => ({ ...prev, geologicalPeriod: value }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Période géologique" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="CAMBRIEN">Cambrien</SelectItem>
          <SelectItem value="ORDOVICIEN">Ordovicien</SelectItem>
          <SelectItem value="SILURIEN">Silurien</SelectItem>
          <SelectItem value="DEVONIEN">Dévonien</SelectItem>
          <SelectItem value="CARBONIFERE">Carbonifère</SelectItem>
          <SelectItem value="PERMIEN">Permien</SelectItem>
          <SelectItem value="TRIASSIQUE">Triassique</SelectItem>
          <SelectItem value="JURASSIQUE">Jurassique</SelectItem>
          <SelectItem value="CRETACE">Crétacé</SelectItem>
          <SelectItem value="PALEOGENE">Paléogène</SelectItem>
          <SelectItem value="NEOGENE">Néogène</SelectItem>
          <SelectItem value="QUATERNAIRE">Quaternaire</SelectItem>
        </SelectContent>
      </Select>

      <Input
        name="geologicalStage"
        placeholder="Étage géologique"
        value={formData.geologicalStage}
        onChange={handleChange}
      />

      <Button type="submit">Créer le produit</Button>
    </form>
  );
}
