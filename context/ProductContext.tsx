import { createContext, useState } from 'react';

export type Produto = {
  codigoBarras: string;
  nome: string;
  tipo: 'bebida' | 'alimento';
  preco: string;
  quantidade: string;
  foto?: string;
  dataCadastro: string;
  vendidos?: number;
};

type ProductContextType = {
  products: Produto[];
  addProduct: (p: Produto) => void;
  updateProduct: (codigoBarras: string, data: Partial<Produto>) => void;
  venderProduto: (codigoBarras: string, quantidade: number) => void;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  addProduct: () => {},
  updateProduct: () => {},
  venderProduto: () => {},
});

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Produto[]>([]);

  function addProduct(p: Produto) {
    setProducts((prev) => [...prev, { ...p, vendidos: 0 }]);
  }

  function updateProduct(codigoBarras: string, data: Partial<Produto>) {
    setProducts((prev) =>
      prev.map((p) => (p.codigoBarras === codigoBarras ? { ...p, ...data } : p))
    );
  }

  function venderProduto(codigoBarras: string, quantidade: number) {
    setProducts((prev) =>
      prev.map((p) =>
        p.codigoBarras === codigoBarras
          ? {
              ...p,
              quantidade: String(Number(p.quantidade) - quantidade),
              vendidos: (p.vendidos ?? 0) + quantidade,
            }
          : p
      )
    );
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, venderProduto }}>
      {children}
    </ProductContext.Provider>
  );
}
