import { useState } from "react";
import { View, Modal, TouchableOpacity } from "react-native";
import { H4, H5, P } from "../text";
import {
  ICON_SMALL,
  LIGHT,
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
} from "../../styles";
import Button from "../buttons/Button";
import Icon from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

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
    <View>
      <View
        style={[
          styles.row,
          spacing.mh1,
          { alignItems: "center", width: SCREEN_WIDTH - 16 },
        ]}
      >
        {/* <H4>{t(selectedFilter)}</H4> */}

        <View>
          <H4 
            style={{
              color: "#f3702a",
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            {selectedFilter === "Custom" && customStartDate && customEndDate
              ? `${moment(customStartDate).format("DD MMM YYYY")} - ${moment(
                  customEndDate
                ).format("DD MMM YYYY")}`
              : t(selectedFilter)}
          </H4>
        </View>

        <Button
          style={[styles.btn, styles.bgPrimary, spacing.ph3]}
          onPress={() => setShowModal(true)}
        >
          <Icon name="calendar-outline" size={ICON_SMALL} color={LIGHT} />
          <H5 style={[spacing.ml1, typography.fontLato, { color: LIGHT }]}>
            {moment().format("DD MMM YYYY")}
          </H5>
        </Button>
      </View>

      {/* Filter Selection Modal */}
      <Modal
        transparent={true}
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => handleFilterSelect("Today")}>
              <View style={styles.optionButton}>
                <H5>{t("today")}</H5>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterSelect("This Month")}>
              <View style={styles.optionButton}>
                <H5>{t("this_month")}</H5>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterSelect("Custom")}>
              <View style={styles.optionButton}>
                <H5>{t("custom")}</H5>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Date Pickers */}
      {showStartDatePicker && (
        <DateTimePicker
          value={customStartDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => handleDateChange(event, date, "start")}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          value={customEndDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => handleDateChange(event, date, "end")}
        />
      )}
    </View>
  );
}
