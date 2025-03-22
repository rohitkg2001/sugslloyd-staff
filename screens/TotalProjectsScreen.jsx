// import All react native
import { useState, useEffect } from "react";
import { View } from "react-native";
import moment from "moment";
import { useTranslation } from "react-i18next";

// import components
import MyHeader from "../components/header/MyHeader";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import ContainerComponent from "../components/ContainerComponent";
import ClickableCard1 from "../components/card/ClickableCard1";
// import redux
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../redux/actions/projectAction";
// import Styles
import { spacing, styles, typography } from "../styles";
import { P, Span } from "../components/text";
import SearchBar from "../components/input/SearchBar";
import DashboardFilter from "../components/filters/DashboardFilter";

export default function TotalProjectsScreen({ navigation }) {
  const dispatch = useDispatch();
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const { projects } = useSelector((state) => state.project);
  const { tasks } = useSelector((state) => state.tasks);
  const [searchText, setSearchText] = useState(""); // Search text state
  const [dateFilter, setDateFilter] = useState("All");

  useEffect(() => {
    if (loading && Array.isArray(projects) && projects.length > 0) {
      const projectsWithSites = projects.filter((project) =>
        tasks.some((task) => task.project_id === project.id)
      );
      setFilteredProjects(projectsWithSites);
      setLoading(false);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading, projects, tasks]);

  let filteredData = filteredProjects.filter(
    (project) =>
      project.project_name.toLowerCase().includes(searchText.toLowerCase()) ||
      project.work_order_number.toLowerCase().includes(searchText.toLowerCase())
  );

  // Apply date filter
  if (dateFilter === "Today") {
    filteredData = filteredData.filter(
      (project) =>
        project.start_date &&
        moment(project.start_date).format("YYYY-MM-DD") ===
          moment().format("YYYY-MM-DD")
    );
  } else if (dateFilter === "This Month") {
    filteredData = filteredData.filter(
      (project) =>
        project.start_date &&
        moment(project.start_date).isSame(moment(), "month")
    );
  } else if (
    dateFilter &&
    dateFilter.type === "Custom" &&
    dateFilter.startDate &&
    dateFilter.endDate
  ) {
    filteredData = filteredData.filter(
      (project) =>
        project.start_date &&
        moment(project.start_date, "YYYY-MM-DD").isBetween(
          moment(dateFilter.startDate, "YYYY-MM-DD"),
          moment(dateFilter.endDate, "YYYY-MM-DD"),
          "day",
          "[]"
        )
    );
  }

  return (
    <ContainerComponent>
      <MyHeader title={t("total_projects")} isBack={true} hasIcon={true} />

      <DashboardFilter updateDateFilter={setDateFilter} />

      {/* Search Bar */}
      <SearchBar
        placeholder="Search by name or project code"
        value={searchText}
        onChangeText={setSearchText}
        style={{ marginHorizontal: 10 }}
      />
      <MyFlatList
        // data={filteredProjects}
        data={filteredData}
        loading={loading}
        renderItem={({ item, index }) => (
          <ClickableCard1
            key={index}
            item={item}
            title={item.project_name}
            subtitle={`${item.project_capacity} KW`}
            onPress={() =>
              navigation.navigate("projectDetailScreen", { project: item })
            }
          >
            <View>
              <P
                style={{
                  color: "gray",
                  textAlign: "right",
                  bottom: 56,
                }}
              >
                Project Code
              </P>
              <P
                style={{
                  color: "black",
                  textAlign: "right",
                  marginRight: "15",
                  bottom: 56,
                }}
              >
                {item.work_order_number}
              </P>
            </View>

            <View>
              <View style={[styles.row, { bottom: 10 }]}>
                <View>
                  <Span
                    style={[
                      typography.font12,
                      typography.fontLato,
                      { textTransform: "uppercase", color: "gray" },
                    ]}
                  >
                    Start date
                  </Span>
                  <P style={[typography.font14, typography.fontLato]}>
                    {item.start_date}
                  </P>
                </View>
                <View>
                  <Span
                    style={[
                      typography.font12,
                      typography.fontLato,
                      { textTransform: "uppercase", color: "gray" },
                    ]}
                  >
                    End date
                  </Span>
                  <P style={[typography.font14, typography.fontLato]}>
                    {item.end_date}
                  </P>
                </View>
              </View>
            </View>
          </ClickableCard1>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          spacing.mh2,
          spacing.mt1,
          { paddingBottom: 80 },
        ]}
        ListEmptyComponent={() => <NoRecord msg={t("no_project")} />}
        showSearchBar={false} // Disable SearchBar
      />
    </ContainerComponent>
  );
}
