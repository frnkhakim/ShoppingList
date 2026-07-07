import { useState } from "react";
import type { ShoppingItem } from "../types/ShoppingItem";

export function useShoppingList() {
    const [shoppingItems, setShoppingItems] =
        useState<ShoppingItem[]>([]);

    const addItem = (name: string) => {
        const newItem: ShoppingItem = {
            id: Date.now().toString(),
            name,
        };

        setShoppingItems([
            ...shoppingItems,
            newItem,
        ]);
    };

    const deleteItem = (id: string) => {
        setShoppingItems(
            shoppingItems.filter(
                item => item.id !== id
            )
        );
    };

    return {
        shoppingItems,
        addItem,
        deleteItem,
    };
}