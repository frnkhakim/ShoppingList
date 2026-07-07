import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Title from "../components/title";
import { useState } from "react";
import { Button } from "react-native";
import ShoppingInput from "../components/ShoppingInput";

export default function HomeScreen() {

    const [title, setTitle] = useState("My Shopping List");
    const [shoppingItems, setShoppingItems] = useState<string[]>([]);
    const addItem = (item: string) => {
        setShoppingItems([...shoppingItems, item]);
    };

  return (
    <View style={styles.container}>
      <Title text={title} />
      <ShoppingInput 
        onAddItem={addItem}
      />
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
