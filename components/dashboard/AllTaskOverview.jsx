// import All react antive
import { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

// import components
import CardFullWidth from "../card/CardFullWidth";

// import Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTasks,
  getTaskByCategory,
} from "../../redux/actions/taskActions";

// import all styles
import { H6 } from "../../components/text";
import {
  LIGHT,
  PRIMARY_COLOR,
  spacing,
  styles,
  typography,
  ICON_SMALL,
} from "../../styles";


export default function AllTaskOverview() {
  const [installation, setInstallation] = useState(0);
  const [doneInstallation, setDoneInstallation] = useState(0);

  const [rmsStatus, setRmsStatus] = useState(0);
  const [doneRMS, setDoneRMS] = useState(0);

  const [finalInspection, setFinalInspection] = useState(0);
  const [doneFinalInspection, setDoneFinalInspection] = useState(0);

  const { id } = useSelector((state) => state.staff);
  const { tasks } = useSelector((state) => state.tasks);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const installationCount = tasks.filter(
      (task) => task.activity === "Installation"
    ).length;
    const doneInstallationCount = tasks.filter(
      (task) => task.activity === "Installation" && task.status === "Completed"
    ).length;

    const rmsCount = tasks.filter((task) => task.activity === "RMS").length;
    const doneRMSCount = tasks.filter(
      (task) =>
        task.activity === "RMS" && (task.vendor_id || task.image || task.pdf)
    ).length;

    const finalCount = tasks.filter(
      (task) => task.activity === "Final Inspection"
    ).length;
    const doneFinalInspectionCount = tasks.filter(
      (task) =>
        task.activity === "Final Inspection" &&
        (task.vendor_id || task.image || task.pdf)
    ).length;

    setInstallation(installationCount);
    setDoneInstallation(doneInstallationCount);

    setRmsStatus(rmsCount);
    setDoneRMS(doneRMSCount);

    setFinalInspection(finalCount);
    setDoneFinalInspection(doneFinalInspectionCount);
  }, [tasks]);

  useEffect(() => {
    dispatch(getAllTasks(id));
  }, [dispatch, id]);

  const viewTask = async (activity) => {
    await dispatch(getTaskByCategory(activity));
    navigation.navigate("taskScreen", { activity });
  };

  return (
    <CardFullWidth backgroundColor={LIGHT}>
      <View style={[styles.row, { alignItems: "center" }]}>
        <Icon name="filter" size={ICON_SMALL} color={PRIMARY_COLOR} />
        <H6
          style={[
            typography.fontLato,
            typography.textBold,
            { marginRight: 170 },
          ]}
        >
          {t("all_task_overview")}
        </H6>
      </View>
      <View style={[spacing.bbw05, spacing.mv1]} />
      <View
        style={[styles.row, spacing.pv1, { justifyContent: "space-between" }]}
      >
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => viewTask("Installation")}
        >
          <H6 style={[typography.font14, typography.fontLato]}>
            {t("installation")}
          </H6>
          <H6 style={[spacing.ml2, typography.font12]}>
            {doneInstallation}/
            <H6 style={[typography.textDanger, typography.font12]}>
              {installation}
            </H6>
          </H6>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          onPress={() => viewTask("RMS")}
        >
          <H6 style={[typography.font14, typography.fontLato]}>
            {t("rms_status")}
          </H6>
          <H6 style={[spacing.ml2, typography.font12]}>
            {doneRMS}/
            <H6 style={[typography.textDanger, typography.font12]}>
              {rmsStatus}
            </H6>
          </H6>
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <H6 style={[typography.font14, typography.fontLato]}>
            {t("final_inspection")}
          </H6>
          <H6 style={[spacing.ml2, typography.font12]}>
            {doneFinalInspection}/
            <H6 style={[typography.textDanger, typography.font12]}>
              {finalInspection}
            </H6>
          </H6>
        </View>
      </View>
    </CardFullWidth>
  );
}
