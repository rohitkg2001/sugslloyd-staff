import { View, Text } from "react-native";
import React from "react";
import ClickableCard1 from "./ClickableCard1";
import { H5, H4, Span, P } from "../text";
import { spacing, typography, styles } from "../../styles";

export default function TaskCard({
  item,
  navigation,
  selectTargets,
  selectedTargets,
}) {
  return (
    <ClickableCard1
      key={item.id}
      index={item.id}
      title={item.site?.site_name}
      subtitle={`${item.site?.location}, ${item.site?.district}, ${item.site?.state}`}
      onPress={() =>
        navigation.navigate("targetManagementScreen", { id: item.id })
      }
      onLongPressAction={(idx) => selectTargets(idx)}
      selected={selectedTargets.find((target) => target.id === item.id)}
    >
      <View>
        <Span
          style={[
            typography.font10,
            typography.fontLato,
            { textTransform: "uppercase", color: "gray" },
          ]}
        >
          breda sl no
        </Span>
        <H5 style={[typography.font16, typography.fontLato]}>
          {item.site?.breda_sl_no}
        </H5>

        <H5 style={[typography.font16, typography.fontLato]}>
          {item.activity}
        </H5>

        <View style={[spacing.mt1, styles.row]}>
          <View>
            <Span
              style={[
                typography.font10,
                typography.fontLato,
                { textTransform: "uppercase", color: "gray" },
              ]}
            >
              Start date
            </Span>
            <P style={[typography.font14, typography.fontLato]}>
              {item.start_date}
            </P>
          </View>
          <View>
            <Span
              style={[
                typography.font10,
                typography.fontLato,
                { textTransform: "uppercase", color: "gray" },
              ]}
            >
              End date
            </Span>
            <P style={[typography.font14, typography.fontLato]}>
              {item.end_date}
            </P>
          </View>
        </View>
      </View>
    </ClickableCard1>
  );
}
