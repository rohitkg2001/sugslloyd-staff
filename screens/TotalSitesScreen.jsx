import { View } from "react-native";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fakeDelete } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import Button from "../components/buttons/Button";
import ClickableCard from "../components/card/ClickableCard";
import Filter from "../components/Filter";
import {
  ICON_LARGE,
  ICON_MEDIUM,
  LIGHT,
  SCREEN_WIDTH,
  spacing,
  styles,
} from "../styles";
import {
  viewSite,
  searchSite,
  fetchSites,
  addSite,
} from "../redux/actions/siteActions";

import { useTranslation } from "react-i18next";

export default function TotalSitesScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const siteState = useSelector((state) => state.sites);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const searchText = siteState ? siteState.searchText : "";
  const [filteredData, setFilteredData] = useState([]);
  const { t } = useTranslation();

  const { pageTitle, data } = route.params || {
    pageTitle: t("site_management"),
    data: totalsitesData,
  };

  useEffect(() => {
    dispatch(fetchSites());
  }, [dispatch]);

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
      title: t("error"),
      message: t("total_site_screen_msg"),
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
      <MyHeader title={t(pageTitle)} isBack={true} hasIcon={true} />
      <MyFlatList
        data={filteredData}
        loading={false}
        renderItem={({ item }) => (
          <ClickableCard
            item={item}
            key={item.id}
            handleViewDetails={handleViewDetails}
            handleDelete={handleDelete}
            handleEdit={() => handleEdit(item)}
            isSite={true}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[spacing.mh1, spacing.mt1]}
        ListEmptyComponent={() => <NoRecord msg={t("no_site_msg")} />}
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
              <Ionicons
                name="options-outline"
                size={ICON_MEDIUM}
                color={LIGHT}
              />
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
      {showBottomSheet && <Filter />}
    </ContainerComponent>
  );
}
