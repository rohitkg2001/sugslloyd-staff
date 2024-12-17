import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles } from "../styles";
import { H5, H6, P } from "../components/text";
import MyHeader from "../components/header/MyHeader";
import { useTranslation } from "react-i18next";
import { targetManagementData } from "../utils/faker";

const TargetManagementScreen = ({ route }) => {
  const { engineerData } = route.params;
  const { t } = useTranslation();

  return (
    <ContainerComponent>
      <MyHeader title={t("Management details")} hasIcon={true} isBack={true} />

      <View style={{ width: SCREEN_WIDTH - 16 }}>
        <ScrollView>
          {targetManagementData ? (
            <>
              {[
                { title: "Project Name", value: engineerData.projectName },
                { title: "Allocated To", value: engineerData.allocatedTo },
                { title: "Deadline", value: engineerData.deadline },
                { title: "Total Sites", value: engineerData.totalSites },
                { title: "Completed", value: engineerData.completed },
                { title: "Pending", value: engineerData.pending },
                {
                  title: "Incomplete Remark",
                  value: engineerData.incompleteRemark,
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

              {engineerData.completedPhotos && (
                <View style={[spacing.bbw05, spacing.pv4]}>
                  <H6>Completed Photos</H6>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {engineerData.completedPhotos.map((url, index) => (
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
