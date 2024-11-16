import React, { useState } from "react";
import { View, Switch, Text, } from "react-native";
import { styles } from "../../styles/components.styles";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../styles/constant";
import { H5 } from "../text";

const CustomSwitch = ({ value = false, onValueChange, label = "", color = PRIMARY_COLOR }) => {
  const [switchValue, setSwitchValue] = useState(value);

  const handleToggle = (newValue) => {
    setSwitchValue(newValue);
    onValueChange && onValueChange(newValue); // Call the onValueChange prop if it exists
  };

  return (
    <View style={[styles.row, { alignItems: 'center' }]}>
      {label ? <H5 style={styles.label}>{label}</H5> : null}
      <Switch
        value={switchValue}
        onValueChange={handleToggle}
        trackColor={{ false: SECONDARY_COLOR, true: color }}
        thumbColor={switchValue ? "#ffffff" : "#f4f3f4"}
      />
    </View>
  );
};

export default CustomSwitch;
