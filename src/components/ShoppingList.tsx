interface ShoppingListProps {
    items: string[];
}

import { View, Text } from "react-native";
import ShoppingItem from "./ShoppingItem";
import { FlatList } from "react-native";

export default function ShoppingList({
    items,
}: ShoppingListProps) {

    console.log(items);

    return (
       <FlatList
            data={items}
            renderItem={({ item }) => <ShoppingItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
        />
    );
}