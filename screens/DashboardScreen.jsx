import { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { greet } from "@actions";
import ContainerComponent from "../components/ContainerComponent";
import { greet } from "../redux/actions/staffActions";
import { H5, P } from "../components/text";
import CardFullWidth from "../components/card/CardFullWidth";

import {
  LIGHT,
  PRIMARY_COLOR,
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
  ICON_MEDIUM,
  ICON_LARGE,
} from "../styles";
import { targetManagementData } from "../utils/faker";
import SearchBar from "../components/input/SearchBar";
import Button from "../components/buttons/Button";
import { useTranslation } from "react-i18next";

import { getAllVendors, getVendorCounts } from "../redux/actions/vendorAction";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  getProjectCounts,
} from "../redux/actions/projectAction";
import DashboardFilter from "../components/filters/DashboardFilter";
import DashboardHeader from "../components/header/DashboardHeader";
export default function DashboardScreen({ navigation }) {
  const [today, setToday] = useState(moment().format("DD MMM YYYY"));
  const [dueTasks, setDueTasks] = useState(4);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [greeting, setGreeting] = useState("Good morning");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [projectCounts, setProjectCounts] = useState([]);
  const [totalVendors, setTotalVendors] = useState(0);
  const [activeVendors, setActiveVendors] = useState(0);
  const [inActiveVendors, setInActiveVendors] = useState(0);
  const [installation, setInstallation] = useState(0);
  const [doneInstallation, setDoneInstallation] = useState(0);
  const [rmsStatus, setRmsStatus] = useState(0);
  const [donRMS, setDoneRMS] = useState(0);
  const [finalInspection, setFinalInspection] = useState(0);
  const { firstName } = useSelector((state) => state.staff);
  const projectsArray = useSelector((state) => state.project?.projects);
  const { tasks } = useSelector(state => state.tasks)
  const [projectsArr, setProjectsArr] = useState([]);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getCounts = async () => {
    const { totalVendors, activeVendors, inactiveVendors } =
      await getVendorCounts();
    const projects = await getProjectCounts();

    setProjectCounts(projects);
    setActiveVendors(activeVendors);
    setTotalVendors(totalVendors);
    setInActiveVendors(inactiveVendors);
  };

  useEffect(() => {
    const installationCount = tasks.filter(task => task.activity === "Installation").length
    setInstallation(installationCount)
    const rmsCount = tasks.filter(task => task.activity === "RMS").length
    setRmsStatus(rmsCount)
    const finalCount = tasks.filter(task => task.activity === "Final Inspection").length
    setFinalInspection(finalCount)
    setDueTasks(installationCount + rmsCount + finalCount)
  }, [tasks])


  useEffect(() => {
    setGreeting(greet());
    dispatch(getAllVendors());
    dispatch(fetchProjects());
    dispatch(getAllTasks(id));
    getCounts();
  }, [projectCounts]);

  useEffect(() => {
    setProjectsArr(projectsArray);
  }, [projectsArray]);

  const handleDateChange = (event, date) => {
    if (event.type === "set") {
      setShowDatePicker(false);
      setSelectedDate(date);
      setToday(moment(date).format("DD MMM YYYY"));
    } else {
      setShowDatePicker(false);
    }
  };

  const closeFilter = () => {
    setShowBottomSheet(!showBottomSheet);
  };
  const applyFilterFromRedux = (...args) => { };

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
        <DashboardFilter />

        <CardFullWidth backgroundColor={LIGHT}>
          <View style={[styles.row, { alignItems: "center" }]}>
            <Icon
              name="calendar-clear"
              size={ICON_LARGE}
              color={PRIMARY_COLOR}
            />
            <H5 style={[typography.textBold, { marginRight: 140 }]}>
              {t("project_overview")}
            </H5>
          </View>

          <View style={[spacing.bbw05, spacing.mv2]} />

          <View style={{ flexDirection: "column" }}>
            <View
              style={[
                styles.row,
                typography.textBold,
                spacing.bbw05,
                spacing.pv3,
              ]}
            >
              <P
                style={[typography.textBold, { flex: 1, textAlign: "center" }]}
              >
                {t("project")}
              </P>
              <P
                style={[typography.textBold, { flex: 1, textAlign: "center" }]}
              >
                {t("total_sites")}
              </P>
              <P
                style={[typography.textBold, { flex: 1, textAlign: "center" }]}
              >
                {t("Completed")}
              </P>
              <P
                style={[typography.textBold, { flex: 1, textAlign: "center" }]}
              >
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
                <P
                  style={[typography.font16, { flex: 1, textAlign: "center" }]}
                >
                  {project.project_name}
                </P>
                <P
                  style={[typography.font16, { flex: 1, textAlign: "center" }]}
                >
                  {project.total_sites || 0}
                </P>
                <P
                  style={[typography.font16, { flex: 1, textAlign: "center" }]}
                >
                  {project.completed_sites || 0}
                </P>
                <P
                  style={[typography.font16, { flex: 1, textAlign: "center" }]}
                >
                  {project.pending_sites || 0}
                </P>
              </TouchableOpacity>
            ))}
          </View>
        </CardFullWidth>

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
            <View style={{ alignItems: "center" }}>
              <P style={typography.textBold}>{t("installation")}</P>
              <H5 style={spacing.ml2}>{doneInstallation}/<H5 style={typography.textDanger}>{installation}</H5></H5>
            </View>
            <View style={{ alignItems: "center" }}>
              <P style={typography.textBold}>{t("rms_status")}</P>
              <H5 style={spacing.ml2}>{donRMS}/<H5 style={typography.textDanger}>{rmsStatus}</H5></H5>
            </View>
            <View style={{ alignItems: "center" }}>
              <P style={typography.textBold}>{t("final_inspection")}</P>
              <H5 style={spacing.ml2}>{doneFinalInspection}/<H5 style={typography.textDanger}>{finalInspection}</H5></H5>
            </View>
          </View>
        </CardFullWidth>

        <CardFullWidth backgroundColor={LIGHT}>
          <View style={[styles.row, { alignItems: "center" }]}>
            <Icon
              name="tennisball-outline"
              size={ICON_LARGE}
              color={PRIMARY_COLOR}
            />
            <H5 style={[typography.textBold, { marginRight: 120 }]}>
              {t("Target Management")}
            </H5>
          </View>

          <View style={[spacing.bbw05, spacing.mv1]} />

          <View style={{ flexDirection: "column" }}>
            <View
              style={[
                styles.row,
                typography.textBold,
                spacing.bbw05,
                spacing.pv2,
              ]}
            >
              <P
                style={[typography.textBold, { flex: 1, textAlign: "center" }]}
              >
                {t("Vendor")}
              </P>
              <P
                style={[typography.textBold, { flex: 1, textAlign: "center" }]}
              >
                {t("Total")}
              </P>
              <P
                style={[typography.textBold, { flex: 1, textAlign: "center" }]}
              >
                {t("Completed")}
              </P>
              <P
                style={[typography.textBold, { flex: 1, textAlign: "center" }]}
              >
                {t("Pending")}
              </P>
            </View>

            {targetManagementData.map((data) => (
              <TouchableOpacity
                key={data.id}
                onPress={() =>
                  navigation.navigate("targetManagementScreen", {
                    target: data,
                  })
                }
              >
                <View style={[styles.row, spacing.bbw05, spacing.pv4]}>
                  <P
                    style={[
                      typography.textBold,
                      { flex: 1, textAlign: "center" },
                    ]}
                  >
                    {data.siteengineer}
                  </P>
                  <P
                    style={[
                      typography.textBold,
                      { flex: 1, textAlign: "center" },
                    ]}
                  >
                    {data.total}
                  </P>
                  <P
                    style={[
                      typography.textBold,
                      { flex: 1, textAlign: "center" },
                    ]}
                  >
                    {data.completed}
                  </P>
                  <P
                    style={[
                      typography.textBold,
                      { flex: 1, textAlign: "center" },
                    ]}
                  >
                    {data.pending}
                  </P>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </CardFullWidth>

        <CardFullWidth backgroundColor={LIGHT}>
          <View style={[styles.row, { alignItems: "center" }]}>
            <Icon
              name="person-circle"
              size={ICON_LARGE}
              color={PRIMARY_COLOR}
            />
            <H5 style={[typography.textBold, { marginRight: 200 }]}>Vendors</H5>
          </View>
          <View style={[spacing.bbw05, spacing.mv2]} />
          <View
            style={[
              styles.row,
              { justifyContent: "space-between", paddingVertical: 10 },
            ]}
          >
            <View style={{ alignItems: "center", textAlign: "center" }}>
              <P style={typography.textBold}>Total Vendors</P>
              <P style={[typography.font20, typography.textBold, spacing.m2]}>
                {totalVendors}
              </P>
            </View>

            <View style={{ alignItems: "center" }}>
              <P style={typography.textBold}>Active</P>
              <P style={[typography.font20, typography.textBold, spacing.m2]}>
                {activeVendors}
              </P>
            </View>
            <View style={{ alignItems: "center" }}>
              <P style={typography.textBold}>Inactive</P>
              <P style={[typography.font20, typography.textBold, spacing.m2]}>
                {inActiveVendors}
              </P>
            </View>
          </View>
        </CardFullWidth>
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showBottomSheet && (
        <Filter onClose={closeFilter} onApply={applyFilterFromRedux} />
      )}
    </ContainerComponent>
  );
}
