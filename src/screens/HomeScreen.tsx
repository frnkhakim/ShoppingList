import React from 'react';
import { View, StyleSheet, Modal, Text, Button, TextInput, Pressable, ScrollView } from 'react-native';
import Title from "../components/Title";
import ShoppingInput from "../components/ShoppingInput";
import ShoppingList from "../components/ShoppingList";
import { useShoppingList } from "../hooks/useShoppingList";
import { useState, useMemo } from "react";
import type { ShoppingItem } from "../types/ShoppingItem";

/*
================================================================================
LESSON 30: Organizing Derived State with useMemo
================================================================================

KEY CONCEPTS:

1. MEMOIZATION: Caching computation results to avoid recalculation
   - "Memo" = short for memorization
   - React doesn't automatically remember calculated values
   - Without useMemo, calculations run on EVERY render

2. EXPENSIVE CALCULATIONS: Operations that take time/resources
   - Array filtering (.filter())
   - Array mapping (.map())
   - String operations (.toLowerCase(), .includes())
   - Object creation

3. DEPENDENCY ARRAYS: Tell React when to recalculate
   - useMemo only recalculates when dependencies change
   - Empty [] = memoize once, never recalculate
   - [a, b, c] = recalculate only if a, b, or c changes

4. WHEN TO USE useMemo:
   ✅ DO USE for:
      - Expensive array operations (filter, map, sort)
      - Complex object creation
      - When rendering many items
      - Search/filter logic
   
   ❌ DON'T USE for:
      - Simple calculations (a + b)
      - Single primitives
      - If dependency array is almost everything
      - Premature optimization (measure first!)

5. PERFORMANCE IMPACT:
   - Without useMemo: Recalculate counts on EVERY state change
   - With useMemo: Only recalculate when actual data changes
   - Example: Typing in search → only filteredItems updates, not all counts

REAL WORLD EXAMPLE:
When you type 1 letter in search → React re-renders
Without useMemo → ALL counts recalculate (wasteful!)
With useMemo → Only search-related values recalculate (efficient!)

VISUAL PERFORMANCE COMPARISON:

WITHOUT useMemo (inefficient ❌):
┌─ User types 'a' in search ─────────────────────┐
│ Render 1: recalculate filteredItems            │
│ Render 1: recalculate all counts                │
│ Render 1: recalculate search.toLowerCase()     │
│ Render 1: recalculate hasActiveSearch          │
│                                                 │
│ Render 2: recalculate all counts (again!)      │
│ Render 2: recalculate search.toLowerCase()     │
│ Render 2: recalculate hasActiveSearch          │
│ Total: MANY unnecessary recalculations ❌      │
└─────────────────────────────────────────────────┘

WITH useMemo (efficient ✅):
┌─ User types 'a' in search ─────────────────────┐
│ Render 1: recalculate filteredItems (needed)   │
│ Render 1: counts MEMOIZED (no calc)            │
│ Render 1: search.toLowerCase() MEMOIZED        │
│                                                 │
│ Render 2: filteredItems from CACHE             │
│ Render 2: counts from CACHE                    │
│ Render 2: search.toLowerCase() from CACHE      │
│ Total: MINIMAL recalculation ✅               │
└─────────────────────────────────────────────────┘

HOW TO ENABLE PERFORMANCE MONITORING:
Uncomment the console.log statements to see when React recalculates:
- Line 28: 'Recalculating filteredItems...'
- Line 51: 'Recalculating counts...'
- Line 64: 'Memoizing search term...'
- Line 70: 'Checking if search is active...'

Try editing an item without changing search → counts don't recalculate!

================================================================================
*/

export default function HomeScreen() {

    const {
        shoppingItems,
        addItem,
        deleteItem,
        updateItem,
        toggleComplete,
    } = useShoppingList();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
    const [editText, setEditText] = useState("");
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [searchText, setSearchText] = useState("");

    // LESSON 30: Deriving and Memoizing Calculated Values
    // =====================================================
    
    // Step 1: Memoize the main filtered items
    // This prevents recalculation when unrelated state changes
    const filteredItems = useMemo(() => {
        // console.log('🔄 Recalculating filteredItems...')
        return shoppingItems
            .filter(item => {
                if (filter === 'active') return !item.completed;
                if (filter === 'completed') return item.completed;
                return true;
            })
            .filter(item => {
                if (!searchText.trim()) return true;
                return item.name.toLowerCase().includes(searchText.toLowerCase());
            });
    }, [shoppingItems, filter, searchText]);

    // Step 2: Memoize individual counts
    // Instead of recalculating these every render, they only update when items change
    const counts = useMemo(() => {
        // console.log('📊 Recalculating counts...')
        const allCount = shoppingItems.length;
        const activeCount = shoppingItems.filter(i => !i.completed).length;
        const completedCount = shoppingItems.filter(i => i.completed).length;
        const activeSearchCount = filteredItems.filter(i => !i.completed).length;
        const completedSearchCount = filteredItems.filter(i => i.completed).length;

        return {
            allCount,
            activeCount,
            completedCount,
            activeSearchCount,
            completedSearchCount,
        };
    }, [shoppingItems, filteredItems]);

    // Step 3: Memoize search-related computations
    // This prevents text operations on every render
    const searchLowercase = useMemo(() => {
        // console.log('🔍 Memoizing search term...')
        return searchText.toLowerCase();
    }, [searchText]);

    const hasActiveSearch = useMemo(() => {
        // console.log('✓ Checking if search is active...')
        return searchText.trim().length > 0;
    }, [searchText]);

    const closeModal = () => {
        setIsModalVisible(false);
        setEditingItem(null);
        setEditText("");
    };

    const openEditModal = (item: ShoppingItem) => {
        setEditingItem(item);
        setEditText(item.name);
        setIsModalVisible(true);
    };

    const saveEdit = () => {
        if (editingItem && editText.trim()) {
            updateItem(editingItem.id, editText.trim());
        }
        closeModal();
    };

    return (
        <View style={styles.container}>
            <Title text="My Shopping List" />
            
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="🔍 Search items..."
                    placeholderTextColor="#999"
                    value={searchText}
                    onChangeText={setSearchText}
                    clearButtonMode="while-editing"
                />
            </View>
            
            <View style={styles.filterContainer}>
                <Pressable 
                    style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
                    onPress={() => setFilter('all')}
                >
                    <Text style={filter === 'all' ? styles.filterButtonTextActive : styles.filterButtonText}>
                        All ({counts.allCount}{hasActiveSearch && ` / ${filteredItems.length}`})
                    </Text>
                </Pressable>
                <Pressable 
                    style={[styles.filterButton, filter === 'active' && styles.filterButtonActive]}
                    onPress={() => setFilter('active')}
                >
                    <Text style={filter === 'active' ? styles.filterButtonTextActive : styles.filterButtonText}>
                        Active ({counts.activeCount}{hasActiveSearch && ` / ${counts.activeSearchCount}`})
                    </Text>
                </Pressable>
                <Pressable 
                    style={[styles.filterButton, filter === 'completed' && styles.filterButtonActive]}
                    onPress={() => setFilter('completed')}
                >
                    <Text style={filter === 'completed' ? styles.filterButtonTextActive : styles.filterButtonText}>
                        Done ({counts.completedCount}{hasActiveSearch && ` / ${counts.completedSearchCount}`})
                    </Text>
                </Pressable>
            </View>
            <ShoppingInput 
                onAddItem={addItem}
            />
            <ShoppingList 
                items={filteredItems} 
                onEdit={openEditModal} 
                onDelete={deleteItem}
                onToggle={toggleComplete}
            />
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Edit Item</Text>
                        <TextInput
                            style={styles.input}
                            value={editText}
                            onChangeText={setEditText}
                            placeholder="Edit item name"
                            placeholderTextColor="#999"
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Save" onPress={saveEdit} color="#4CAF50" />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="Cancel" onPress={closeModal} color="#f44336" />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  searchContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  filterButtonActive: {
    backgroundColor: '#2196F3',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 2,
    borderColor: '#2196F3',
    padding: 12,
    marginBottom: 20,
    width: '100%',
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
