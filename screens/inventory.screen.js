import { StyleSheet, View, ScrollView } from "react-native";
import colors from "../colors";
import StyledText from "../components/styledText.component";
import { useEffect, useState } from "react";
import { fetchCategories } from "../storage/categoriesDB";
import Inventories from "../components/inventories.component";

const InventoryScreen = ({ navigation }) => {
  const [inventories, setInventories] = useState();
  const titles = [];

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetchCategories();
      setInventories(res);
    };
    getCategories();
  }, []);

  return (
    <View style={styles.container}>
      <StyledText color={colors.fontColor} type="large">
        Inventory
      </StyledText>
      <ScrollView style={styles.scrollView}>
        {inventories
          ? inventories.map((element) => {
              const showTitle = !titles.includes(element.Title);
              titles.push(element.Title);
              return (
                <View key={element.id}>
                  {showTitle && (
                    <StyledText color={colors.fontColor} type="medium">
                      {element.Title}
                    </StyledText>
                  )}

                  {element.Name && (
                    <Inventories
                      data={element}
                      onClick={() =>
                        navigation.navigate("ViewInventory", { data: element })
                      }
                    />
                  )}
                </View>
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
