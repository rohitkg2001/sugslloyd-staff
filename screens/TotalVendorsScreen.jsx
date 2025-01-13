import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import ClickableCard1 from "../components/card/ClickableCard1";
import { spacing,  typography } from "../styles";
import { useTranslation } from "react-i18next";
import { H6 } from "../components/text";

export default function TotalVendorsScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { vendors } = useSelector((state) => state.vendor);

  const { pageTitle } = route.params || {
    pageTitle: "vendor_management_title",
  };

  return (
    <ContainerComponent>
      <MyHeader title={t(pageTitle)} isBack={true} hasIcon={true} />
      <MyFlatList
        data={vendors}
        loading={!vendors}
        renderItem={({ item }) => (
          <ClickableCard1
            item={item}
            title={item.name}
            subtitle={item.address}
            onPress={() =>
              navigation.navigate("vendorDetailScreen", { site: item })
            }
          >
            <View>
              <H6 style={[typography.font16]}>{item.contactNo}</H6>
            </View>
          </ClickableCard1>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[spacing.mh2, spacing.mt1]}
        ListEmptyComponent={() => (
          <NoRecord
            msg={t("There is no vendor data. Please contact the admin.")}
          />
        )}
      />
    </ContainerComponent>
  );
}
