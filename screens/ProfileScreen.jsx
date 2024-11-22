import { View, TouchableOpacity, Image } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { documentData, staff } from "../utils/faker";
import {
  LIGHT,
  PRIMARY_COLOR,
  styles,
  spacing,
  typography,
  SCREEN_WIDTH,
} from "../styles";
import CardFullWidth from "../components/card/CardFullWidth";
import Avatar from "../components/Avatar";
import { H6, H4 } from "../components/text";
import MyFlatList from "../components/utility/MyFlatList";

const ProfileItem = ({ iconName, label }) => {
  return (
    <View
      style={[
        styles.row,
        spacing.pv3,
        spacing.bbw05,
        { width: SCREEN_WIDTH - 20, justifyContent: "flex-start" },
      ]}
    >
      <View style={[spacing.p1, spacing.br2, spacing.bw05, spacing.mh2]}>
        <Image source={{ uri: iconName }} height={100} width={180} />
      </View>
      <View>
        <H6 style={[typography.font16, { color: "black", flex: 1 }]}>
          {label}
        </H6>
        <View
          style={[
            styles.row,
            { width: SCREEN_WIDTH - 248, justifyContent: "space-between" },
          ]}
        >
          <TouchableOpacity>
            <H4 style={typography.textInfo}>Edit </H4>
          </TouchableOpacity>
          <H4> | </H4>
          <TouchableOpacity>
            <H4 style={typography.textDanger}> Delete</H4>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <ContainerComponent>
      <MyHeader title="My Profile" isBack={true} hasIcon={true} />

      {/* Main Profile Card */}
      <CardFullWidth backgroundColor={PRIMARY_COLOR}>
        <View style={[styles.row, { alignItems: "center", marginTop: -10 }]}>
          <Avatar
            avatar={staff.image}
            name={`${staff.first_name} ${staff.last_name}`}
            online={false}
          />

          <View style={spacing.mh1}>
            <H6 style={[typography.font12, { color: LIGHT }]}>
              {staff.first_name} {staff.last_name}
            </H6>
            <H6 style={[typography.font12, { color: LIGHT }]}>{staff.email}</H6>
            <H6 style={[typography.font12, { color: LIGHT }]}>
              {staff.contactNo}
            </H6>
            <H6 style={[typography.font12, { color: LIGHT }]}>
              {staff.address}
            </H6>
          </View>
        </View>
      </CardFullWidth>

      <MyFlatList
        data={documentData}
        renderItem={({ item }, index) => (
          <ProfileItem
            key={index}
            iconName={item.documentImage}
            label={item.documentName}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </ContainerComponent>
  );
};

export default ProfileScreen;
