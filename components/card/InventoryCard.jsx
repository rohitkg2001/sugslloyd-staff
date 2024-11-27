import { View, TouchableOpacity, Image } from "react-native";
import { H5, P } from "../../components/text";
import { styles, spacing, SCREEN_WIDTH, LIGHT } from "../../styles";
import { useTranslation } from "react-i18next";
import { Card } from "react-native-paper";

export default function InventoryCard({ item, onPress }) {
  const { t } = useTranslation();
  return (
    <Card
      style={[
        spacing.mv1,
        spacing.mh2,
        spacing.p2,
        {
          width: SCREEN_WIDTH - 16,
          backgroundColor: LIGHT,
        },
      ]}
    >
      <TouchableOpacity
        style={[styles.row, { alignItems: "center" }]}
        onPress={onPress}
      >
        <Image
          source={{ uri: item.url }}
          style={[{ width: 72, height: 72 }, spacing.mr4, spacing.br2]}
        />

        <View style={{ flex: 1 }}>
          <H5>{item.productName}</H5>
          <P>{item.description}</P>
          <View
            style={[styles.row, spacing.mv1, { width: SCREEN_WIDTH - 120 }]}
          >
            <P>
              {t("delivered_title")}: {item.deliveryDate}
            </P>
            <P>
              {t("quantity_title")}: {item.quantityStock} {item.unit}
            </P>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
}
