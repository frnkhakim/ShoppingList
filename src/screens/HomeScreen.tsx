import React from 'react';
import { View, StyleSheet } from 'react-native';
import Title from "../components/Title";
import ShoppingInput from "../components/ShoppingInput";
import ShoppingList from "../components/ShoppingList";
import { useShoppingList } from "../hooks/useShoppingList";

export default function HomeScreen() {

    const {
        shoppingItems,
        addItem,
        deleteItem,
    } = useShoppingList();

    return (
        <View style={styles.container}>
            <Title text="My Shopping List" />
            <ShoppingInput 
                onAddItem={addItem}
            />
            <ShoppingList items={shoppingItems} onDelete={deleteItem} />
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
