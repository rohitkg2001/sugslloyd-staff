import { useState } from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import { H4, H5 } from "../text";
import Icon from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import ModalPopup from "../ModalPopup";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function DashboardFilter({ updateDateFilter }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Today");

  const handleDateChange = (event, date, type) => {
    if (event.type === "set" && date) {
      if (type === "start") {
        setCustomStartDate(date);
        setShowStartDatePicker(false);
        setShowEndDatePicker(true);
      } else if (type === "end") {
        setCustomEndDate(date);
        setShowEndDatePicker(false);
        updateDateFilter({
          type: "Custom",
          startDate: customStartDate,
          endDate: date,
        });
      }
    }
  };

  const handleFilterSelect = (filterType) => {
    setShowModal(false);
    setSelectedFilter(filterType);

    if (filterType === "Custom") {
      setShowStartDatePicker(true);
    } else if (filterType === "Today") {
      updateDateFilter({
        type: "Today",
        startDate: moment().startOf("day").toDate(),
        endDate: moment().endOf("day").toDate(),
      });
    } else if (filterType === "This Month") {
      updateDateFilter({
        type: "This Month",
        startDate: moment().startOf("month").toDate(),
        endDate: moment().endOf("month").toDate(),
      });
    }
  };

  return (
    <View style={{ paddingHorizontal: 12, marginTop: 8 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#f3702a",
          borderRadius: 10,
          paddingHorizontal: 12,
          paddingVertical: 8,
          justifyContent: "space-between",
          backgroundColor: "#fff",
          bottom:4,
        }}
      >
        {/* Left Text: Selected Filter */}
        <H4 style={{ color: "#f3702a", fontWeight: "bold", fontSize: 14 }}>
          {selectedFilter === "Custom" && customStartDate && customEndDate
            ? `${moment(customStartDate).format("DD MMM")} - ${moment(
                customEndDate
              ).format("DD MMM YYYY")}`
            : `${moment().format("DD MMM")}, ${t(selectedFilter)}`}
        </H4>

        {/* Right Side: Calendar icon and 'Date' */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 6,
          }}
          onPress={() => setShowModal(true)} // Show modal when clicked
        >
          <Icon name="calendar-outline" size={20} color="#f3702a" />
          <H5 style={{ marginLeft: 6, color: "#f3702a" }}>Date</H5>
        </TouchableOpacity>
      </View>

      {/* Filter Modal (Using ModalPopup) */}
      <ModalPopup
        visible={showModal}
        close={() => setShowModal(false)}
        negativeButton={t("Cancel")}
        positiveButton={t("Apply")}
        action={() => handleFilterSelect(selectedFilter)} // Apply selected filter
      >
        {["Today", "This Month", "Custom"].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={{
              paddingVertical: 12,
              borderBottomColor: "#ddd",
              borderBottomWidth: 1,
              backgroundColor:
                selectedFilter === filter ? "#f3f3f3" : "transparent",
              borderRadius: selectedFilter === filter ? 8 : 0,
            }}
            onPress={() => setSelectedFilter(filter)}
          >
            <H5 style={{ fontSize: 16, color: "#333" }}>
              {t(filter)} {/* Translation for filter names */}
            </H5>
          </TouchableOpacity>
        ))}
      </ModalPopup>

      {/* Date Pickers */}
      {showStartDatePicker && (
        <DateTimePicker
          value={customStartDate || new Date()}
          mode="date"
          display="calendar"
          onChange={(event, date) => handleDateChange(event, date, "start")}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          value={customEndDate || new Date()}
          mode="date"
          display="calendar"
          onChange={(event, date) => handleDateChange(event, date, "end")}
        />
      )}
    </View>
  );
}
