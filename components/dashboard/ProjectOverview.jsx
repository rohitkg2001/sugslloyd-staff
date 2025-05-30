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
import { H6 } from "../../components/text";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function ProjectOverview() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const projectsArray = useSelector((state) => state.project?.projects);
  const tasks = useSelector((state) => state.tasks?.tasks);

  const [projectsArr, setProjectsArr] = useState([]);

  useEffect(() => {
    // console.log(tasks);
    if (projectsArray?.length && tasks?.length) {
      const filteredProjects = projectsArray
        .map((project) => {
          const relatedTasks = tasks.filter(
            (task) => task.project_id === project.id
          );
          return {
            ...project,
            total_sites: relatedTasks.length,
            completed_sites: relatedTasks.filter(
              (task) => task.status === "Completed"
            ).length,
            pending_sites: relatedTasks.filter(
              (task) => task.status !== "Completed"
            ).length,
          };
        })
        .filter((project) => project.total_sites > 0);

      setProjectsArr(filteredProjects);
    }
  }, [projectsArray, tasks]);

  return (
    <CardFullWidth backgroundColor={LIGHT}>
      <View style={[styles.row, { alignItems: "center" }]}>
        <Icon name="calendar-clear" size={ICON_SMALL} color={PRIMARY_COLOR} />
        <H6
          style={{
            ...typography.fontLato,
            ...typography.textBold,
            marginRight: 170,
          }}
        >
          {t("project_overview")}
        </H6>
      </View>

      <View style={[spacing.bbw05, spacing.mv2]} />

      <View style={{ flexDirection: "column" }}>
        <View style={[styles.row, spacing.bbw05, spacing.pv2]}>
          <H6
            style={[
              typography.font14,
              typography.fontLato,
              { flex: 1, textAlign: "center" },
            ]}
          >
            {t("project")}
          </H6>
          <H6
            style={[
              typography.font14,
              typography.fontLato,
              { flex: 1, textAlign: "center" },
            ]}
          >
            {t("total_sites")}
          </H6>
          <H6
            style={[
              typography.font14,
              typography.fontLato,
              { flex: 1, textAlign: "center" },
            ]}
          >
            {t("Completed")}
          </H6>
          <H6
            style={[
              typography.font14,
              typography.fontLato,
              { flex: 1, textAlign: "center" },
            ]}
          >
            {t("Pending")}
          </H6>
        </View>

        {projectsArr.map((project) => (
          <TouchableOpacity
            key={project.id}
            onPress={() =>
              navigation.navigate("projectDetailScreen", { project })
            }
            style={[spacing.bbw05, spacing.pv3, { flexDirection: "row" }]}
          >
            <H6
              style={[
                typography.font10,
                typography.fontLato,
                { flex: 1, textAlign: "center" },
              ]}
            >
              {project.project_name}
            </H6>
            <H6 style={[typography.font12, { flex: 1, textAlign: "center" }]}>
              {project.total_sites || 0}
            </H6>
            <H6 style={[typography.font12, { flex: 1, textAlign: "center" }]}>
              {project.completed_sites || 0}
            </H6>
            <H6 style={[typography.font12, { flex: 1, textAlign: "center" }]}>
              {project.pending_sites || 0}
            </H6>
          </TouchableOpacity>
        ))}
      </View>
    </CardFullWidth>
  );
}
