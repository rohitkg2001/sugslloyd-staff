import { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import {
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
  LIGHT,
  PRIMARY_COLOR,
  ICON_SMALL,
} from "../styles";
import { P, H5, H6 } from "../components/text";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import CardFullWidth from "../components/card/CardFullWidth";
import { getAllTasks, getTaskByCategory } from "../redux/actions/taskActions";
import {
  getVendorPerformance,
  getTaskByVendor,
} from "../redux/actions/taskActions";

import {
  getStaffPerformance,
  getTaskByEngineer,
} from "../redux/actions/taskActions";

export default function WelcomeScreen({ navigation }) {
  const { siteInfo } = useSelector((state) => state.site);
  const { id } = useSelector((state) => state.staff);
  const { tasks } = useSelector((state) => state.tasks);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const nav = useNavigation();

  const [totalTasks, setTotalTask] = useState(0);
  const [doneTotalTasks, setDoneTotalTask] = useState(0);
  const [survey, setSurvey] = useState(0);
  const [doneSurvey, setDoneSurvey] = useState(0);
  const [installed, setInstalled] = useState(0);
  const [doneInstalled, setDoneInstalled] = useState(0);

  const [staffPerformance, setStaffPerformance] = useState([]);

  useEffect(() => {
    dispatch(getAllTasks(id));
  }, [dispatch, id]);

  useEffect(() => {
    // All task overview add in code api .
    const taskCounts = tasks.reduce(
      (acc, task) => {
        if (task.activity === "TotalTask") {
          acc.totalTask++;
          if (task.vendor_id || task.image || task.pdf) acc.doneTotalTask++;
        } else if (task.activity === "Survey") {
          acc.survey++;
          if (task.vendor_id || task.image || task.pdf) acc.doneSurvey++;
        } else if (task.activity === "Installed") {
          acc.installed++;
          if (task.vendor_id || task.image || task.pdf) acc.doneInstalled++;
        }
        return acc;
      },
      {
        totalTask: 0,
        doneTotalTask: 0,
        survey: 0,
        doneSurvey: 0,
        installed: 0,
        doneInstalled: 0,
      }
    );

    setTotalTask(taskCounts.totalTask);
    setDoneTotalTask(taskCounts.doneTotalTask);
    setSurvey(taskCounts.survey);
    setDoneSurvey(taskCounts.doneSurvey);
    setInstalled(taskCounts.installed);
    setDoneInstalled(taskCounts.doneInstalled);
  }, [tasks]);

  //TeamPerformance ka API add karna hai

  useEffect(() => {
    const fetchCounts = async () => {
      const staffTargetPerformance = await getStaffPerformance();
      const updatedPerformance = staffTargetPerformance
        .map((data) => {
          const totalAlloted = data.total_alloted || 0;
          const completed = data.completed || 0;
          return {
            ...data,
            pending: totalAlloted - completed,
          };
        })
        .filter((data) => data.total_alloted > 0);
      setStaffPerformance(updatedPerformance);
    };

    // dispatch(getAllTasks(id));
    //fetchCounts();
  }, [dispatch, id]);

  // //VendorPerformance ka API Add karna hai
  const getCounts = async () => {
    try {
      const tasksByEngineer = await getVendorPerformance(id);

      const updatedPerformance = tasksByEngineer.map((data) => {
        const totalAlloted = data.total_alloted || 0;
        const completed = data.completed || 0;
        const pending = totalAlloted - completed;

        return {
          ...data,
          pending,
        };
      });

      setStaffPerformance(updatedPerformance);
    } catch (error) {
      console.error("Error fetching vendor performance:", error);
    }
  };

  useEffect(() => {
   // dispatch(getAllTasks(id));
   // getCounts();
  }, [dispatch, id]);

  return (
    <ContainerComponent>
      <MyHeader isBack title="Welcome" hasIcon />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.row,
            spacing.mt5,
            { flexWrap: "wrap", alignItems: "center" },
          ]}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("currentStreetLightScreen")}
            style={[
              spacing.br2,
              spacing.p4,
              spacing.m4,
              {
                width: SCREEN_WIDTH / 1.1,
                height: SCREEN_WIDTH / 2.5,
                alignItems: "center",
                backgroundColor: "#85c1e9",
              },
            ]}
          >
            <Image
              source={require("../assets/solar.png")}
              style={[
                spacing.mt3,
                { width: "80%", height: 80, alignSelf: "center" },
              ]}
            />
            <P
              style={[
                typography.font16,
                spacing.mt1,
                typography.textBold,
                { textAlign: "center" },
              ]}
            >
              Assign Task
            </P>
          </TouchableOpacity>
          <View style={[styles.row]}>
            <TouchableOpacity
              onPress={() => navigation.navigate("siteLocationScreen")}
              style={[
                spacing.p5,
                spacing.br2,
                spacing.m4,
                spacing.mh1,
                {
                  flex: 1,
                  height: SCREEN_WIDTH / 2.3,
                  alignItems: "center",
                  backgroundColor: "#f0b27a",
                },
              ]}
            >
              <Icon name="reader-sharp" size={75} />
              <P style={[typography.font16, spacing.mt3]}>Pending reports</P>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                spacing.p5,
                spacing.br2,
                spacing.m4,
                spacing.mh1,
                {
                  flex: 1,
                  height: SCREEN_WIDTH / 2.3,
                  alignItems: "center",
                  backgroundColor: "#1abc9c",
                },
              ]}
            >
              <Icon name="receipt" size={75} />
              <P style={[typography.font16, spacing.mt3]}>
                Generate JICR report
              </P>
            </TouchableOpacity>
          </View>
        </View>

        {/* All task OverView code hai eska API add karna hai  */}
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
              { justifyContent: "space-between" },
            ]}
          >
            <TouchableOpacity style={{ alignItems: "center" }}>
              <H6 style={typography.font14}>{"Total Tasks"}</H6>
              <H6 style={spacing.ml2}>
                {doneTotalTasks}/
                <H6 style={typography.textDanger}>{totalTasks}</H6>
              </H6>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 20 }}>
              <H6 style={typography.font14}>{t("Survey")}</H6>
              <H6 style={spacing.ml1}>
                {doneSurvey}/<H6 style={typography.textDanger}>{survey}</H6>
              </H6>
            </TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <H6 style={typography.font14}>{t("Installed")}</H6>
              <H6 style={spacing.ml2}>
                {doneInstalled}/
                <H6 style={typography.textDanger}>{installed}</H6>
              </H6>
            </View>
          </View>
        </CardFullWidth>

        {/* TeamPerformance code hai esme API add karna hai  */}
        <CardFullWidth backgroundColor={LIGHT}>
          <View style={[styles.row, { alignItems: "center" }]}>
            <Icon
              name="tennisball-outline"
              size={ICON_SMALL}
              color={PRIMARY_COLOR}
            />
            <H5 style={[typography.font16, { marginRight: 140 }]}>
              {t("Team Performance")}
            </H5>
          </View>

          <View style={[spacing.bbw05, spacing.mv1]} />

          <View style={{ flexDirection: "column" }}>
            <View style={[styles.row, spacing.bbw05, spacing.pv2]}>
              <H6 style={[typography.font14, { flex: 1, textAlign: "center" }]}>
                {t("Engineer")}
              </H6>
              <H6 style={[typography.font14, { flex: 1, textAlign: "center" }]}>
                {t("Total")}
              </H6>
              <H6 style={[typography.font14, { flex: 1, textAlign: "center" }]}>
                {t("Completed")}
              </H6>
              <H6 style={[typography.font14, { flex: 1, textAlign: "center" }]}>
                {t("Pending")}
              </H6>
            </View>

            {staffPerformance.map((data) => (
              <TouchableOpacity
                key={data.id}
                onPress={() => {
                  dispatch(getTaskByEngineer(data.id));
                  navigation.navigate("taskScreen", { engineer: data });
                }}
              >
                <View style={[styles.row, spacing.bbw05, spacing.pv4]}>
                  <H6
                    style={[
                      typography.font12,
                      { flex: 1, textAlign: "center" },
                    ]}
                  >
                    {data.name}
                  </H6>
                  <H6
                    style={[
                      typography.font12,
                      { flex: 1, textAlign: "center" },
                    ]}
                  >
                    {data.total_alloted || 0}
                  </H6>
                  <H6
                    style={[
                      typography.font12,
                      { flex: 1, textAlign: "center" },
                    ]}
                  >
                    {data.completed || 0}
                  </H6>
                  <H6
                    style={[
                      typography.font12,
                      { flex: 1, textAlign: "center" },
                    ]}
                  >
                    {data.pending || 0}
                  </H6>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </CardFullWidth>

        {/* VendorPerformance ka API add karna hai yaha per */}
        <CardFullWidth backgroundColor={LIGHT}>
          <View style={[styles.row, { alignItems: "center" }]}>
            <Icon
              name="tennisball-outline"
              size={ICON_SMALL}
              color={PRIMARY_COLOR}
            />
            <H5 style={[typography.font16, { marginRight: 130 }]}>
              {t("Vendor Performance")}
            </H5>
          </View>

          <View style={[spacing.bbw05, spacing.mv1]} />

          <View style={{ flexDirection: "column" }}>
            <View style={[styles.row, spacing.bbw05, spacing.pv2]}>
              <H6 style={[typography.font14, { flex: 1, textAlign: "center" }]}>
                {t("Engineer")}
              </H6>
              <H6 style={[typography.font14, { flex: 1, textAlign: "center" }]}>
                {t("Total")}
              </H6>
              <H6 style={[typography.font14, { flex: 1, textAlign: "center" }]}>
                {t("Completed")}
              </H6>
              <H6 style={[typography.font14, { flex: 1, textAlign: "center" }]}>
                {t("Pending")}
              </H6>
            </View>

            {staffPerformance.map((data) => (
              <TouchableOpacity
                key={data.id}
                onPress={() => {
                  dispatch(getTaskByVendor(data.id));
                }}
              >
                <View style={[styles.row, spacing.bbw05, spacing.pv2]}>
                  <H6
                    style={[
                      typography.font12,
                      { flex: 1, textAlign: "center" },
                    ]}
                  >
                    {data.name}
                  </H6>
                  <H6
                    style={[
                      typography.font12,
                      { flex: 1, textAlign: "center" },
                    ]}
                  >
                    {data.total_alloted}
                  </H6>
                  <H6
                    style={[
                      typography.font12,
                      { flex: 1, textAlign: "center" },
                    ]}
                  >
                    {data.completed || 0}
                  </H6>
                  <H6
                    style={[
                      typography.font12,
                      { flex: 1, textAlign: "center" },
                    ]}
                  >
                    {data.pending || 0}
                  </H6>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </CardFullWidth>
      </ScrollView>
    </ContainerComponent>
  );
}
