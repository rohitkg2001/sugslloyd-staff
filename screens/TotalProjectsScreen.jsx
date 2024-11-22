import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { spacing, styles } from "../styles";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import Button from "../components/buttons/Button";
import ClickableCard from "../components/card/ClickableCard";
import { fakeDelete } from "../utils/faker";
import { 
  fetchProjects, 
  searchProjects, 
  viewProject, 
  updateProject, 
  countProjects, 
  changeProjectStatus 
} from '../redux/actions/projectAction';

export default function TotalProjectsScreen({ navigation }) {
  const dispatch = useDispatch();
  const { filteredProjects, searchText, projectCount } = useSelector(state => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(countProjects());
  }, [dispatch]);

  const handleSearch = (text) => {
    dispatch(searchProjects(text));
  };

  const handleViewDetails = (projectData) => {
    dispatch(viewProject(projectData.id));
    navigation.navigate("ViewDetailScreen", { site: projectData });
  };

  const handleEdit = (item) => {
    navigation.navigate("EditDetailsScreen", {
      site: item,
      formType: "project",
    });
  };

  const handleUpdateProject = (updatedProject) => {
    dispatch(updateProject(updatedProject));
  };

  const handleChangeStatus = (projectId, newStatus) => {
    dispatch(changeProjectStatus(projectId, newStatus));
  };

  return (
    <View style={{ flex: 1 }}>
      <MyHeader title="Total Projects" isBack={true} hasIcon={true} />
      <Text style={styles.countText}>Total Projects: {projectCount}</Text>
      <MyFlatList
        data={filteredProjects}
        loading={false}
        renderItem={({ item }) => (
          <ClickableCard
            item={item}
            handleViewDetails={handleViewDetails}
            handleDelete={() =>
              fakeDelete({
                title: "Error!!!",
                message:
                  "You cannot delete this project. Please contact admin!",
              })
            }
            handleEdit={handleEdit}
            handleUpdateProject={handleUpdateProject}
            handleChangeStatus={(newStatus) => handleChangeStatus(item.id, newStatus)}
            isProject={true}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[spacing.mh2, spacing.mt1]}
        ListEmptyComponent={() => (
          <NoRecord msg="Oops! No projects available. Start creating or contact admin." />
        )}
        ListHeaderComponent={() => (
          <SearchBar
            placeholder="Search by project name"
            value={searchText}
            onChangeText={handleSearch}
          />
        )}
      />

      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("formScreen")}
      >
        <Ionicons name="add" size={32} color="white" />
      </Button>
    </View>
  );
}