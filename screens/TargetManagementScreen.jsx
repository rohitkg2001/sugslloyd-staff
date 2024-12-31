import React, { useState, useEffect } from "react";
import { View, ScrollView, Image } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { H4, H5, H6 } from "../components/text";
import MyHeader from "../components/header/MyHeader";
import { useTranslation } from "react-i18next";
import NoRecord from "./NoRecord";
import Ionicons from "react-native-vector-icons/Ionicons";
import Tabs from "../components/Tabs";
import Button from "../components/buttons/Button";
import { SCREEN_WIDTH, spacing, styles, ICON_LARGE } from "../styles";
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
    console.log("Fetching Details")
    getCurrentTask();
    dispatch(getAllVendors());
    console.log("Details Fdtched")
  }, []);

  // const isDataAvailable = currentTarget && Object.keys(currentTarget).length > 0;
  const closeTaskInventoryScreen = () => setShowTaskInventory(false);

  useEffect(() => {
    console.log(currentTarget)
  }, [])


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
                    : currentTarget.vendor?.vendor_name}
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

            {target.completedPhotos && target.completedPhotos.length > 0 && (
              <View style={[spacing.pv4]}>
                <H6>Completed Photos</H6>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {target.completedPhotos.map((url, index) => (
                    <Image
                      key={index}
                      source={{ uri: url }}
                      style={{ width: 100, height: 100, marginRight: 10 }}
                    />
                  ))}
                </ScrollView>
              </View>
            )}
          </ScrollView>
        ) : (
          <NoRecord msg="No data found" />
        )}

        <Tabs
          tabs={[t("Inventory"), t("Progress")]}
          onTabPress={(index) => setActiveTab(index)}
        />
      </View>

      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("taskMaterialScreen")}
      >
        <Ionicons name="add" size={ICON_LARGE} color="white" />
      </Button>

      {showVendorSelection && (
        <VendorSelectionScreen onClose={() => setShowVendorSelection(false)} setVendor={(value) => setCurrentTarget({ ...currentTarget, vendor: { vendor_name: value } })} task_id={currentTarget.id} />
      )}
      {showTaskInventory && (
        <TaskInventoryScreen onClose={closeTaskInventoryScreen} />
      )}
    </ContainerComponent>
  );
};

export default TargetManagementScreen;
