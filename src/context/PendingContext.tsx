import { createContext, useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { callShoppingList } from "@/components/firebase/callShopingList";
import Product from "@/type/Product";
import { auth } from "@/firebase";

export const PendingContext = createContext<{
  productList: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  clearProduct: () => void;
  getProduct: (id: string) => Product | undefined;
  calcPrice: () => number;
} | null>(null);

export const PendingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const fetchProducts = async () => {
    return await callShoppingList(auth.currentUser?.uid ?? "");
  };

  const { data: productList = [], refetch } = useQuery(
    "products",
    fetchProducts
  );

  const [localProductList, setLocalProductList] = useState<Product[]>([]);

  useEffect(() => {
    setLocalProductList(productList);
  }, [productList.length]); // Include 'productList' in the dependency array.

  const addProduct = useCallback((product: Product) => {
    setLocalProductList((prev) => [...prev, product]);
  }, []);

  const removeProduct = useCallback((id: string) => {
    setLocalProductList((prev) => prev.filter((product) => product.id !== id));
  }, []);

  const clearProduct = useCallback(() => {
    refetch();
  }, [refetch]);

  const getProduct = useCallback(
    (id: string) => {
      return localProductList.find((product) => product.id === id);
    },
    [localProductList]
  );

  const calcPrice = useCallback(() => {
    return localProductList.reduce(
      (acc, product) => acc + Number(product.productPrice),
      0
    );
  }, [localProductList]);

  return (
    <PendingContext.Provider
      value={{
        productList: localProductList,
        addProduct,
        removeProduct,
        clearProduct,
        getProduct,
        calcPrice,
      }}
    >
      {children}
    </PendingContext.Provider>
  );
};
