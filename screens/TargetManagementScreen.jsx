import React from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { H6 } from "../components/text";
import MyHeader from "../components/header/MyHeader";
import { useTranslation } from "react-i18next";
import NoRecord from "./NoRecord";
import Ionicons from "react-native-vector-icons/Ionicons";
import MyButton from "../components/buttons/MyButton";
import Button from "../components/buttons/Button";
import {
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
  ICON_LARGE,
} from "../styles";
const TargetManagementScreen = ({ route, navigation }) => {
  const { target } = route.params || {};
  const { t } = useTranslation();

  const navigateToForm = () => {
    navigation.navigate("targetmanagementform", { target });
  };

  const isDataAvailable = target && Object.keys(target).length > 0;

  const renderDetailRow = (label, value) => (
    <View style={[styles.row, spacing.pv1]}>
      {(label === "Site Name" || label === "Location") && (
        <H6 style={[typography.textBold, { textAlign: "left", fontSize: 12 }]}>
          {label}:
        </H6>
      )}

      {label === "Activity" && (
        <H6
          style={[
            {
              position: "absolute",
              right: 0,
              bottom: 70,
              textAlign: "right",
              fontSize: 20,
            },
          ]}
        >
          {value}
        </H6>
      )}

      {label === "Start Date" && <H6 style={[typography.font16]}>{value}</H6>}
      {label === "End Date" && (
        <H6
          style={[
            {
              position: "absolute",
              right: 100,
              bottom: 13,
              fontSize: 16,
            },
          ]}
        >
          {value}
        </H6>
      )}

      {(label === "Vendor" || label === "Remark") && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <H6 style={[typography.font16]}>
            {label}: {value}
          </H6>

          <TouchableOpacity
            style={{
              left: 240,
            }}
          >
            <Ionicons name="pencil-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}

      {label !== "Start Date" &&
        label !== "End Date" &&
        label !== "Activity" &&
        label !== "Vendor" &&
        label !== "Remark" && <H6>{value}</H6>}
    </View>
  );

  const renderProjectDetails = () => (
    <>
      {renderDetailRow("Site Name", target.site_name)}
      {renderDetailRow("Location", target.location)}
      {renderDetailRow("Start Date", target.start_date)}
      {renderDetailRow("End Date", target.end_date)}
      {renderDetailRow("Activity", target.activity)}
      {renderDetailRow("Vendor", target.vendor)}
      {renderDetailRow("Remark", target.incompleteRemark)}
    </>
  );

  return (
    <ContainerComponent>
      <MyHeader title={t("Task")} hasIcon={true} isBack={true} />

      <View style={{ width: SCREEN_WIDTH - 16 }}>
        {isDataAvailable ? (
          <ScrollView>
            {renderProjectDetails()}

            {target.completedPhotos && target.completedPhotos.length > 0 && (
              <View style={[spacing.bbw05, spacing.pv4]}>
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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 16,
          }}
        >
          <MyButton title={t("Inventory")} color="#DC4C64" />
          <MyButton
            title={t("Progress")}
            onPress={() => navigation.navigate("taskMaterialScreen")}
          />
        </View>
      </View>
      <Button style={styles.addButton} onPress={() => navigation.navigate("")}>
        <Ionicons name="add" size={ICON_LARGE} color="white" />
      </Button>
    </ContainerComponent>
  );
};

export default TargetManagementScreen;
