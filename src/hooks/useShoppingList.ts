import { useState,useEffect } from "react";
import type { ShoppingItem } from "../types/ShoppingItem";
import AsyncStorage from "@react-native-async-storage/async-storage";


export function useShoppingList() {
    const [shoppingItems, setShoppingItems] =
        useState<ShoppingItem[]>([]);
    
   const addItem = async (
    name: string
    ) => {
        const newItem = {
            id: Date.now().toString(),
            name,
        };

        const updatedItems = [
            ...shoppingItems,
            newItem,
        ];

        setShoppingItems(updatedItems);

        await saveItems(updatedItems);
    };

    const deleteItem = async (id: string) => {
        const updatedItems = shoppingItems.filter(
            item => item.id !== id
        );
        setShoppingItems(updatedItems);
        await saveItems(updatedItems);
    };
    const loadItems = async () => {
    try {
        const value =
            await AsyncStorage.getItem(
                "shoppingItems"
            );

        if (value) {
            setShoppingItems(
                JSON.parse(value)
            );
        }
    } catch (error) {
        console.error(error);
    }

    useEffect(() => {
    loadItems();
    }, []);
    };

    const saveItems = async (
    items: ShoppingItem[]
    ) => {
        try {
            await AsyncStorage.setItem(
                "shoppingItems",
                JSON.stringify(items)
            );
        } catch (error) {
            console.error(error);
        }
    };

    return {
        shoppingItems,
        addItem,
        deleteItem,
    };
}