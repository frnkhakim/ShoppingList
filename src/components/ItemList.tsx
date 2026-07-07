import React from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';

interface ItemListProps {
  items: string[];
  onDelete: (item: string) => void;
}

export default function ItemList({ items, onDelete }: ItemListProps) {
  return (
    <FlatList
      data={items}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
});
