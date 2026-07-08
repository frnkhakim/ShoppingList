import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "./src/screens/HomeScreen";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";

function AppContent() {
    const { colors } = useTheme();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <HomeScreen />
        </SafeAreaView>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <AppContent />
            </ThemeProvider>
        </SafeAreaProvider>
    );
}