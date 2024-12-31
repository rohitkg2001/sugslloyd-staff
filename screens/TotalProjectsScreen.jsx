import { useState, useEffect } from "react";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MyHeader from "../components/header/MyHeader";
import Ionicons from "@expo/vector-icons/Ionicons";
import MyFlatList from "../components/utility/MyFlatList";
import NoRecord from "./NoRecord";
import Button from "../components/buttons/Button";
import ContainerComponent from "../components/ContainerComponent";
import { spacing, styles, ICON_LARGE, typography } from "../styles";
import { fetchProjects } from "../redux/actions/projectAction";
import { useTranslation } from "react-i18next";
import ClickableCard1 from "../components/card/ClickableCard1";
import { P, Span } from "../components/text";

export default function TotalProjectsScreen({ navigation }) {
  const dispatch = useDispatch();
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const { projects } = useSelector((state) => state.project);

  useEffect(() => {
    if (loading && Array.isArray(projects) && projects.length > 0) {
      setFilteredProjects(projects);
      setLoading(false);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [loading, projects]);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <ContainerComponent>
      <MyHeader title={t("total_projects")} isBack={true} hasIcon={true} />
      <MyFlatList
        data={filteredProjects}
        loading={loading}
        renderItem={({ item, index }) => (
          <ClickableCard1
            key={index}
            item={item}
            title={item.project_name}
            subtitle={item.work_order_number}
            // onPress={() =>
            //   navigation.navigate("projectDetailScreen", { project: item })
            // }
          >
            <View>
              <View style={[spacing.mt1, styles.row]}>
                <View>
                  <Span
                    style={[typography.font16, { textTransform: "capitalize" }]}
                  >
                    start date
                  </Span>
                  <P style={[typography.font16]}>{item.start_date}</P>
                </View>
                <View>
                  <Span
                    style={[typography.font16, { textTransform: "capitalize" }]}
                  >
                    end date
                  </Span>
                  <P style={[typography.font16]}>{item.start_date}</P>
                </View>
              </View>
            </View>
          </ClickableCard1>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          spacing.mh2,
          spacing.mt1,
          { paddingBottom: 80 },
        ]}
        ListEmptyComponent={() => <NoRecord msg={t("no_project")} />}
      />

      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("formScreen")}
      >
        <Ionicons name="add" size={ICON_LARGE} color="white" />
      </Button>
    </ContainerComponent>
  );
}
