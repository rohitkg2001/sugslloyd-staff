import { View } from "react-native";
import { useSelector } from "react-redux";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import ClickableCard1 from "../components/card/ClickableCard1";
import { spacing, styles, typography } from "../styles";
import { conveyanceData } from "../utils/faker";

import { useTranslation } from "react-i18next";
import { P, Span } from "../components/text";

export default function ConveyanceCalculateScreen() {
  const { t } = useTranslation();

  return (
    <ContainerComponent>
      <MyHeader title={t("Conveyance Bill")} hasIcon={true} isBack={true} />
      <MyFlatList
        data={conveyanceData}
        renderItem={({ item, index }) => (
          <ClickableCard1
            key={index}
            item={item}
            title={`${item.pickupLocation} - ${item.dropoffLocation}`}
            subtitle={`${item.date} - ${item.time}`}
          >
            <View>
              <View
                style={[
                  spacing.mt1,
                  styles.row,
                  { justifyContent: "space-between", alignItems: "center" },
                ]}
              >
                <Span
                  style={[
                    typography.font16,
                    typography.fontLato,
                    { textTransform: "capitalize" },
                  ]}
                >
                  Price
                </Span>

                <P
                  style={[
                    typography.font20,
                    typography.fontLato,
                    typography.textBold,
                  ]}
                >
                  ₹{item.price}
                </P>
              </View>
            </View>
          </ClickableCard1>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[spacing.mh1, spacing.mt1]}
        ListEmptyComponent={() => <NoRecord msg={t("no_site_msg")} />}
      />
    </ContainerComponent>
  );
}
