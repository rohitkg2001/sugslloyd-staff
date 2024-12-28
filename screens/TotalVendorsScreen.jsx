import { useState } from "react";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Ionicons";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import Button from "../components/buttons/Button";
import ClickableCard1 from "../components/card/ClickableCard1";
import Filter from "../components/Filter";
import {
  LIGHT,
  ICON_LARGE,
  ICON_MEDIUM,
  spacing,
  SCREEN_WIDTH,
  styles,
  typography,
} from "../styles";
import { useTranslation } from "react-i18next";
import {
  viewVendor,
  searchVendor,
  // countVendor,
} from "../redux/actions/vendorAction";
import { H6 } from "../components/text";

export default function TotalVendorsScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const { t } = useTranslation();
  const { vendors } = useSelector((state) => state.vendor);

  const { pageTitle, data } = route.params || {
    pageTitle: "vendor_management_title",
    data: viewVendor,
  };

  // useEffect(() => {
  //   dispatch(countVendor());
  //   console.log(vendors);
  // }, [dispatch]);

  const closeFilter = () => {
    setShowBottomSheet(!showBottomSheet);
  };
  const applyFilterFromRedux = (...args) => {};

  // const handleViewDetails = (item) => {
  //   dispatch(viewVendor(item));
  //   navigation.navigate("vendorDetailScreen", {
  //     site: item,
  //     formType: "vendor",
  //   });
  // };

  return (
    <ContainerComponent>
      <MyHeader title={t(pageTitle)} isBack={true} hasIcon={true} />
      <MyFlatList
        data={vendors}
        loading={false}
        renderItem={({ item, index }) => (
          <ClickableCard1
            key={index}
            item={item}
            title={item.name}
            subtitle={item.address}
          >
            <View>
              <H6 style={[typography.font16]}>{item.contactNo}</H6>
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
              <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
            </Button>
          </View>
        )}
      />
      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("VendorFormScreen")}
      >
        <Ionicons name="add" size={ICON_LARGE} color="white" />
      </Button>
      {showBottomSheet && (
        <Filter onClose={closeFilter} onApply={applyFilterFromRedux} />
      )}
    </ContainerComponent>
  );
}
