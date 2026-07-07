import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Title from "../components/Title";
import { useState } from "react";
import { Button } from "react-native";
import ShoppingInput from "../components/ShoppingInput";
import ShoppingList from "../components/ShoppingList";
import type { ShoppingItem } from "../types/ShoppingItem";

export default function HomeScreen() {

    const [title, setTitle] = useState("My Shopping List");
    const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
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

  return (
    <View style={styles.container}>
      <Title text={title} />
      <ShoppingInput 
        onAddItem={addItem}
      />
      <ShoppingList items={shoppingItems} onDelete={(id: string) => {
        const updatedItems = shoppingItems.filter(i => i.id !== id);
        setShoppingItems(updatedItems);
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
