import { Text, StyleSheet } from "react-native";

type TitleProps = {
  text: string;
};

export default function Title({ text }: TitleProps) {
  return <Text style={styles.title}>{text}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 38,
    fontWeight: "bold",
  },
});