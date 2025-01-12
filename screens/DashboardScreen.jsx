import { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import { LIGHT, SCREEN_WIDTH, spacing, styles, ICON_MEDIUM } from "../styles";
import SearchBar from "../components/input/SearchBar";
import Button from "../components/buttons/Button";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import DashboardHeader from "../components/header/DashboardHeader";
import Filter from "../components/Filter";
import ProjectOverview from "../components/dashboard/ProjectOverview";
import AllTaskOverview from "../components/dashboard/AllTaskOverview";
import TeamPerformance from "../components/dashboard/TeamPerformance";
import VendorPerformance from "../components/dashboard/VendorPerformance";
import TotalVendor from "../components/dashboard/TotalVendor";

export default function DashboardScreen({ navigation }) {
  const [dueTasks, setDueTasks] = useState(0);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [greeting, setGreeting] = useState("Good morning");
  const { firstName } = useSelector((state) => state.staff);
  const { tasks } = useSelector((state) => state.tasks);
  const { t } = useTranslation();
  const getCounts = async () => {};

  useEffect(() => {
    const installationCount = tasks.filter(
      (task) => task.activity === "Installation"
    ).length;
    const rmsCount = tasks.filter((task) => task.activity === "RMS").length;
    const finalCount = tasks.filter(
      (task) => task.activity === "Final Inspection"
    ).length;
    setDueTasks(installationCount + rmsCount + finalCount);
  }, [tasks]);

  useEffect(() => {
    setGreeting("Good morning");
    getCounts();
  }, []);

  const closeFilter = () => {
    setShowBottomSheet(!showBottomSheet);
  };

  return (
    <ContainerComponent>
      <DashboardHeader
        dueTasks={dueTasks}
        greeting={greeting}
        firstName={firstName}
        navigation={navigation}
        notificationCount={dueTasks}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={spacing.mh1}
      >
        <View
          style={[
            spacing.mv4,
            styles.row,
            spacing.mh1,
            { alignItems: "center" },
          ]}
        >
          <SearchBar
            placeholder={t("placeholder")}
            style={{ width: SCREEN_WIDTH - 70 }}
          />
          <Button
            style={[styles.btn, styles.bgPrimary, spacing.mh1, { width: 50 }]}
            onPress={() => setShowBottomSheet(!showBottomSheet)}
          >
            <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
          </Button>
        </View>
        <ProjectOverview />
        <AllTaskOverview />
        <VendorPerformance />
        <TeamPerformance />
        <TotalVendor />
      </ScrollView>
      {showBottomSheet && <Filter onClose={closeFilter} onApply={() => {}} />}
    </ContainerComponent>
  );
}
