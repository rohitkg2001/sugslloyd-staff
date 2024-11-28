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
  UPDATE_PROJECT,
  countProjects,
  changeProjectStatus,
  ADD_PROJECT,
} from "../redux/actions/projectAction";
import { useTranslation } from "react-i18next";

export default function TotalProjectsScreen ( { navigation } )
{
   const dispatch = useDispatch(); 
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();


const projects = useSelector((state) => state.project.projects); 
const filteredProjects = useSelector((state) => state.project.filteredProjects); 
const loading = useSelector((state) => state.project.loading); 

useEffect(() => {
  dispatch(fetchProjects());
}, [ dispatch ] );
  
  const handleViewDetails = (item) => {
    dispatch(viewProject(item));
    navigation.navigate("ViewDetailScreen", { site: item, formType: "project" });
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

  return (
    <ContainerComponent>
      <MyHeader title={t("total_projects")} isBack={true} hasIcon={true} />
      <MyFlatList
        data={filteredProjects}
        loading={false}
        renderItem={({ item }) => (
          <ClickableCard
            item={item}
            key={item.id}
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
    </ContainerComponent>
  );
}
