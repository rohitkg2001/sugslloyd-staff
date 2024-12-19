import React from "react";
import { View, ScrollView } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { H5 } from "../components/text";
import { spacing, typography } from "../styles";
import { useTranslation } from "react-i18next";

const TaskDetailsScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { taskDetails } = route.params;

  const renderDetailRow = (label, value) => (
    <View style={{ flexDirection: "row", paddingVertical: 8 }}>
      <H5 style={[typography.textBold]}>{label}</H5>
      <H5 style={[typography.font16, { textAlign: "right", flex: 1 }]}>
        {value || t("not_available")}
      </H5>
    </View>
  );

  return (
    <ContainerComponent>
      <MyHeader
        title={t("task_details")}
        isBack={true}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={[spacing.pv4, spacing.ph4]}>
        {taskDetails ? (
          <>
            {renderDetailRow(t("Project Id"), taskDetails.project_id)}
            {renderDetailRow(t("Site Id"), taskDetails.site_id)}
            {renderDetailRow(t("Vendor Id"), taskDetails.vendor_id)}
            {renderDetailRow(t("Task Name"), taskDetails.task_name)}
            {renderDetailRow(t("Status"), taskDetails.status)}
            {renderDetailRow(t("Start Date"), taskDetails.start_date)}
            {renderDetailRow(t("End Date"), taskDetails.end_date)}
            {renderDetailRow(t("Description"), taskDetails.description)}
            {renderDetailRow(t("Approved By"), taskDetails.approved_by)}
            {renderDetailRow(t("Image"), taskDetails.image)}
            {renderDetailRow(
              t("Materials Consumed"),
              taskDetails.materials_consumed
            )}
            {renderDetailRow(t("Activity"), taskDetails.activity)}
            {renderDetailRow(t("Engineer Id"), taskDetails.engineer_id)}
          </>
        ) : (
          <H5 style={[typography.textBold, { textAlign: "center" }]}>
            {t("no_details_available")}
          </H5>
        )}
      </ScrollView>
    </ContainerComponent>
  );
};

export default TaskDetailsScreen;
