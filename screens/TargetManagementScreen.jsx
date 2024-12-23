import React from "react";
import { View, ScrollView, Image } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { SCREEN_WIDTH, spacing, styles, typography } from "../styles";
import { H5, H6, P, H2 } from "../components/text";
import MyHeader from "../components/header/MyHeader";
import { useTranslation } from "react-i18next";
import NoRecord from "./NoRecord";
import Button from "../components/buttons/Button";

const TargetManagementScreen = ({ route, navigation }) => {
  const { target } = route.params || {};
  const { t } = useTranslation();

  const navigateToForm = () => {
    navigation.navigate("targetmanagementform", { target });
  };

  const isDataAvailable = target && Object.keys(target).length > 0;

  return (
    <ContainerComponent>
      <MyHeader title={t("Task")} hasIcon={true} isBack={true} />

      <View style={{ width: SCREEN_WIDTH - 16 }}>
        {isDataAvailable ? (
          <ScrollView>
            {[
              { title: "Site Name", value: target.site_name },
              { title: "Location", value: target.location },
              { title: "Start Date", value: target.start_date },
              { title: "End Date", value: target.end_date },
              { title: "Total Sites", value: target.totalSites },
              { title: "Activity", value: target.activity },
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
          </ScrollView>
        ) : (
          <NoRecord msg="No data found" />
        )}
      </View>
      <Button
        style={[styles.btn, styles.bgPrimary, { justifyContent: "center" }]}
        onPress={navigateToForm}
      >
        <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
          Assign to Vendor
        </H2>
      </Button>
    </ContainerComponent>
  );
};

export default TargetManagementScreen;
