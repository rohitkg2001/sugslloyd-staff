import { View, Image } from "react-native";
import { styles, spacing, layouts } from "../styles";
import H1 from "./text/H2";

export default function Avatar({ avatar, name, online = true }) {

  return (
    <View style={spacing.mr4}>
      {avatar ? (
        <Image
          source={{ uri: avatar }}
          style={[layouts.circle25, spacing.mh3, spacing.mv3]}
        />
      ) : (
        <View
          style={[layouts.circle25, spacing.mh3, spacing.mv3, layouts.center]}
        >
          <H1 style={[styles.titleText, { textTransform: "uppercase" }]}>
            {name.slice(0, 2)}
          </H1>
        </View>
      )}
      {online && (
        <View style={[styles.onlineDot, layouts.circle625, styles.bgPrimary]} />
      )}
    </View>
  );
}
