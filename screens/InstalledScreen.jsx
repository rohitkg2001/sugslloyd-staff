import { useState } from "react";
import { View, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import UploadDocument from "../components/input/UploadDocument";
import MyTextInput from "../components/input/MyTextInput";
import CameraInput from "../components/input/CameraInput";
import { typography, styles, spacing } from "../styles";
import Button from "../components/buttons/Button";
import { H2, H4 } from "../components/text";

export default function InstalledScreen({ navigation }) {
  const route = useRoute();
  const { id, siteName } = route.params || {};

  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  const [meterNo, setMeterNo] = useState("");
  const [meterType, setMeterType] = useState("Smart");
  const [caNo, setCaNo] = useState("");

  const handleTakePhoto = () => {
    setIsCameraVisible(true);
  };

  const handleUpload = (capturedPhoto) => {
    setPhotos((prev) => [...prev, capturedPhoto]);
    setIsCameraVisible(false);
  };

  return (
    <ContainerComponent>
      <MyHeader title={siteName || "No Site"} isBack={true} hasIcon={true} />

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <MyTextInput
          value={meterNo}
          onChangeText={setMeterNo}
          placeholder="Enter Meter No."
          title="Meter No."
        />

        <H4 style={[typography.font14, typography.fontLato]}>Meter Type</H4>
        <RadioButton.Group onValueChange={setMeterType} value={meterType}>
          <View style={[styles.row, spacing.p1]}>
            <RadioButton.Item
              label="Smart"
              value="Smart"
              color="#007AFF"
              labelStyle={[typography.font12]}
            />
            <RadioButton.Item
              label="Normal"
              value="Normal"
              color="#007AFF"
              labelStyle={[typography.font12]}
            />
          </View>
        </RadioButton.Group>

        <MyTextInput
          value={caNo}
          onChangeText={setCaNo}
          placeholder="Enter CA No."
          title="CA No."
        />

        <UploadDocument file={file} setFile={setFile} />

        <View>
          <MyTextInput
            value={description}
            title="Description"
            onChangeText={(text) => {
              if (text.length <= 500) setDescription(text);
            }}
            multiline={true}
            placeholder="Type here..."
            style={[
              typography.font14,
              {
                lineHeight: 20,
                fontFamily: "System",
                minHeight: 100,
                textAlignVertical: "top",
                borderWidth: 1,
                borderColor: "#ccc",
              },
            ]}
          />
          <View
            style={[
              styles.row,
              spacing.mr1,
              {
                justifyContent: "flex-end",
                top: 35,
              },
            ]}
          >
            <H4 style={[typography.font12, { color: "#666" }]}>
              {description.length} / 500
            </H4>
          </View>
        </View>

        <Button
          style={[
            styles.btn,
            styles.bgPrimary,
            spacing.mh2,
            spacing.ph2,
            {
              justifyContent: "center",
              alignSelf: "stretch",
              top: 80,
            },
          ]}
          onPress={handleTakePhoto}
        >
          <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
            {"Take Photo"}
          </H2>
        </Button>
      </ScrollView>

      <CameraInput
        isCameraOpen={isCameraVisible}
        setIsCameraOpen={setIsCameraVisible}
        handleImageCapture={(val) => console.log("Captured:", val)}
        handleUpload={handleUpload}
      />
    </ContainerComponent>
  );
}
