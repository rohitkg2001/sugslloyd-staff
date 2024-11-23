import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewSite, searchSite } from '../redux/actions/siteActions';
import { fakeDelete, totalsitesData } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { spacing, styles } from "../styles";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import Button from "../components/buttons/Button";
import ClickableCard from "../components/card/ClickableCard";

export default function TotalSitesScreen({ navigation, route }) {
  const { pageTitle } = route.params || { pageTitle: "Site Management" };

  const dispatch = useDispatch();

  const { filteredData, searchQuery } = useSelector((state) => state.totalSites);

  useEffect(() => {
    dispatch({ type: 'SET_SITES_DATA', payload: totalsitesData });
  }, [dispatch]);

  const handleViewDetails = (projectData) => {
    dispatch(viewSite(projectData));
    navigation.navigate("ViewDetailScreen", { site: projectData });
  };

  const handleSearch = (query) => {
    dispatch(searchSite(query)); 
  };

  return (
    <ContainerComponent>
      <MyHeader title={pageTitle} isBack={true} hasIcon={true} />
      <MyFlatList
        data={filteredData.length > 0 ? filteredData : totalsitesData} 
        renderItem={({ item }) => (
          <ClickableCard
            item={item}
            handleViewDetails={handleViewDetails}
            handleDelete={() =>
              fakeDelete({
                title: "Error!!!",
                message: "You cannot delete this site. Please contact Admin!",
              })
            }
            handleEdit={(item) =>
              navigation.navigate("EditDetailsScreen", {
                item,
                formType: "site",
              })
            }
            isSite={true}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[spacing.mh2, spacing.mt1]}
        ListEmptyComponent={() => (
          <NoRecord msg="Oops! There are no sites data available. Start creating or contact admin" />
        )}
        ListHeaderComponent={() => (
          <SearchBar
            placeholder="Search by city, state or project code"
            value={searchQuery}
            onChangeText={handleSearch} 
          />
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
}
