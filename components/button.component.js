import { StyleSheet, Pressable, View } from "react-native";
import StyledText from "./styledText.component";
import colors from "../colors";

const Button = ({ value, type, onClick, center }) => {
  let color = "";
  let ripple = "";
  if (type == "primary") {
    color = colors.buttonPrimary;
    ripple = colors.buttonPrimaryRipple;
  } else if (type == "secondary") {
    color = colors.buttonSecondary;
    ripple = colors.buttonSecondaryRipple;
  }
  const handlePress = (e) => {
    onClick();
  };
  return (
    <View style={[styles.size, center ? styles.center : null]}>
      <Pressable
        android_ripple={{ color: ripple }}
        style={{ backgroundColor: color, ...styles.pressStyle }}
        onPress={handlePress}
      >
        <StyledText type="small">{value}</StyledText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pressStyle: {
    borderRadius: 10,
    padding: 20,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "center",
  },
  size: {
    width: "30%",
    marginTop: 10,
    marginBottom: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
});

export default Button;
