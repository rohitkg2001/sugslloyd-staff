import { useState } from "react";
import { View } from "react-native";
import { spacing, styles } from "../styles";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import Button from "../components/buttons/Button";
import ClickableCard from "../components/card/ClickableCard";
import { fakeDelete, project } from "../utils/faker";

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

  return (
    <View>
      <MyHeader title="Total Projects" isBack={true} hasIcon={true} />
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
            onChangeText={filterProjects}
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
