import { StyleSheet, View, ScrollView, Alert } from "react-native";
import colors from "../colors";
import StyledText from "../components/styledText.component";
import Categories from "../components/categories.component";
import InputField from "../components/inputField.component";
import { useContext } from "react";
import DataContext from "../context/categoriesContextProvider";

const HomeScreen = ({ route, navigation }) => {
  if (route.params && route.params.data) {
    Alert.alert(
      "Confirmation",
      "New Item Added!",
      [
        {
          text: "Ok",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  }
  const { categories } = useContext(DataContext);
  console.log("here are the categories");
  console.log(categories);
  return (
    <View style={styles.container}>
      <StyledText color={colors.fontColor} type="large">
        Find the things you didn't know you had
      </StyledText>
      <InputField />
      <ScrollView style={styles.scrollView}>
        {categories
          ? categories.map((element, index) => {
              return (
                <Categories
                  key={index}
                  data={element}
                  onClick={() =>
                    navigation.navigate("Category", { data: element })
                  }
                />
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

export default HomeScreen;
