import { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import ContainerComponent from "../components/ContainerComponent";
import { greet } from "../redux/actions/staffActions";
import MyFlatList from "../components/utility/MyFlatList";
import { H4, H5, P, Span } from "../components/text";
import CardFullWidth from "../components/card/CardFullWidth";
import StatCard from "../components/card/Statcard";
import {
  layouts,
  LIGHT,
  DARK,
  PRIMARY_COLOR,
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
  ICON_SMALL,
  ICON_MEDIUM,
  ICON_LARGE,
} from "../styles";
import {
  siteCardsForDashboard,
  vendorCardForDashboard,
  ProjectcardsForDashboard,
  projects,
  totalsitesData,
  targetManagementData,
} from "../utils/faker";
import SearchBar from "../components/input/SearchBar";
import Button from "../components/buttons/Button";
import { useTranslation } from "react-i18next";
import Filter from "../components/Filter";
import { getAllVendors, getVendorCounts } from "../redux/actions/vendorAction";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  getProjectCounts,
  viewProject,
} from "../redux/actions/projectAction";

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
  const [rmsStatus, setRmsStatus] = useState(0);
  const [finalInspection, setFinalInspection] = useState(0);
  const [totalSites, setTotalSites] = useState(0);
  const [completedSites, setCompletedSites] = useState(0);
  const [progressSites, setProgressSites] = useState(0);
  const { firstName } = useSelector((state) => state.staff);
  const projectsArray = useSelector((state) => state.project?.projects);
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
    setGreeting(greet());
    dispatch(getAllVendors());
    dispatch(fetchProjects());
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

  const showCalendar = () => {
    setShowDatePicker(true);
  };
  const closeFilter = () => {
    setShowBottomSheet(!showBottomSheet);
  };
  const applyFilterFromRedux = (...args) => {};

  const handleViewDetails = (item) => {
    console.log(item);
    dispatch(viewProject(item));
    navigation.navigate("ViewDetailScreen", { formType: "project" });
  };

  return (
    <ContainerComponent>
      <View
        style={[
          styles.row,
          spacing.m2,
          { alignItems: "center", width: SCREEN_WIDTH - 16 },
        ]}
      >
        <View>
          <H4 style={typography.textBold}>
            {greeting},{firstName}
          </H4>
          <P style={spacing.ml1}>You have {dueTasks} due tasks Today</P>
        </View>
        <TouchableOpacity
          style={[
            layouts.circle12,
            layouts.center,
            spacing.bw05,
            spacing.br5,
            { position: "relative" },
          ]}
          onPress={() => navigation.navigate("notificationScreen")}
        >
          <Icon name="notifications-outline" size={ICON_MEDIUM} color={DARK} />
          <View
            style={[
              styles.bgDanger,
              layouts.center,
              {
                position: "absolute",
                top: 0,
                right: 0,
                height: 24,
                width: 24,
                borderRadius: 12,
              },
            ]}
          >
            <Span
              style={[
                typography.textLight,
                typography.font16,
                { textAlign: "center" },
              ]}
            >
              6
            </Span>
          </View>
        </TouchableOpacity>
      </View>

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
        <View
          style={[
            styles.row,
            spacing.mh1,
            { alignItems: "center", width: SCREEN_WIDTH - 16 },
          ]}
        >
          <H4>{t("today")}</H4>
          <Button
            style={[styles.btn, styles.bgPrimary, spacing.ph3]}
            onPress={() => setShowDatePicker(true)}
          >
            <Icon name="calendar-outline" size={ICON_SMALL} color={LIGHT} />
            <H5 style={[spacing.ml1, { color: "#fff", fontWeight: "600" }]}>
              {today}
            </H5>
          </Button>
        </View>
        {/* <MyFlatList
          data={projectCounts}
          renderItem={({ item }) => (
            <StatCard
              key={item.id}
              backgroundColor={item.backgroundColor}
              tasks={item.count}
              status={t(item.status)}
              onPress={() => navigation.navigate(item.page)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={spacing.mv4}
        /> */}

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
              <P style={spacing.ml2}>{installation}</P>
            </View>
            <View style={{ alignItems: "center" }}>
              <P style={typography.textBold}>{t("rms_status")}</P>
              <P style={spacing.ml2}>{rmsStatus}</P>
            </View>
            <View style={{ alignItems: "center" }}>
              <P style={typography.textBold}>{t("final_inspection")}</P>
              <P style={spacing.ml2}>{finalInspection}</P>
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

        {/* <CardFullWidth backgroundColor={LIGHT}>
          <View style={[styles.row, { alignItems: "center" }]}>
            <Icon name="card-outline" size={ICON_LARGE} color={PRIMARY_COLOR} />
            <H5 style={[typography.textBold, { marginRight: 230 }]}>Sites</H5>
          </View>
          <View style={[spacing.bbw05, spacing.mv2]} />

          <View
            style={[
              styles.row,
              { justifyContent: "space-between", paddingVertical: 10 },
            ]}
          >
            <View style={{ alignItems: "center", textAlign: "center" }}>
              <P style={typography.textBold}>Total Sites</P>
              <P style={[typography.font20, typography.textBold, spacing.m2]}>
                {totalSites}
              </P>
            </View>

            <View style={{ alignItems: "center" }}>
              <P style={typography.textBold}>Completed Sites</P>
              <P style={[typography.font20, typography.textBold, spacing.m2]}>
                {completedSites}
              </P>
            </View>

            <View style={{ alignItems: "center" }}>
              <P style={typography.textBold}>Progress Sites</P>
              <P style={[typography.font20, typography.textBold, spacing.m2]}>
                {progressSites}
              </P>
            </View>
          </View>
        </CardFullWidth> */}

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
