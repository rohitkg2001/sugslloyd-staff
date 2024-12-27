import { useState } from "react";
import { View } from "react-native";
import { H4, H5 } from "../text";
import { ICON_SMALL, LIGHT, SCREEN_WIDTH, spacing, styles } from "../../styles";
import Button from "../buttons/Button";
import Icon from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

export default function DashboardFilter() {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const today = useState(moment().format("DD MMM YYYY"));

  const handleDateChange = (event, date) => {
    if (event.type === "set") {
      setShowDatePicker(false);
      setSelectedDate(date);
      setToday(moment(date).format("DD MMM YYYY"));
    } else {
      setShowDatePicker(false);
    }
  };
  return (
    <>
      <View
        style={[
          styles.row,
          spacing.mh1,
          { alignItems: "center", width: SCREEN_WIDTH - 16 },
        ]}
      >
        <H4>{t("today")}</H4>
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
    </>
  );
}
