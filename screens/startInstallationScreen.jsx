import { useState, useRef } from "react";
import { View, TouchableOpacity, Image, ScrollView } from "react-native";
import MyHeader from "../components/header/MyHeader";
import CameraComponent from "../components/servey/CameraComponent";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles, typography } from "../styles";
import MyTextInput from "../components/input/MyTextInput";
import { P } from "../components/text";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons
import { useSelector } from "react-redux";
import QRScanner from "../components/input/QRScanner";
import { Portal } from "react-native-paper";
import CameraInput from "../components/input/CameraInput";

export default function StartInstallation({ navigation }) {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);
  const [poleNumber, setPoleNumber] = useState("");
  const [luminarySerialNumber, setLuminarySerialNumber] = useState("");
  const [simNumber, setSimNumber] = useState("");
  const [batterySerialNumber, setBatterySerialNumber] = useState("");
  const [panelSerialNumber, setPanelSerialNumber] = useState("");
  const [locationRemarks, setLocationRemarks] = useState("");

  const { siteInfo } = useSelector((state) => state.site);

  return (
    <ContainerComponent>
      <MyHeader isBack title="Start Installation" hasIcon />
      <ScrollView
        contentContainerStyle={[spacing.mh2, { width: SCREEN_WIDTH - 16 }]}
        showsVerticalScrollIndicator={false}
      >
        <P
          style={[
            typography.font16,
            typography.textBold,
            styles.bgPrimaryTransParent,
            spacing.p2,
            { width: SCREEN_WIDTH - 16 },
          ]}
        >
          Location Info: {siteInfo}
        </P>
        <MyTextInput
          // style={[spacing.br1, spacing.p3, spacing.mv1, spacing.bw1]}
          placeholder="Enter Pole Number"
          value={poleNumber}
          onChangeText={setPoleNumber}
          keyboardType="numeric"
        />
        <View
          style={[
            spacing.mv2,
            spacing.pv2,
            {
              backgroundColor: "#f0f0f0",
            },
          ]}
        >
          <QRScanner
            title="Scan Luminary QR"
            onScan={(val) => setLuminarySerialNumber(val)}
          />
          <MyTextInput
            // style={[spacing.br1, spacing.p3, spacing.mv1, spacing.bw1]}
            placeholder="Enter Luminary Serial Number"
            value={luminarySerialNumber}
            onChangeText={setLuminarySerialNumber}
            keyboardType="numeric"
          />
          <MyTextInput
            // style={[spacing.br1, spacing.p3, spacing.mv1, spacing.bw1]}
            placeholder="Enter SIM Number"
            value={simNumber}
            onChangeText={setSimNumber}
            keyboardType="numeric"
          />
        </View>

        <View
          style={[
            spacing.mv2,
            spacing.pv2,
            {
              backgroundColor: "#f0f0f0",
            },
          ]}
        >
          <QRScanner
            title="Scan Battery QR"
            onScan={(val) => setBatterySerialNumber(val)}
          />
          <MyTextInput
            // style={[spacing.br1, spacing.p3, spacing.mv1, spacing.bw1]}
            placeholder="Enter Battery Serial Number"
            value={batterySerialNumber}
            onChangeText={setBatterySerialNumber}
            keyboardType="numeric"
          />
        </View>

        <View
          style={[
            spacing.mv2,
            spacing.pv2,
            {
              backgroundColor: "#f0f0f0",
            },
          ]}
        >
          <QRScanner
            title="Scan Panel QR"
            onScan={(val) => setPanelSerialNumber(val)}
          />
          <MyTextInput
           // style={[spacing.br1, spacing.p3, spacing.mv1, spacing.bw1]}
            placeholder="Enter Panel Serial Number"
            value={panelSerialNumber}
            onChangeText={setPanelSerialNumber}
            keyboardType="numeric"
          />
        </View>

        <MyTextInput
         // style={[spacing.br1, spacing.p3, spacing.mv1, spacing.bw1]}
          placeholder="Enter Location Remarks"
          multiline={true}
          numberOfLines={4}
          value={locationRemarks}
          onChangeText={setLocationRemarks}
        />
      </ScrollView>
      <TouchableOpacity
        style={[
          spacing.p4,
          spacing.br1,
          spacing.mb1,
          styles.bgPrimary,
          {
            width: SCREEN_WIDTH - 16,
            alignItems: "center",
          },
        ]}
        onPress={() => setIsCameraVisible(true)}
      >
        <P
          style={[typography.font18, typography.textBold, typography.textLight]}
        >
          Take Photo
        </P>
      </TouchableOpacity>
      <CameraInput
        isCameraOpen={isCameraVisible}
        setIsCameraOpen={setIsCameraVisible}
        handleImageCapture={(val) => console.log(val)}
      />
    </ContainerComponent>
  );
}
