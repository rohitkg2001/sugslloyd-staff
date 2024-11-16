import { ScrollView, TouchableOpacity } from "react-native";

import { H4, H6 } from "./text";
import { layouts, spacing, styles, } from "../styles";

const DateSelector = ({ dates, activeDate, onSelectDate }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={[spacing.ph2, spacing.mv4]}
  // FIXME:Show page containing activeDate
  >
    {dates.map((date, index) => (
      <TouchableOpacity
        key={index}
        style={[spacing.mh2, spacing.p3, spacing.br2, layouts.center, date.currentDate === activeDate && styles.bgPrimary]}
        onPress={() => onSelectDate(date.currentDate)}
      >
        <H4>{date.currentDate}</H4>
        <H6>{date.currentDay}</H6>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

export default DateSelector;
