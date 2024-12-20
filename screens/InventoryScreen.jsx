import { useEffect, useState } from "react";
import { View } from "react-native";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import SearchBar from "../components/input/SearchBar";
import MyFlatList from "../components/utility/MyFlatList";
import { inventoryData, projects, totalsitesData } from "../utils/faker";
import InventoryCard from "../components/card/InventoryCard";
import NoRecord from "./NoRecord";
import { useTranslation } from "react-i18next";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../components/buttons/Button";
import { H4, H5 } from "../components/text";
import {
  ICON_MEDIUM,
  LIGHT,
  ICON_SMALL,
  styles,
  spacing,
  SCREEN_WIDTH,
} from "../styles";
import InventoryDetailsModal from "../components/InventoryDetailsModal";
import Filter from "../components/Filter";
import { useSelector } from "react-redux";

export default function InventoryScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [isVisible, setVisible] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [today, setToday] = useState(moment().format("DD MMM YYYY"));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { t } = useTranslation();
  const { inventory } = useSelector((state) => state.inventory);

  const closeFilter = () => {
    setShowBottomSheet(!showBottomSheet);
  };
  const applyFilterFromRedux = (...args) => {};

  const handleDateChange = (event, date) => {
    if (event.type === "set") {
      setShowDatePicker(false);
      if (date) {
        setSelectedDate(date);
        setToday(moment(date).format("DD MMM YYYY"));
      }
    } else {
      setShowDatePicker(false);
    }
  };

  const viewItem = (id) => {
    setVisible(true);
    const thisItem = inventoryData.find((item) => item.id === id);
    const thisProject = projects.find((item) => item.id === thisItem.projectId);
    const thisSite = totalsitesData.find((item) => item.id === thisItem.siteId);
    const itemDetails = { ...thisItem, ...thisProject, ...thisSite };
    setSelectedItem(itemDetails);
  };

  useEffect(() => {}, [inventory]);

  return (
    <ContainerComponent>
      <MyHeader title={t("inventory_title")} hasIcon={true} isBack={true} />

      <MyFlatList
        data={inventory}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View>
            {/* SearchBar Section */}
            <View
              style={[
                styles.row,
                spacing.mh2,
                spacing.mb2,
                { alignItems: "center", marginTop: spacing.m2 },
              ]}
            >
              <SearchBar
                value={searchText}
                onChangeText={setSearchText}
                style={{ width: SCREEN_WIDTH - 70 }}
              />
              <Button
                style={[
                  styles.btn,
                  styles.bgPrimary,
                  spacing.mh1,
                  { width: 50 },
                ]}
                onPress={() => setShowBottomSheet(!showBottomSheet)}
              >
                <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
              </Button>
            </View>

            {/* Date Selector Section */}
            <View
              style={[
                styles.row,
                spacing.m2,
                { alignItems: "center", width: SCREEN_WIDTH - 16 },
              ]}
            >
              <H4>Today</H4>
              <Button
                style={[styles.btn, styles.bgPrimary, spacing.ph3]}
                onPress={() => setShowDatePicker(true)}
              >
                <Icon name="calendar-outline" size={ICON_SMALL} color={LIGHT} />
                <H5 style={[spacing.ml1, { color: "#fff", fontWeight: "600" }]}>
                  {today}
                </H5>
              </Button>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
        )}
        ListEmptyComponent={() => <NoRecord msg={t("no_inventory")} />}
        renderItem={({ item }) => (
          <InventoryCard
            key={item.id}
            item={item}
            onPress={() => viewItem(item.id)}
          />
        )}
      />

      <InventoryDetailsModal
        visible={isVisible}
        onClose={() => setVisible(false)}
        selectedItem={selectedItem}
      />
      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("inventoryFormScreen")}
      >
        <Ionicons name="add" size={28} color="white" />
      </Button>
      {showBottomSheet && (
        <Filter onClose={closeFilter} onApply={applyFilterFromRedux} />
      )}
    </ContainerComponent>
  );
}
