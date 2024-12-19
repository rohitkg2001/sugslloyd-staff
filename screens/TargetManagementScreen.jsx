import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import { H5, H6, P } from "../components/text";
import MyHeader from "../components/header/MyHeader";
import { useTranslation } from "react-i18next";

const TargetManagementScreen = ({ route }) => {
  const { target } = route.params || {};
  const { t } = useTranslation();

  const isDataAvailable = target && Object.keys(target).length > 0;

  return (
    <ContainerComponent>
      <MyHeader title={t("Management details")} hasIcon={true} isBack={true} />

      <View style={{ width: SCREEN_WIDTH - 16 }}>
        <ScrollView>
          {isDataAvailable ? (
            <>
              {[
                { title: "Project Name", value: target.projectName },
                { title: "Task Name", value: target.task_name },
                { title: "Allocated To", value: target.allocatedTo },
                { title: "Deadline", value: target.deadline },
                { title: "Start Date", value: target.start_date },
                { title: "End Date", value: target.end_date },
                { title: "Total Sites", value: target.totalSites },
                { title: "Description", value: target.description },
                { title: "Approved By", value: target.approved_by },
                {
                  title: "Materials consumed",
                  value: target.materials_consumed,
                },
                { title: "Activity", value: target.activity },
                { title: "Engineer id", value: target.engineer_id },
                { title: "Completed", value: target.completed },
                { title: "Pending", value: target.pending },
                {
                  title: "Incomplete Remark",
                  value: target.incompleteRemark,
                },
              ].map((item, index) => (
                <View
                  key={index}
                  style={[styles.row, spacing.bbw05, spacing.pv3]}
                >
                  <H5 style={{ flex: 1, fontWeight: "bold" }}>{item.title}</H5>
                  <P style={{ flex: 1, textAlign: "right" }}>{item.value}</P>
                </View>
              ))}

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
            </>
          ) : (
            <View style={{ paddingVertical: 20, alignItems: "center" }}>
              <Text>No data found</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </ContainerComponent>
  );
};

export default TargetManagementScreen;
