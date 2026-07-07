interface ShoppingListProps {
    items: { id: string; name: string }[];
    onDelete: (item: { id: string; name: string }) => void;
}

import { View, Text } from "react-native";
import ShoppingItem from "./ShoppingItem";
import { FlatList } from "react-native";

export default function ShoppingList({
    items,
    onDelete
}: ShoppingListProps) {

    console.log(items);

    return (
       <FlatList
            data={items}
            renderItem={({ item }) => <ShoppingItem item={item} onDelete={onDelete} />}
            keyExtractor={(item) => item.id}
        />
    );
}