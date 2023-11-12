import { StyleSheet, Pressable, View } from "react-native";
import StyledText from "./styledText.component";
import colors from "../colors";

const Inventories = ({ data, onClick }) => {
  const handleCategory = () => {
    onClick();
  };

  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: colors.ripple }}
        style={styles.pressStyle}
        onPress={handleCategory}
      >
        <StyledText type="small">{data.Name}</StyledText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.secondaryBackground,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  pressStyle: {
    borderRadius: 10,
    margin: 5,
    padding: 20,
  },
});

export default Inventories;
