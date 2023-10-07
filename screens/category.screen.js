import { StyleSheet, View, ScrollView, TextInput, Image } from "react-native";
import colors from "../colors";
import StyledText from "../components/styledText.component";
import { useState, useEffect } from "react";
import { createInventoryTable, insertInventory } from "../storage/inventoryDB";
import Button from "../components/button.component";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import MapView, { Marker } from "react-native-maps";
import { Dimensions } from "react-native";

const height = Dimensions.get("window").height;

const CategoryScreen = ({ route, navigation }) => {
  const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const [inputData, setInputData] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [notAdded, setNotAdded] = useState("");
  useEffect(() => {
    const getSpecifiedCategory = async () => {
      await createInventoryTable();
    };
    getSpecifiedCategory();
  }, []);
  const inputHandler = (e) => {
    setInputData(e);
  };
  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const selectLocationHandler = (e) => {
    const lat = e.nativeEvent.coordinate.latitude;
    const lng = e.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat, lng });
  };

  const addCategory = async () => {
    setNotAdded("");
    if (inputData === null || inputData.length === 0) {
      setNotAdded("No item added ");
    }
    if (image === null) {
      setNotAdded((prevNotAdded) => prevNotAdded + "No image added ");
    }
    if (selectedLocation === null) {
      setNotAdded((prevNotAdded) => prevNotAdded + "No location added");
    } else {
      await insertInventory(
        inputData,
        image,
        selectedLocation.lat,
        selectedLocation.lng,
        route.params.data.id
      );
      setInputData(null);
      setImage(null);
      setSelectedLocation(null);
      setNotAdded("");
      navigation.navigate("Home", { data: "item added!" });
    }
  };
  return (
    <ScrollView style={styles.container}>
      <StyledText color={colors.fontColor} type="large">
        {route.params.data.Title}
      </StyledText>
      <TextInput
        placeholderTextColor={colors.fontColor}
        placeholder=" Add Item"
        style={styles.inputArea}
        onChangeText={inputHandler}
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
        multiline={false}
        value={inputData}
      />
      <Button
        style={styles.center}
        onClick={pickImage}
        value="Select Image"
        type="secondary"
        center={true}
      />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.mapContainer}>
        <MapView
          initialRegion={region}
          style={styles.map}
          onPress={selectLocationHandler}
        >
          {selectedLocation && (
            <Marker
              coordinate={{
                latitude: selectedLocation.lat,
                longitude: selectedLocation.lng,
              }}
            />
          )}
        </MapView>
      </View>
      <StyledText color={colors.warningColor} type="small">
        {notAdded}
      </StyledText>
      <Button
        style={styles.center}
        onClick={addCategory}
        value="Add Category"
        type="primary"
        center={true}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
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
  scrollView: {
    flex: 1,
    flexGrow: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
  mapContainer: {
    paddingTop: 10,
    height: height / 2,
    width: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default CategoryScreen;
