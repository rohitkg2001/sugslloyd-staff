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
//import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

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
    } catch (err) {}
  };

  useEffect(() => {
    getAndSetCurrentLocation();
  }, []);

  return (
    <ContainerComponent>
      <MyHeader title={t("submit_task")} isBack={true} hasIcon={true} />

      {/* <View style={[{ flex: 1, width: SCREEN_WIDTH - -40 }]}>
        <ProgressSteps
          completedStepIconColor="#4BB543"
          activeStepIconBorderColor="#4BB543"
          activeLabelColor="#4BB543"
          completedLabelColor="#4BB543"
          labelFontSize={12}
          activeStepIconSize={22}
          completedStepIconSize={22}
          disabledStepIconSize={20}
          marginBottom={20}
        >
         
          <ProgressStep label="Basic Info">
            <ScrollView style={[spacing.p2]}>
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

              <H4
                style={[
                  typography.font14,
                  typography.fontLato,
                  //  typography.textBold,
                ]}
              >
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

              <H4
                style={[
                  typography.font14,
                  typography.fontLato,
                  //  typography.textBold,
                ]}
              >
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
                // style={{ marginBottom: 15 }}
              />
            </ScrollView>
          </ProgressStep>

         
          <ProgressStep label="Meter Details">
            <ScrollView style={{ padding: 10 }}>
              <MyTextInput
                value={meterNo}
                onChangeText={setMeterNo}
                placeholder="Enter Meter No."
                title="Meter No."
                // style={{ marginBottom: 15 }}
              />
              <H4
                style={[
                  typography.font14,
                  typography.fontLato,
                  //  typography.textBold,
                ]}
              >
                Meter Type
              </H4>
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

              <H4
                style={[
                  typography.font14,
                  typography.fontLato,
                  //  typography.textBold,
                ]}
              >
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

              <MyTextInput
                value={loadKW}
                onChangeText={setLoadKW}
                placeholder="Enter Load (KW)"
                title="Load (KW)"
                // style={{ marginBottom: 15 }}
              />
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

              <H4
                style={[
                  typography.font14,
                  typography.fontLato,
                  //  typography.textBold,
                ]}
              >
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
            </ScrollView>
          </ProgressStep>

         
          <ProgressStep label="Grid Info">
            <ScrollView style={{ padding: 10 }}>
              <H4
                style={[
                  typography.font14,
                  typography.fontLato,
                  //  typography.textBold,
                ]}
              >
                LTDB
              </H4>
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
                //  style={{ marginBottom: 15 }}
              />
              <MyTextInput
                title="DG Set Make"
                placeholder="Enter DG Set Make"
                value={dgMake}
                onChangeText={setDgMake}
              />
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
            </ScrollView>
          </ProgressStep>

        
          <ProgressStep label="Submit" removeBtnRow={true}>
            <ScrollView style={{ padding: 10 }}>
              <MyTextInput
                title="Free Space for Solar Installation (Sq. m)"
                placeholder="Enter Free Space"
                value={freeSpaceSolar}
                onChangeText={setFreeSpaceSolar}
                keyboardType="numeric"
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
          </ProgressStep>
        </ProgressSteps>
      </View> */}

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
