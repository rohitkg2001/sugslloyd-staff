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
  ICON_LARGE,
} from "../../styles";
import {
  getAllTasks,
  getTaskByCategory,
} from "../../redux/actions/taskActions";

import { H5, P } from "../../components/text";
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
        <Icon name="filter" size={ICON_LARGE} color={PRIMARY_COLOR} />
        <H5 style={[typography.textBold, { marginRight: 130 }]}>
          {t("all_task_overview")}
        </H5>
      </View>
      <View style={[spacing.bbw05, spacing.mv1]} />
      <View
        style={[
          styles.row,
          { justifyContent: "space-between", paddingVertical: 10 },
        ]}
      >
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => viewTask("Installation")}
        >
          <P style={typography.textBold}>{t("installation")}</P>
          <H5 style={spacing.ml2}>
            {doneInstallation}/
            <H5 style={typography.textDanger}>{installation}</H5>
          </H5>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => viewTask("RMS")}
        >
          <P style={typography.textBold}>{t("rms_status")}</P>
          <H5 style={spacing.ml2}>
            {donRMS}/<H5 style={typography.textDanger}>{rmsStatus}</H5>
          </H5>
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <P style={typography.textBold}>{t("final_inspection")}</P>
          <H5 style={spacing.ml2}>
            {doneFinalInspection}/
            <H5 style={typography.textDanger}>{finalInspection}</H5>
          </H5>
        </View>
      </View>
    </CardFullWidth>
  );
}
