import { StyleSheet, View, ScrollView } from "react-native";
import colors from "../colors";
import StyledText from "../components/styledText.component";
import { useContext } from "react";
import DataContext from "../context/categoriesContextProvider";

const InventoryScreen = ({ route, navigation }) => {
  const { inventories } = useContext(DataContext);
  return (
    <View style={styles.container}>
      <StyledText color={colors.fontColor} type="large">
        Inventory
      </StyledText>
      <ScrollView style={styles.scrollView}>
        {inventories
          ? inventories.map((element) => {
              return (
                <StyledText
                  key={element.id}
                  color={colors.fontColor}
                  type="small"
                >
                  {element}
                </StyledText>
              );
            })
          : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  scrollView: {
    flex: 1,
    flexGrow: 1,
  },
});

export default InventoryScreen;
