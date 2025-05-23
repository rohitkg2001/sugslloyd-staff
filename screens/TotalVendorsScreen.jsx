// import React native
import React, { useState } from "react";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// import Components
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import ClickableCard1 from "../components/card/ClickableCard1";
import SearchBar from "../components/input/SearchBar";
// import Styles
import { spacing, typography } from "../styles";
import { H5 } from "../components/text";

export default function TotalVendorsScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { vendors } = useSelector((state) => state.vendor);
  const [searchText, setSearchText] = useState("");

  const { pageTitle } = route.params || {
    pageTitle: "vendor_management_title",
  };

  // Filter vendors based on search input
  const filteredVendors = vendors?.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ContainerComponent>
      <MyHeader title={t(pageTitle)} isBack={true} hasIcon={true} />

      {/* Search Bar */}
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        style={{ marginHorizontal: 10 }}
      />

      <MyFlatList
        // data={vendors}
        data={filteredVendors}
        loading={!vendors}
        renderItem={({ item }) => (
          <ClickableCard1
            item={item}
            title={item.name}
            subtitle={item.address}
            onPress={() =>
              navigation.navigate("vendorDetailScreen", { site: item })
            }
          >
            <View>
              <H5 style={[typography.font12, typography.fontLato]}>
                {item.contactNo}
              </H5>
            </View>
          </ClickableCard1>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[spacing.mh2, spacing.mt1]}
        ListEmptyComponent={() => (
          <NoRecord
            msg={t("There is no vendor data. Please contact the admin.")}
          />
        )}
        showSearchBar={false}
      />
    </ContainerComponent>
  );
}
