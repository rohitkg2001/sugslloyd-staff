import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Card, Button } from "react-native-paper";
import CameraComponent from "../components/CameraComponent";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, SCREEN_HEIGHT, spacing } from "../styles";
import { typography, PRIMARY_COLOR } from "../styles";
import { styles } from "../styles/components.styles";
import { H4, H5, H6, P } from "../components/text";

const FileUploadScreen = () => {
  const [photos, setPhotos] = useState([]);
  const [photoMessage, setPhotoMessage] = useState("");
  const [description, setDescription] = useState("");

  const cameraRef = useRef(null);

  const handleTakePicture = async () => {
    if (cameraRef.current && photos.length < 5) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotos([...photos, photo.uri]);
      setPhotoMessage("Photo has been taken!");
      console.log("Photo taken:", photo.uri);
    } else if (photos.length >= 5) {
      setPhotoMessage("Maximum of 5 photos reached.");
    }
  };

  const handleUpload = () => {
    if (photos.length > 0) {
      console.log("Uploading photos:", photos);
      console.log("Description:", description);
      Alert.alert("Success", "Data Collected Successfully", [
        { text: "OK", onPress: () => handleCancel() }, // Optionally clear state after confirmation
      ]);
    } else {
      Alert.alert("Error", "No photos to upload");
    }
  };

  const handleCancel = () => {
    setPhotos([]);
    setPhotoMessage("");
    setDescription("");
    console.log("Upload canceled");
  };

  const removePhoto = (uri) => {
    setPhotos(photos.filter((photoUri) => photoUri !== uri));
    console.log("Photo removed:", uri);
  };

  return (
    <ContainerComponent>
      <View style={[spacing.mb5, { width: SCREEN_WIDTH - 14 }]}>
        <Card style={[{ height: SCREEN_HEIGHT - 16 }]}>
          <View style={styles.cardTitle}>
            <H4 style={[typography.textBold]}>Upload Photos</H4>
            <H6>Take up to 5 pictures to upload</H6>
          </View>
          <Card.Content>
            {/* Camera Component */}
            <CameraComponent cameraRef={cameraRef} />

            {/* Take Photo Button */}
            <Button
              style={[styles.bgPrimary, { justifyContent: "center" }]}
              mode="outlined"
              onPress={handleTakePicture}
            >
              <H5
                style={[styles.btnText, styles.textLarge, typography.textLight]}
              >
                Take Photo
              </H5>
            </Button>

            {photoMessage && <P>{photoMessage}</P>}

            {/* Display Photos */}
            <View style={styles.photoRow}>
              {photos.map((photoUri, index) => (
                <View key={index} style={styles.photoContainer}>
                  <Image source={{ uri: photoUri }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removePhoto(photoUri)}
                  >
                    <P style={{ fontSize: 14, color: "white", marginLeft: 2 }}>
                      X
                    </P>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Description Box */}
            <TextInput
              style={{
                height: 100,
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 8,
                padding: 10,
                marginTop: 14,
              }}
              placeholder="Enter a description..."
              multiline
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </Card.Content>

          {/* Actions - Cancel and Upload Buttons */}
          <Card.Actions
            style={[styles.actions, { justifyContent: "space-between" }]}
          >
            <Button onPress={handleCancel} style={{ paddingVertical: 4 }}>
              Cancel
            </Button>
            <Button
              onPress={handleUpload}
              style={{
                paddingVertical: 4,
                backgroundColor: PRIMARY_COLOR,
              }}
            >
              Upload Files
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </ContainerComponent>
  );
};

export default FileUploadScreen;
