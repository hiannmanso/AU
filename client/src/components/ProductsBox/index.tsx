import React from "react";
import { Product, ProductsBoxProps } from "@/interfaces/Product.interface";

function ProductsBox({
  productsData,
  selectedProductMenuData,
  setSelectedProductMenuData,
  disable,
}: ProductsBoxProps) {
  function isProductSelected(productId: string): boolean {
    return selectedProductMenuData.includes(productId);
  }

  function toggleProductSelection(productId: string): void {
    if (disable) {
      return;
    }

    setSelectedProductMenuData((prevSelectedProductIds) => {
      if (prevSelectedProductIds.includes(productId)) {
        return prevSelectedProductIds.filter((id) => id !== productId);
      } else {
        return [...prevSelectedProductIds, productId];
      }
    });
  }

  return (
    <div className="px-4 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productsData.map((product: Product) => (
          <div
            key={product.id}
            className={`border overflow-hidden p-3 rounded-md cursor-pointer ${
              isProductSelected(product.id) ? "bg-blue-100" : "bg-white"
            }`}
            onClick={() => toggleProductSelection(product.id)}
            style={{ pointerEvents: disable ? "none" : "auto" }}
          >
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsBox;
