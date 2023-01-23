import React from "react";

export const ProductTile = ({ product, handleRemoveProduct }) => {
    return (
        <li key={product.id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                <img
                    src={product.imgUrlMain}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <a href={product.href}>{product.name}</a>
                        </h3>
                        <p className="ml-4">${product.price.toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty: {product.qtyDesired}</p>
                    <div className="flex">
                        <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => handleRemoveProduct(product)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
};
