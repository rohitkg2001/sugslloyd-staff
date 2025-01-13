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
import { H5, P } from "../../components/text";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function ProjectOverview() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const projectsArray = useSelector((state) => state.project?.projects);
  const [projectsArr, setProjectsArr] = useState([]);

  useEffect(() => {
    console.log(projectsArray)
    setProjectsArr(projectsArray);
  }, [projectsArray]);

  return (
    <CardFullWidth backgroundColor={LIGHT}>
      <View style={[styles.row, { alignItems: "center" }]}>
        <Icon name="calendar-clear" size={ICON_LARGE} color={PRIMARY_COLOR} />
        <H5 style={[typography.textBold, { marginRight: 140 }]}>
          {t("project_overview")}
        </H5>
      </View>

      <View style={[spacing.bbw05, spacing.mv2]} />

      <View style={{ flexDirection: "column" }}>
        <View
          style={[styles.row, typography.textBold, spacing.bbw05, spacing.pv3]}
        >
          <P style={[typography.textBold, { flex: 1, textAlign: "center" }]}>
            {t("project")}
          </P>
          <P style={[typography.textBold, { flex: 1, textAlign: "center" }]}>
            {t("total_sites")}
          </P>
          <P style={[typography.textBold, { flex: 1, textAlign: "center" }]}>
            {t("Completed")}
          </P>
          <P style={[typography.textBold, { flex: 1, textAlign: "center" }]}>
            {t("Pending")}
          </P>
        </View>

        {projectsArr.map((project) => (
          <TouchableOpacity
            key={project.id}
            onPress={() =>
              navigation.navigate("projectDetailScreen", { project })
            }
            style={[spacing.bbw05, spacing.pv3, { flexDirection: "row" }]}
          >
            <P style={[typography.font16, { flex: 1, textAlign: "center" }]}>
              {project.project_name}
            </P>
            <P style={[typography.font16, { flex: 1, textAlign: "center" }]}>
              {project.total_sites || 0}
            </P>
            <P style={[typography.font16, { flex: 1, textAlign: "center" }]}>
              {project.completed_sites || 0}
            </P>
            <P style={[typography.font16, { flex: 1, textAlign: "center" }]}>
              {project.pending_sites || 0}
            </P>
          </TouchableOpacity>
        ))}
      </View>
    </CardFullWidth>
  );
}
