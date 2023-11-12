import { StyleSheet, TextInput, View, Alert } from "react-native";
import colors from "../colors";
import Button from "./button.component";
import { useContext, useState } from "react";
import DataContext from "../context/categoriesContextProvider";
import {
  insertJustTitleIntoCategories,
  fetchUniqueTitles,
} from "../storage/categoriesDB";

const InputField = (props) => {
  const { setCategories } = useContext(DataContext);
  const [inputData, setInputData] = useState("");
  const inputHandler = (e) => {
    setInputData(e);
  };

  const submitHandler = async () => {
    if (inputData.length > 0) {
      console.log("inserting data");
      await insertJustTitleIntoCategories(inputData);
      const updatedCategories = await fetchUniqueTitles();
      console.log("input fetching data");

      console.log(updatedCategories);
      setCategories(updatedCategories);
      setInputData("");
    } else {
      return Alert.alert(
        "Empty",
        "No data inserted!",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      );
    }
  };

  return (
    <View style={styles.row}>
      <TextInput
        placeholderTextColor={colors.fontColor}
        placeholder=" Add Category"
        style={styles.inputArea}
        onChangeText={inputHandler}
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
        multiline={false}
        onSubmitEditing={submitHandler}
        value={inputData}
      />
      <Button value={"Add"} type={"primary"} onClick={submitHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputArea: {
    flex: 1,
    backgroundColor: colors.secondaryBackground,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    padding: 20,
    color: colors.fontColor,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
});

export default InputField;
