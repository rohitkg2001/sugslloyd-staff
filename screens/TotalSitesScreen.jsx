import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { viewSite, searchSite } from "../redux/actions/siteActions";
import { ICON_LARGE, ICON_MEDIUM, LIGHT, SCREEN_WIDTH } from "../styles/constant";
import { View } from "react-native";

export default function TotalSitesScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const siteState = useSelector((state) => state.sites);
  const searchText = siteState ? siteState.searchText : "";
  const [filteredData, setFilteredData] = useState([]);

  const { pageTitle, data } = route.params || {
    pageTitle: "Site Management",
    data: totalsitesData,
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (text) => {
    dispatch(searchSite(text));
    const filtered = data.filter(
      (site) =>
        site.city.toLowerCase().includes(text.toLowerCase()) ||
        site.state.toLowerCase().includes(text.toLowerCase()) ||
        site.projectCode.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleViewDetails = (siteData) => {
    dispatch(viewSite(siteData));
    navigation.navigate("ViewDetailScreen", { site: siteData });
  };

  const handleDelete = () => {
    fakeDelete({
      title: "Error!!!",
      message: "You cannot delete this site. Please contact Admin!",
    });
  };

  const handleEdit = (item) => {
    navigation.navigate("EditDetailsScreen", {
      item,
      formType: "site",
    });
  };

  return (
    <ContainerComponent>
      <MyHeader title={pageTitle} isBack={true} hasIcon={true} />
      <MyFlatList
        data={filteredData}
        loading={false}
        renderItem={({ item }) => (
          <ClickableCard
            item={item}
            handleViewDetails={handleViewDetails}
            handleDelete={handleDelete}
            handleEdit={() => handleEdit(item)}
            isSite={true}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[spacing.mh1, spacing.mt1]}
        ListEmptyComponent={() => (
          <NoRecord msg="Oops! There are no sites data available. Start creating or contact admin" />
        )}
        ListHeaderComponent={() => (
          <View style={[spacing.mv4, styles.row, spacing.mh1, { alignItems: "center" }]}>
            <SearchBar
              placeholder="Search"
              style={{ width: SCREEN_WIDTH - 70 }}
            />
            <Button
              style={[styles.btn, styles.bgPrimary, spacing.mh1, { width: 50 }]}
            >
              <Ionicons name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
            </Button>
          </View>
        )}
      />

      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("sitesFormScreen")}
      >
        <Ionicons name="add" size={ICON_LARGE} color="white" />
      </Button>
    </ContainerComponent>
  );
}
