import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fakeDelete, vendors } from "../utils/faker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import Button from "../components/buttons/Button";
import ClickableCard from "../components/card/ClickableCard";
import { ICON_LARGE, spacing, styles } from "../styles";
import { useTranslation } from "react-i18next";
import {
  viewVendor,
  searchVendor,
  countVendor,
} from "../redux/actions/vendorAction";

export default function TotalVendorsScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const vendorState = useSelector((state) => state.vendors);
  const filteredVendors = vendorState?.filteredVendors || vendors;
  const searchText = vendorState?.searchText || "";
  const count = vendorState?.count || vendors.length;

  const { pageTitle, data } = route.params || {
    pageTitle: "vendor_management_title",
    data: totalVendorsData,
  };

  useEffect(() => {
    dispatch(countVendor());
  }, [dispatch]);

  const handleViewDetails = (item) => {
    dispatch(viewVendor(item));
    navigation.navigate("ViewDetailScreen", { site: item, formType: "vendor" });
  };

  const handleSearch = (text) => {
    dispatch(searchVendor(text));
  };

  const handleEdit = (item) => {
    navigation.navigate("VendorFormScreen", { vendor: item });
  };

  return (
    <ContainerComponent>
      <MyHeader title={t(pageTitle)} isBack={true} hasIcon={true} />
      <MyFlatList
        data={filteredVendors}
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
            handleEdit={() => handleEdit(item)}
            isVendor={true}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[spacing.mh2, spacing.mt1]}
        ListEmptyComponent={() => <NoRecord msg={t("norecord_msg")} />}
        ListHeaderComponent={() => (
          <SearchBar
            placeholder="Search by name, state or project code"
            value={searchText}
            onChangeText={handleSearch}
          />
        )}
      />
      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("VendorFormScreen")}
      >
        <Ionicons name="add" size={ICON_LARGE} color="white" />
      </Button>
    </ContainerComponent>
  );
}
