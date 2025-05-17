import { View, TouchableOpacity, ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";
import { useEffect, useState } from "react";
import { Snackbar } from "react-native-paper";
import { H2, H4, P, Span } from "../components/text";
import { SCREEN_WIDTH, styles, spacing, typography } from "../styles";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { surveyTask, updateTask } from "../redux/actions/taskActions";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

import CameraInput from "../components/input/CameraInput";
import UploadDocument from "../components/input/UploadDocument";
import MyTextInput from "../components/input/MyTextInput";
import ProgressStep, {
  NavigationButtons,
} from "../components/tab/ProgressStep";

export default function SurveyScreen({ route, message = "" }) {
  const { itemId } = route.params || 0;
  const { isSurvey } = route.params || false;
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0); // Initialize active step state

  // Step state and handling
  const steps = ["Basic Info", "Meter Details", "Other Info"];

  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [loadType, setLoadType] = useState("");
  const [connectionType, setConnectionType] = useState("");
  const [meterConnectionType, setMeterConnectionType] = useState("");
  const [caNo, setCaNo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [modalMsg, setModalMessage] = useState("");
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
        contactNo,
        loadType,
        connectionType,
        meterConnectionType,
        caNo,
        file,
        lat: latitude,
        long: longitude,
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
      setSnackbarMessage("Error submitting task");
      setSnackbarVisible(true);
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
    } catch (err) {}
  };

  useEffect(() => {
    getAndSetCurrentLocation();
  }, []);

  const goToPrevious = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const goToNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
  };

  return (
    <ContainerComponent>
      <MyHeader title={t("submit_task")} isBack={true} hasIcon={true} />

      {/* Add ProgressStep Component to manage steps */}
      <ProgressStep
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />

      <ScrollView style={[spacing.p2]}>
        {activeStep === 0 && (
          // Basic Info Step
          <>
            <MyTextInput
              value={contactNo}
              onChangeText={setContactNo}
              placeholder="Enter Contact No"
              keyboardType="phone-pad"
              title="Contact No"
            />
            <H4 style={[typography.font14, typography.fontLato]}>
              Type of Load
            </H4>
            <RadioButton.Group onValueChange={setLoadType} value={loadType}>
              <View style={[styles.row]}>
                <RadioButton.Item
                  label="AC"
                  value="AC"
                  color="#007AFF"
                  labelStyle={[typography.font12]}
                />
                <RadioButton.Item
                  label="DC"
                  value="DC"
                  color="#007AFF"
                  labelStyle={[typography.font12]}
                />
              </View>
            </RadioButton.Group>
            <H4 style={[typography.font14, typography.fontLato]}>
              Connection Type
            </H4>
            <RadioButton.Group
              onValueChange={setConnectionType}
              value={connectionType}
            >
              <View style={[styles.row]}>
                <RadioButton.Item
                  label="1 Phase"
                  value="1 Phase"
                  color="#007AFF"
                  labelStyle={[typography.font12]}
                />
                <RadioButton.Item
                  label="3 Phase"
                  value="3 Phase"
                  color="#007AFF"
                  labelStyle={[typography.font12]}
                />
              </View>
            </RadioButton.Group>
            <H4 style={[typography.font14, typography.fontLato]}>
              Meter Connection Type
            </H4>
            <RadioButton.Group
              onValueChange={setMeterConnectionType}
              value={meterConnectionType}
            >
              <View style={[styles.row]}>
                <RadioButton.Item
                  label="HT"
                  value="HT"
                  color="#007AFF"
                  labelStyle={[typography.font12]}
                />
                <RadioButton.Item
                  label="LT"
                  value="LT"
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
            <H4 style={[typography.font14, typography.fontLato]}>LTDB</H4>
            <RadioButton.Group onValueChange={setLTDB} value={ltdb}>
              <View style={[styles.row]}>
                <RadioButton.Item
                  label="Present"
                  value="Present"
                  color="#007AFF"
                  labelStyle={[typography.font12]}
                />
                <RadioButton.Item
                  label="Not Present"
                  value="Not Present"
                  color="#007AFF"
                  labelStyle={[typography.font12]}
                />
              </View>
            </RadioButton.Group>

            <MyTextInput
              title="DG Set Capacity (KVA)"
              placeholder="Enter DG Set Capacity"
              value={dgCapacity}
              onChangeText={setDgCapacity}
            />

            <MyTextInput
              title="DG Set Make"
              placeholder="Enter DG Set Make"
              value={dgMake}
              onChangeText={setDgMake}
            />
            <H4 style={[typography.font14, typography.fontLato]}>
              Control Room Available?
            </H4>
            <RadioButton.Group
              onValueChange={setControlRoomAvailable}
              value={controlRoomAvailable}
            >
              <View style={[styles.row]}>
                <RadioButton.Item
                  label="Yes"
                  value="Yes"
                  color="#007AFF"
                  labelStyle={[typography.font12]}
                />
                <RadioButton.Item
                  label="No"
                  value="No"
                  color="#007AFF"
                  labelStyle={[typography.font12]}
                />
              </View>
            </RadioButton.Group>
            <H4 style={[typography.font14, typography.fontLato]}>
              Earth Pits Availability
            </H4>
            <RadioButton.Group
              onValueChange={setEarthPitsAvailable}
              value={earthPitsAvailable}
            >
              <View style={[styles.row]}>
                <RadioButton.Item
                  label="Yes"
                  value="Yes"
                  color="#007AFF"
                  labelStyle={[typography.font12]}
                />
                <RadioButton.Item
                  label="No"
                  value="No"
                  color="#007AFF"
                  labelStyle={[typography.font12]}
                />
              </View>
            </RadioButton.Group>
          </>
        )}

        {activeStep === 1 && (
          <ScrollView style={[spacing.p1]}>
            {/* Meter No */}
            <MyTextInput
              value={meterNo}
              onChangeText={setMeterNo}
              placeholder="Enter Meter No."
              title="Meter No."
            />

            {/* Meter Type */}
            <H4 style={[typography.font14, typography.fontLato]}>Meter Type</H4>
            <RadioButton.Group onValueChange={setMeterType} value={meterType}>
              <View style={[styles.row]}>
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

            {/* Section Load */}
            <H4 style={[typography.font14, typography.fontLato]}>
              Section Load
            </H4>
            <RadioButton.Group
              onValueChange={setSectionLoad}
              value={sectionLoad}
            >
              <View style={[styles.row]}>
                <RadioButton.Item
                  label="KW"
                  value="KW"
                  color="#007AFF"
                  labelStyle={[typography.font12]}
                />
                <RadioButton.Item
                  label="KVA"
                  value="KVA"
                  color="#007AFF"
                  labelStyle={[typography.font12]}
                />
              </View>
            </RadioButton.Group>

            {/* Load KW */}
            <MyTextInput
              value={loadKW}
              onChangeText={setLoadKW}
              placeholder="Enter Load (KW)"
              title="Load (KW)"
            />

            {/* Grid Power Available */}
            <H4 style={[typography.font14, typography.fontLato]}>
              Grid Power Available?
            </H4>
            <RadioButton.Group
              onValueChange={setGridPowerAvailable}
              value={gridPowerAvailable}
            >
              <View style={[styles.row]}>
                <RadioButton.Item
                  label="Yes"
                  value="Yes"
                  color="#007AFF"
                  labelStyle={[typography.font12]}
                />
                <RadioButton.Item
                  label="No"
                  value="No"
                  color="#007AFF"
                  labelStyle={[typography.font12]}
                />
              </View>
            </RadioButton.Group>

            {/* Phase Missing */}
            <H4 style={[typography.font14, typography.fontLato]}>
              Phase Missing?
            </H4>
            <RadioButton.Group
              onValueChange={setPhaseMissing}
              value={phaseMissing}
            >
              <View style={[styles.row]}>
                <RadioButton.Item
                  label="Yes"
                  value="Yes"
                  color="#007AFF"
                  labelStyle={[typography.font12]}
                />
                <RadioButton.Item
                  label="No"
                  value="No"
                  color="#007AFF"
                  labelStyle={[typography.font12]}
                />
              </View>
            </RadioButton.Group>
            <MyTextInput
              title="DG Set Model No"
              placeholder="Enter DG Set Model No"
              value={dgModel}
              onChangeText={setDgModel}
            />

            <MyTextInput
              title="Roof Condition"
              placeholder="Enter Roof Condition"
              value={roofCondition}
              onChangeText={setRoofCondition}
            />
            <MyTextInput
              title="Total Area of Roof (Sq. m)"
              placeholder="Enter Total Roof Area"
              value={totalRoofArea}
              onChangeText={setTotalRoofArea}
              keyboardType="numeric"
            />
            <MyTextInput
              title="Free Space for Solar Installation (Sq. m)"
              placeholder="Enter Free Space"
              value={freeSpaceSolar}
              onChangeText={setFreeSpaceSolar}
              keyboardType="numeric"
            />
          </ScrollView>
        )}

        {activeStep === 2 && (
          <ScrollView style={[spacing.p1]}>
            {/* LTDB */}

            <MyTextInput
              title="Age of Building (Years)"
              placeholder="Enter Age"
              value={buildingAge}
              onChangeText={setBuildingAge}
              keyboardType="numeric"
            />

            <MyTextInput
              title="Access to Roof (Staircase Available)"
              placeholder="Yes/No"
              value={roofAccess}
              onChangeText={setRoofAccess}
            />

            <MyTextInput
              title="Rooftop Height (meters)"
              placeholder="Enter Rooftop Height"
              value={rooftopHeight}
              onChangeText={setRooftopHeight}
              keyboardType="numeric"
            />

            <MyTextInput
              title="Parapet Height (meters)"
              placeholder="Enter Parapet Height"
              value={parapetHeight}
              onChangeText={setParapetHeight}
              keyboardType="numeric"
            />

            <MyTextInput
              title="Number of Floors (e.g., G+2)"
              placeholder="Enter Floors"
              value={noOfFloors}
              onChangeText={setNoOfFloors}
            />

            <MyTextInput
              title="Water Source for Cleaning"
              placeholder="Specify Water Source"
              value={waterSource}
              onChangeText={setWaterSource}
            />

            <MyTextInput
              title=" Access to Site (Road Type)"
              placeholder="Access to Site"
              onValueChange={setAccessRoadType}
              value={accessRoadType}
              keyboardType="numeric"
            />

            <MyTextInput
              title="Distance from Main Road (Km)"
              placeholder="Enter Distance"
              value={distanceFromMainRoad}
              onChangeText={setDistanceFromMainRoad}
              keyboardType="numeric"
            />
            <H4
              style={[
                typography.font14,
                typography.textBold,
                typography.fontLato,
              ]}
            >
              Is Site Feasible?
            </H4>
            <RadioButton.Group
              onValueChange={setSiteFeasible}
              value={siteFeasible}
            >
              <View style={styles.row}>
                <RadioButton.Item label="Yes" value="Yes" color="#007AFF" />
                <RadioButton.Item label="No" value="No" color="#007AFF" />
              </View>
            </RadioButton.Group>

            <UploadDocument file={file} setFile={setFile} />
            <View
              style={{
                minHeight: 150,
                justifyContent: "flex-start",
                bottom: 20,
              }}
            >
              <P
                style={[
                  typography.font14,
                  {
                    top: 30,
                  },
                ]}
              >
                Description
              </P>

              <MyTextInput
                value={description}
                onChangeText={setDescription}
                multiline={true}
                placeholder="Type here..."
                style={[
                  typography.font14,
                  {
                    lineHeight: 20,
                    fontFamily: "System",
                    minHeight: 100,
                    textAlignVertical: "top",
                    top: 12,
                  },
                ]}
              />
            </View>
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
              onPress={handleTakePhoto}
            >
              <P
                style={[
                  typography.font18,
                  typography.textBold,
                  typography.textLight,
                ]}
              >
                Take Photo
              </P>
            </TouchableOpacity>
          </ScrollView>
        )}
      </ScrollView>

      <NavigationButtons
        activeStep={activeStep}
        steps={steps}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
      />

      {/* Camera Input */}
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
    </ContainerComponent>
  );
}
