import { createContext, useState, useCallback, useEffect } from "react";
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
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await callShoppingList(auth.currentUser?.uid ?? "");
      setProductList(products);
    };

    fetchProducts();
  }, []);

  const addProduct = useCallback((product: Product) => {
    setProductList((prevList) => [...prevList, product]);
  }, []);

  const removeProduct = useCallback((id: string) => {
    setProductList((prevList) =>
      prevList.filter((product) => product.id !== id)
    );
  }, []);

  const clearProduct = useCallback(() => {
    setProductList([]);
  }, []);

  const getProduct = useCallback(
    (id: string) => {
      return productList.find((product) => product.id === id);
    },
    [productList]
  );

  const calcPrice = useCallback(() => {
    return productList.reduce(
      (acc, product) => acc + Number(product.productPrice),
      0
    );
  }, [productList]);

  return (
    <PendingContext.Provider
      value={{
        productList,
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
