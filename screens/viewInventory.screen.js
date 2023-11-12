import { StyleSheet, View, ScrollView, Image } from "react-native";
import colors from "../colors";
import StyledText from "../components/styledText.component";
import MapView, { Marker } from "react-native-maps";
import { Dimensions } from "react-native";

const height = Dimensions.get("window").height;

const ViewInventoryScreen = ({ route }) => {
  const region = {
    latitude: route.params.data.LAT,
    longitude: route.params.data.LNG,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <ScrollView style={styles.container}>
      <StyledText color={colors.fontColor} type="large">
        {route.params.data.Title}
      </StyledText>
      <StyledText color={colors.fontColor} type="medium">
        {route.params.data.Name}
      </StyledText>
      {route.params.data.ImageUri && (
        <Image
          source={{ uri: route.params.data.ImageUri }}
          style={styles.image}
        />
      )}
      <View style={styles.mapContainer}>
        {route.params.data.LAT && route.params.data.LNG && (
          <MapView initialRegion={region} style={styles.map}>
            <Marker
              coordinate={{
                latitude: route.params.data.LAT,
                longitude: route.params.data.LNG,
              }}
            />
          </MapView>
        )}
      </View>
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

export default ViewInventoryScreen;
