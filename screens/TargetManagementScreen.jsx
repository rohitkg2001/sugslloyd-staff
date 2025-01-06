import React, { useState, useEffect } from "react";
import { View, ScrollView, Image, Linking, Text } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { H4, H5, H6 } from "../components/text";
import MyHeader from "../components/header/MyHeader";
import { useTranslation } from "react-i18next";
import NoRecord from "./NoRecord";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../components/buttons/Button";
import { SCREEN_WIDTH, spacing, styles, ICON_LARGE, typography } from "../styles";
import VendorSelectionScreen from "./VendorSelectionScreen";
import TaskInventoryScreen from "./TaskInventoryScreen";
import { useDispatch, useSelector } from "react-redux";
import { getTaskById } from "../redux/actions/taskActions";
import { IconButton } from "react-native-paper";
import { getAllVendors } from "../redux/actions/vendorAction";


const TargetManagementScreen = ({ route, navigation }) => {
  const { target, id } = route.params || {};
  const [currentTarget, setCurrentTarget] = useState({
    site_name: "",
    location: "",
    activity: "",
    start_date: "",
    end_date: "",
    vendor: "",
    remarks: "",
    image: []
  });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(null);
  const [showVendorSelection, setShowVendorSelection] = useState(false);
  const [showTaskInventory, setShowTaskInventory] = useState(false);

  const getCurrentTask = async () => {
    const thisTask = await getTaskById(id);
    setCurrentTarget(thisTask.task);
  };
  useEffect(() => {
    getCurrentTask();
    dispatch(getAllVendors());
  }, []);

  const isDataAvailable = currentTarget && Object.keys(currentTarget).length > 0;
  const closeTaskInventoryScreen = () => setShowTaskInventory(false);

  useEffect(() => {
    console.log(currentTarget)
  }, [currentTarget])


  return (
    <ContainerComponent>
      <MyHeader title={t("Task")} hasIcon={true} isBack={true} />

      <View style={{ width: SCREEN_WIDTH - 16 }}>
        {isDataAvailable ? (
          <ScrollView>
            <H5
              style={{
                textAlign: "right",
                marginRight: 20,
                textTransform: "uppercase",
              }}
            >
              {currentTarget.activity}
            </H5>
            <H4>{currentTarget.site?.site_name}</H4>
            <H6>{currentTarget.site?.location}</H6>
            <H6>
              {currentTarget.start_date} - {currentTarget.end_date}
            </H6>
            <View
              style={[
                styles.row,
                spacing.mv2,
                { justifyContent: "space-between", flex: 1 },
              ]}
            >
              <H6>Vendor Name</H6>
              <View style={[styles.row, { alignItems: "center" }]}>
                <H6>
                  {!currentTarget.vendor
                    ? "................................."
                    : currentTarget.vendor?.name}
                </H6>
                <IconButton
                  onPress={() => setShowVendorSelection(true)}
                  icon={"pencil"}
                />
              </View>
            </View>
            <View
              style={[
                styles.row,
                spacing.mv2,
                { justifyContent: "space-between", flex: 1 },
              ]}
            >
              <H6>Remarks</H6>
              <View style={[styles.row, { alignItems: "center" }]}>
                <H6>
                  {!currentTarget.description
                    ? "................................."
                    : currentTarget.description}
                </H6>
                <IconButton
                  onPress={() => setShowVendorSelection(true)}
                  icon={"pencil"}
                />
              </View>
            </View>

            <View
              style={[
                styles.row,
                spacing.mv2,
                { justifyContent: "space-between", flex: 1 },
              ]}
            >
              <H6>Status</H6>
              <H6>{currentTarget.status}</H6>
            </View>

            {
              currentTarget.sites?.survey_latitude && (
                <>
                  <View
                    style={[
                      styles.row,
                      spacing.mv2,
                      { justifyContent: "space-between", flex: 1 },
                    ]}
                  >
                    <H6>Survey Status</H6>
                    <H6>Done</H6>
                  </View>
                  <View
                    style={[
                      styles.row,
                      spacing.mv2,
                      { justifyContent: "space-between", flex: 1 },
                    ]}
                  >
                    <H6>Survey Location</H6>
                    <View>
                      <H6>Lat</H6><H6>{currentTarget.sites?.survey_latitude}</H6>
                      <H6>Long</H6><H6>{currentTarget.sites?.survey_longitude}</H6>
                    </View>
                  </View>
                </>
              )
            }

            {
              currentTarget.sites?.actual_latitude && (
                <>
                  <View
                    style={[
                      styles.row,
                      spacing.mv2,
                      { justifyContent: "space-between", flex: 1 },
                    ]}
                  >
                    <H6>Task Status</H6>
                    <H6>Submitted By Vendor</H6>
                  </View>
                  <View
                    style={[
                      styles.row,
                      spacing.mv2,
                      { justifyContent: "space-between", flex: 1 },
                    ]}
                  >
                    <H6>Survey Location</H6>
                    <View>
                      <H6>Lat</H6><H6>{currentTarget.sites?.actual_latitude}</H6>
                      <H6>Long</H6><H6>{currentTarget.sites?.actual_longitude}</H6>
                    </View>
                  </View>
                </>
              )
            }


          </ScrollView>
        ) : (
          <NoRecord msg="No data found" />
        )}

        {
          Array.isArray(currentTarget.image) && currentTarget.image.map((item, index) => {
            const uri = item;
            const extension = uri.split('.').pop();
            console.log(extension);
            // Logic to get extension and if extension is pdf then provide link to download otherwise show image
            if (extension === 'pdf') {
              return (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Button style={[styles.btn, styles.bgPrimary, { justifyContent: 'center' }]} onPress={() => Linking.openURL(uri)}>
                    <Text style={[styles.btnText, typography.font16, typography.textLight]}>View PDF</Text></Button>
                </View>
              )
            } else {
              return (
                <Image key={index} source={{ uri: uri }} style={{ width: 100, height: 100 }} />
              )
            }

          }
          )
        }
      </View>

      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("taskMaterialScreen")}
      >
        <Ionicons name="add" size={ICON_LARGE} color="white" />
      </Button>

      {showVendorSelection && (
        <VendorSelectionScreen onClose={() => setShowVendorSelection(false)} setVendor={(value) => setCurrentTarget({ ...currentTarget, vendor: { name: value } })} task_id={currentTarget.id} />
      )}
      {showTaskInventory && (
        <TaskInventoryScreen onClose={closeTaskInventoryScreen} />
      )}
    </ContainerComponent>
  );
};

export default TargetManagementScreen;
