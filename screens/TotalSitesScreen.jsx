import { View } from "react-native";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import Button from "../components/buttons/Button";
import ClickableCard1 from "../components/card/ClickableCard1";
import { ICON_LARGE, spacing, styles, typography } from "../styles";
import { fetchSites } from "../redux/actions/siteActions";

import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native-paper";

export default function TotalSitesScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { sites } = useSelector((state) => state.site);

  const { t } = useTranslation();

  const { pageTitle, data } = route.params || {
    pageTitle: t("site_management"),
    data: sites,
  };

  useEffect(() => {
    dispatch(fetchSites());
  }, [dispatch]);

  useEffect(() => {
    if (loading && Array.isArray(sites) && sites.length > 0) {
      setFilteredData(sites);
      setLoading(false);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading, sites]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ContainerComponent>
      <MyHeader title={t(pageTitle)} isBack={true} hasIcon={true} />
      <MyFlatList
        data={sites}
        loading={loading}
        renderItem={({ item, index }) => (
          <ClickableCard1
            key={index}
            item={item}
            title={item.siteName}
            subtitle={`${item.location}, ${item.city},${item.state}, `}
          >
            <View>
              <View style={[spacing.mt1, styles.row]}>
                <View>
                  <Span
                    style={[
                      typography.font16,
                      typography.fontLato,
                      { textTransform: "capitalize" },
                    ]}
                  >
                    Site Engineer
                  </Span>
                  <P style={[typography.font16, typography.fontLato]}>
                    {item.siteEngineer}
                  </P>
                </View>
                <View>
                  <Span
                    style={[
                      typography.font16,
                      typography.fontLato,
                      { textTransform: "capitalize" },
                    ]}
                  >
                    Activity
                  </Span>
                  <P style={[typography.font16, typography.fontLato]}>
                    {item.status}
                  </P>
                </View>
              </View>
            </View>
          </ClickableCard1>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[spacing.mh1, spacing.mt1]}
        ListEmptyComponent={() => <NoRecord msg={t("no_site_msg")} />}
      />

      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("sitesFormScreen")}
      >
        <Ionicons name="add" size={ICON_LARGE} color="white" />
      </Button>
    </ContainerComponent>
  );
}
