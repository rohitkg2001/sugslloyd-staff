import { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CardFullWidth from "../card/CardFullWidth";
import {
  LIGHT,
  PRIMARY_COLOR,
  spacing,
  styles,
  typography,
  ICON_SMALL,
} from "../../styles";
import {
  getAllTasks,
  getTaskByCategory,
} from "../../redux/actions/taskActions";

import { H5, H6 } from "../../components/text";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export default function AllTaskOverview() {
  const [rmsStatus, setRmsStatus] = useState(0);
  const [finalInspection, setFinalInspection] = useState(0);
  const [installation, setInstallation] = useState(0);
  const [doneInstallation, setDoneInstallation] = useState(0);

  const [donRMS, setDoneRMS] = useState(0);
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
    const rmsCount = tasks.filter((task) => task.activity === "RMS").length;
    const finalCount = tasks.filter(
      (task) => task.activity === "Final Inspection"
    ).length;

    setInstallation(installationCount);
    setRmsStatus(rmsCount);
    setFinalInspection(finalCount);
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
        <H5 style={[typography.font16, { marginRight: 150 }]}>
          {t("all_task_overview")}
        </H5>
      </View>
      <View style={[spacing.bbw05, spacing.mv1]} />
      <View
        style={[
          styles.row,
          spacing.pv1,
          { justifyContent: "space-between",  },
        ]}
      >
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => viewTask("Installation")}
        >
          <H6 style={typography.font14}>{t("installation")}</H6>
          <H6 style={spacing.ml2}>
            {doneInstallation}/
            <H6 style={typography.textDanger}>{installation}</H6>
          </H6>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          onPress={() => viewTask("RMS")}
        >
          <H6 style={typography.font14}>{t("rms_status")}</H6>
          <H6 style={spacing.ml1}>
            {donRMS}/<H6 style={typography.textDanger}>{rmsStatus}</H6>
          </H6>
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <H6 style={typography.font14}>{t("final_inspection")}</H6>
          <H6 style={spacing.ml2}>
            {doneFinalInspection}/
            <H6 style={typography.textDanger}>{finalInspection}</H6>
          </H6>
        </View>
      </View>
    </CardFullWidth>
  );
}
