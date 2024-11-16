import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { H5, H6 } from "../text";
import { styles } from "../../styles/components.styles";

const DatePickerInput = ({ title, mode, date, setDate }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios"); // Keep picker open on iOS
    setDate(currentDate);
  };

  return (
    <View style={{ marginVertical: 4 }}>
      <H5>{title}</H5>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={[styles.textInputField, { justifyContent: 'center' }]}
      >
        <H6>{date.toDateString()}</H6>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode={mode}
          display="default"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};


export default DatePickerInput;
