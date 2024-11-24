import { useState } from "react";
import { View, ScrollView } from "react-native";
import { spacing, styles, LIGHT, SCREEN_WIDTH } from "../styles";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import Button from "../components/buttons/Button";
import ClickableCard from "../components/card/ClickableCard";
import { fakeDelete, project } from "../utils/faker";
import Icon from "react-native-vector-icons/Ionicons";
import { ICON_MEDIUM, ICON_LARGE } from "../styles/constant";
import { useTranslation } from "react-i18next";

export default function TotalProjectsScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(project);

  const filterProjects = (text) => {
    setSearchText(text);
    const filtered = project.filter((item) =>
      item.projectName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  const handleViewDetails = (projectData) => {
    navigation.navigate("ViewDetailScreen", { site: projectData });
  };

  const handleEdit = (item) => {
    navigation.navigate("EditDetailsScreen", {
      site: item,
      formType: "project",
    });
  };

   const { t } = useTranslation();

  return (
    <View>
      <MyHeader title={t("total_projects")} isBack={true} hasIcon={true} />
      <MyFlatList
        data={filteredProjects}
        loading={false}
        renderItem={({ item }) => (
          <ClickableCard
            item={item}
            handleViewDetails={handleViewDetails}
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
        contentContainerStyle={[spacing.mh2, spacing.mt1]}
        ListEmptyComponent={() => (
          <NoRecord msg={t("no_record_project" )}/>
        )}
        ListHeaderComponent={() => (
          <View>
            <SearchBar
              placeholder="Search"
              style={{ width: SCREEN_WIDTH - 70 }}
            />
            <Button
              style={[styles.btn, styles.bgPrimary, spacing.mh1, { width: 50 }]}
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
    </View>
  );
}
