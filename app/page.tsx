"use client";

import { Button } from "@/components/ui/button";
import { useBearStore } from "../components/ZustandStore";
import ProductForm from "@/components/CreateProductForm";

export default function Home() {
  const { bears, increase } = useBearStore();

  const resetBears = () => {
    useBearStore.setState({ bears: 0 });
  };

  const decreaseBears = (by: number) => {
    useBearStore.setState((state) => ({ bears: state.bears - by }));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Compteur de Bears: {bears}</h1>
      <Button onClick={() => increase(1)}>Augmenter de 1</Button>
      <Button onClick={() => decreaseBears(1)}>Diminuer de 1</Button>
      <Button onClick={resetBears}>Remettre à 0</Button>

      <hr style={{ margin: "20px 0" }} />

      <h2>Créer un produit</h2>
      <ProductForm />
    </div>
  );
}
