import { useState, useEffect } from "react";
import type { ShoppingItem } from "../types/ShoppingItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useShoppingList() {
    const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
    const [storageAvailable, setStorageAvailable] = useState(false);
    
    const addItem = (name: string) => {
        const newItem: ShoppingItem = {
            id: Date.now().toString(),
            name,
            completed: false,
        };
        setShoppingItems([...shoppingItems, newItem]);
    };

    const deleteItem = (id: string) => {
        setShoppingItems(
            shoppingItems.filter(item => item.id !== id)
        );
    };

    const updateItem = (id: string, newName: string) => {
        setShoppingItems(
            shoppingItems.map(item =>
                item.id === id ? { ...item, name: newName } : item
            )
        );
    };

    const toggleComplete = (id: string) => {
        setShoppingItems(
            shoppingItems.map(item =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    };

    const saveItems = async (items: ShoppingItem[]) => {
        if (!storageAvailable) return;
        try {
            await AsyncStorage.setItem(
                "shoppingItems",
                JSON.stringify(items)
            );
        } catch (error) {
            console.warn("Failed to save items to AsyncStorage:", error);
        }
    };

    const loadItems = async () => {
        try {
            const value = await AsyncStorage.getItem("shoppingItems");
            if (value) {
                setShoppingItems(JSON.parse(value));
                setStorageAvailable(true);
            }
        } catch (error) {
            console.warn("Failed to load items from AsyncStorage:", error);
            setStorageAvailable(false);
        }
    };

    useEffect(() => {
        loadItems();
    }, []);

    useEffect(() => {
        saveItems(shoppingItems);
    }, [shoppingItems, storageAvailable]);

    return {
        shoppingItems,
        addItem,
        deleteItem,
        updateItem,
        toggleComplete,
    };
}