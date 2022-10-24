import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Button } from "../src/features/orders/components/button";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import base64 from "react-native-base64";
import { Base64 } from "js-base64";

export const CameraScreen = ({ route }) => {
  const { order } = route.params;
  const [hasCameraPermission, sethasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      sethasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync({ base64: true }); //log this to see th results if doesn't work delete the object
        const newData = await cameraRef.current.takePictureAsync(); //log this to see th results if doesn't work delete the object
        navigation.navigate("MeterCapturing", { image: data.base64, order });
        //const baseData = Base64.encode(data.uri);
        //const baseData = Base64.encode(data);
        //const baseData = Base64.encodeURI(data.uri);

        //AsyncStorage.setItem("imageData", data.base64);
        //const json = JSON.stringify(baseData)
        //AsyncStorage.setItem("imageData", json);

        //console.log(data);
        //console.log(data.path);
        setImage(newData.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        const photoUri = await AsyncStorage.getItem("imageData");
        //console.log(photoUri);
        alert("Picture saved");
        setImage(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        />
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View>
        {image ? (
          <View style={styles.buttonView}>
            <Button
              title={"Re-take"}
              icon="retweet"
              onPress={() => setImage(null)}
            />
            <Button title={"Save"} icon="check" onPress={saveImage} />
          </View>
        ) : (
          <Button
            title={"Take a picture"}
            icon="camera"
            onPress={takePicture}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    paddingBottom: 15,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
  },
  topButtonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
  },
});
