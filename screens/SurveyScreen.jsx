import { View, TouchableOpacity, ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";
import { useEffect, useState } from "react";
import { Snackbar } from "react-native-paper";
import Button from "../components/buttons/Button";
import { H2, H4, P, Span } from "../components/text";
import { SCREEN_WIDTH, styles, spacing, layouts, typography } from "../styles";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { surveyTask, updateTask } from "../redux/actions/taskActions";
//import ModalPopup from "../components/Modal";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

import CameraInput from "../components/input/CameraInput";
import UploadDocument from "../components/input/UploadDocument";

import MyTextInput from "../components/input/MyTextInput";
// import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

export default function SurveyScreen({ route, message = "" }) {
  const { itemId } = route.params || 0;
  const { isSurvey } = route.params || false;
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [modalMsg, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [loadType, setLoadType] = useState("");
  const [connectionType, setConnectionType] = useState("");
  const [meterConnectionType, setMeterConnectionType] = useState("");
  const [caNo, setCaNo] = useState("");
  const [meterNo, setMeterNo] = useState("");
  const [meterType, setMeterType] = useState("");
  const [sectionLoad, setSectionLoad] = useState("");
  const [loadKW, setLoadKW] = useState("");
  const [gridPowerAvailable, setGridPowerAvailable] = useState("");
  const [phaseMissing, setPhaseMissing] = useState("");
  const [ltdb, setLTDB] = useState("");
  const [dgCapacity, setDgCapacity] = useState("");
  const [dgMake, setDgMake] = useState("");
  const [dgModel, setDgModel] = useState("");
  const [roofCondition, setRoofCondition] = useState("");
  const [totalRoofArea, setTotalRoofArea] = useState("");
  const [freeSpaceSolar, setFreeSpaceSolar] = useState("");
  const [controlRoomAvailable, setControlRoomAvailable] = useState("");
  const [earthPitsAvailable, setEarthPitsAvailable] = useState("");
  const [buildingAge, setBuildingAge] = useState("");
  const [roofAccess, setRoofAccess] = useState("");
  const [rooftopHeight, setRooftopHeight] = useState("");
  const [parapetHeight, setParapetHeight] = useState("");
  const [noOfFloors, setNoOfFloors] = useState("");
  const [waterSource, setWaterSource] = useState("");
  const [accessRoadType, setAccessRoadType] = useState("");
  const [distanceFromMainRoad, setDistanceFromMainRoad] = useState("");
  const [siteFeasible, setSiteFeasible] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { t } = useTranslation();

  const handleTakePhoto = () => {
    setIsCameraVisible(true);
  };

  const handleUpload = async () => {
    if (!description && photos.length === 0 && !file) {
      setSnackbarMessage("Please provide data before submitting.");
      setSnackbarVisible(true);
      return;
    }

    // Only check for minimum photos when it's NOT a survey and file is not uploaded
    if (!isSurvey && photos.length < 1 && !file) {
      setSnackbarMessage(
        "Please click at least one picture or upload a document."
      );
      setSnackbarVisible(true);
      return;
    }

    try {
      setLoading(true);
      const payload = {
        date,
        description,
        image: photos,
        file,
        lat: latitude,
        long: longitude,
        contactNo,
        loadType,
        connectionType,
        meterConnectionType,
        caNo,
        meterNo,
        meterType,
        sectionLoad,
        loadKW,
        gridPowerAvailable,
        phaseMissing,
        ltdb,
        dgCapacity,
        dgMake,
        dgModel,
        roofCondition,
        totalRoofArea,
        freeSpaceSolar,
        controlRoomAvailable,
        earthPitsAvailable,
        buildingAge,
        roofAccess,
        rooftopHeight,
        parapetHeight,
        noOfFloors,
        waterSource,
        accessRoadType,
        distanceFromMainRoad,
        siteFeasible,
      };

      if (file) {
        console.log("Uploaded File Name:", file.name || "Unknown file");
      }

      const response = isSurvey
        ? await dispatch(surveyTask(itemId, payload))
        : await dispatch(updateTask(itemId, payload));

      if (response === 200) {
        setPhotos([]);
        setDescription("");
        setFile(null);
        navigation.navigate("successScreen", {
          message: "Task update has been successfully saved.",
          nextScreen: "streetLightPendingTask",
        });
      } else {
        setSnackbarMessage("Error submitting task");
        setSnackbarVisible(true);
      }
    } catch (error) {
      console.error("Error submitting task:", error);
      setModalMessage("Error submitting task");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const getAndSetCurrentLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (granted) {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      }
    } catch (err) { }
  };

  useEffect(() => {
    getAndSetCurrentLocation();
  }, []);

  return (
    <ContainerComponent>
      <MyHeader title={t("submit_task")} isBack={true} hasIcon={true} />

      <View style={[{ flex: 1, width: SCREEN_WIDTH - -40 }]}>

      </View>

      <CameraInput
        isCameraOpen={isCameraVisible}
        setIsCameraOpen={setIsCameraVisible}
        handleImageCapture={(val) => console.log(val)}
        handleUpload={handleUpload}
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{
          backgroundColor: "#DC4C64",
          borderRadius: 20,
          bottom: 55,
        }}
      >
        <P style={{ color: "#ffffff", fontWeight: "bold" }}>
          {snackbarMessage}
        </P>
      </Snackbar>

      {/* <ModalPopup
        visible={showModal}
        close={() => setShowModal(false)}
        negativeButton={t("close")}
        positiveButton={t("ok")}
        action={() => {
          setShowModal(false);
          navigation.goBack();
        }}
      >
        <H4>{modalMsg}</H4>
      </ModalPopup> */}
    </ContainerComponent>
  );
}
