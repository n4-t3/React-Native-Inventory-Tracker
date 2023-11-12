import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import colors from "../colors";
import StyledText from "../components/styledText.component";
import {
  createCategoriesTable,
  fetchUniqueTitles,
  fetchCategories,
} from "../storage/categoriesDB";

const ProfileScreen = () => {
  const [categoryLength, setCategoryLength] = useState(0);
  const [inventoryLength, setInventoryLength] = useState(0);

  useEffect(() => {
    const getCategories = async () => {
      await createCategoriesTable();
      const fetchCategoriesData = await fetchUniqueTitles();
      console.log("profile screen fetching data");
      console.log(fetchCategoriesData);
      setCategoryLength(fetchCategoriesData.length);
      const fetchInventoryData = await fetchCategories();
      const numberOfInventory =
        parseInt(fetchInventoryData.length) -
          parseInt(fetchCategoriesData.length) <
        0
          ? 0
          : parseInt(fetchInventoryData.length) -
            parseInt(fetchCategoriesData.length);

      setInventoryLength(numberOfInventory);
    };
    getCategories();
  }, [categoryLength, inventoryLength]);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.margin}>
        <StyledText color={colors.fontColor} type="large">
          Total Categories: {categoryLength}
        </StyledText>
      </View>
      <StyledText color={colors.fontColor} type="large">
        Total Inventories: {inventoryLength}
      </StyledText>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: colors.primaryBackground,
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  margin: {
    marginBottom: 20,
    marginTop: 20,
  },
});

export default ProfileScreen;
