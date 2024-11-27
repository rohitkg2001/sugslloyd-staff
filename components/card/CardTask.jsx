import { View, Text, FlatList } from "react-native";
import { Card, Avatar, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { cardData } from "../../utils/faker";
import { styles } from "../../styles/components.styles";
import MyFlatList from "../utility/MyFlatList";
import { H4, Span, P } from "../text";
import { TouchableOpacity } from "react-native";
import { ICON_SMALL } from "../../styles/constant";

const CardTask = ({ task }) => {
  return (
    <TouchableOpacity>
      <Card style={styles.card}>
        <View style={[styles.row, { alignItems: "center" }]}>
          <H4>{task.title}</H4>
          <IconButton
            icon="dots-horizontal"
            size={ICON_SMALL}
            onPress={() => { }}
          />
        </View>

        <View style={[styles.row, styles.mv3]}>
          <View style={[styles.taskLabel, styles.highPriority]}>
            <Span style={styles.textLight}>{task.priority}</Span>
          </View>
          <View style={[styles.taskLabel, { backgroundColor: "#c084fc" }]}>
            <Span style={styles.textLight}>{task.status}</Span>
          </View>
        </View>
        <P>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, non
          odio. Amet, iste consectetur debitis assumenda, harum quia labore
          temporibus dolores, eius maxime quod quasi laboriosam! Quis nulla
          pariatur tempore!
        </P>

        <View style={[styles.row, styles.mv3, { alignItems: "center" }]}>
          <View style={styles.taskFooterItem}>
            <Icon name="calendar-outline" size={ICON_SMALL} color="#6b7280" />
            <P style={styles.Text}>{task.date}</P>
          </View>

          <View style={styles.taskFooterItem}>
            <Icon name="link-outline" size={ICON_SMALL} color="#6b7280" />
            <P style={styles.footerText}>{task.links}</P>
          </View>

          <View style={styles.taskFooterItem}>
            <Icon name="chatbubble-outline" size={ICON_SMALL} color="#6b7280" />
            <P style={styles.footerText}>{task.comments}</P>
          </View>

          <View style={styles.taskFooterItem}>
            {task.avatars.map((avatarUri, index) => (
              <Avatar.Image key={index} size={28} source={{ uri: avatarUri }} />
            ))}
            <P style={styles.footerText}>+{task.avatars.length}</P>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const TaskList = () => (
  <MyFlatList
    data={cardData}
    renderItem={({ item }) => <CardTask task={item} key={item.id} />}
    keyExtractor={(item) => item.id.toString()}
  />
);

export default TaskList;
