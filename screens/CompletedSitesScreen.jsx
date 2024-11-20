import { useState } from "react";
import { Alert } from "react-native";
import { totalsitesData } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { styles } from "../styles";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import MyFlatList from "../components/utility/MyFlatList";
import Button from "../components/buttons/Button";
import ClickableCard from "../components/card/ClickableCard";

const CompletedSitesScreen = ({ navigation }) => {
  const [filteredSites, setFilteredSites] = useState(totalsitesData);

  const handleEdit = (site) => {
    navigation.navigate("EditDetailsScreen", {
      site,
      formType: "site",
    });
  };


  const handleDelete = (siteToDelete) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this site?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedSites = filteredSites.filter(
              (item) => item.id !== siteToDelete.id
            );
            setFilteredSites(updatedSites);
          },
        },
      ]
    );
  };
  const handleViewDetails = (site) => {
    navigation.navigate("ViewDetailScreen", { site });
  };

  return (
    <ContainerComponent>
      <MyHeader
        title="Completed Sites"
        isBack={true}
        hasIcon={true}
        icon="ellipsis-vertical"
      />

      <MyFlatList
        data={filteredSites}
        renderItem={({ item }) => (
          <ClickableCard
            item={item}
            handleViewDetails={handleViewDetails}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isSite={true}
          />
        )}
        // TODO:
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={() => (
          <NoRecord
            msg={
              "Oops!!! There are currently no sites completed. Start completing or contact admin"
            }
          />
        )}
        ListHeaderComponent={() => (
          <SearchBar placeholder="Search by city, state or project code" />
        )}
      />

      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("sitesFormScreen")}
      >
        <Ionicons name="add" size={32} color="white" />
      </Button>
    </ContainerComponent>
  );
};

export default CompletedSitesScreen;
