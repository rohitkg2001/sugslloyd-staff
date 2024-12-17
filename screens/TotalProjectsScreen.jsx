import { useState, useEffect } from "react";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import Button from "../components/buttons/Button";
import ClickableCard from "../components/card/ClickableCard";
import { fakeDelete } from "../utils/faker";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import Filter from "../components/Filter";
import {
  spacing,
  styles,
  LIGHT,
  SCREEN_WIDTH,
  ICON_MEDIUM,
  ICON_LARGE,
} from "../styles";
import {
  fetchProjects,
  searchProjects,
  viewProject,
} from "../redux/actions/projectAction";
import { useTranslation } from "react-i18next";

export default function TotalProjectsScreen({ navigation }) {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const { projects } = useSelector((state) => state.project);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  useEffect(() => {
    if (loading && Array.isArray(projects) && projects.length > 0) {
      setFilteredProjects(projects);
      setLoading(false);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading, projects]);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleViewDetails = (item) => {
    dispatch(viewProject(item));
    navigation.navigate("targetManagementScreen", { formType: "project" });
  };

  const handleSearch = (text) => {
    setSearchText(text);
    dispatch(searchProjects(text));
  };

  const handleEdit = (item) => {
    navigation.navigate("EditDetailsScreen", {
      site: item,
      formType: "project",
    });
  };
  const closeFilter = () => {
    setShowBottomSheet(!showBottomSheet);
  };
  const applyFilterFromRedux = (...args) => {};
  return (
    <ContainerComponent>
      <MyHeader title={t("total_projects")} isBack={true} hasIcon={true} />
      <MyFlatList
        data={filteredProjects}
        loading={loading}
        renderItem={({ item }) => (
          <ClickableCard
            item={item}
            key={item.id}
            handleViewDetails={(item) => handleViewDetails(item.id)}
            handleDelete={() =>
              fakeDelete({
                title: t("error"),
                message: t("error_msg"),
              })
            }
            handleEdit={handleEdit}
            isProject={true}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          spacing.mh2,
          spacing.mt1,
          { paddingBottom: 80 },
        ]}
        ListEmptyComponent={() => <NoRecord msg={t("no_project")} />}
        ListHeaderComponent={() => (
          <View
            style={[
              spacing.mv4,
              styles.row,
              spacing.mh1,
              { alignItems: "center" },
            ]}
          >
            <SearchBar
              placeholder="Search"
              style={{ width: SCREEN_WIDTH - 70 }}
            />
            <Button
              style={[styles.btn, styles.bgPrimary, spacing.mh1, { width: 50 }]}
              onPress={() => setShowBottomSheet(!showBottomSheet)}
            >
              <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
            </Button>
          </View>
        )}
      />

      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("formScreen")}
      >
        <Ionicons name="add" size={ICON_LARGE} color="white" />
      </Button>
      {/* {showBottomSheet && <Filter />} */}
      {showBottomSheet && (
        <Filter onClose={closeFilter} onApply={applyFilterFromRedux} />
      )}
    </ContainerComponent>
  );
}
