import { View, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { H6, P } from "../text";
import Ionicons from "react-native-vector-icons/Ionicons";
import { spacing, typography, SCREEN_WIDTH, LIGHT } from "../../styles";
import Button from "../buttons/Button";

export default function ClickableCard({
  item,
  handleViewDetails,
  hideIcons,
  showArrow,
  handleDelete,
  handleEdit,
  isSite = false,
  isVendor = false,
  isProject = false,
  isSiteData = false,
}) {
  return (
    <TouchableOpacity>
      <Card
        style={[
          spacing.mv1,
          {
            width: SCREEN_WIDTH - 22,
            backgroundColor: LIGHT,
            marginHorizontal: 4,
          },
        ]}
        onPress={() => handleViewDetails(item)}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 16 }}
        >
          <View style={{ flex: 1 }}>
            {isProject && (
              <>
                <H6 style={[typography.textBold]}>
                  Project Name: {item.project_name}
                </H6>
                <P style={{ fontSize: 14 }}>
                  Work Order Number: {item.work_order_number}
                </P>
                <P style={{ fontSize: 14 }}>Start Date: {item.start_date}</P>
                <P style={{ fontSize: 14 }}>Order Value: {item.rate}</P>

                {/* TODO: Add project specific changes */}
              </>
            )}
            {
              isSite && (
                <>
                  <H6 style={[typography.textBold]}>{item.site_name}</H6>
                  <P style={{ fontSize: 14 }}>
                    {item.location}, {item.district}
                  </P>
                </>
              )
              // {/* TODO: Add site specific changes */}
            }
            {isVendor && (
              <>
                <H6 style={[typography.textBold]}>{item.name}</H6>
                <P style={{ fontSize: 14 }}>{item.address}</P>
                <P style={{ fontSize: 14 }}>{item.contactNo}</P>

                {/* TODO: Add vendor specific changes */}
              </>
            )}
            {isSiteData && (
              <>
                <H6 style={[typography.textBold]}>
                  Site Name: {item.siteName}
                </H6>
                <P style={{ fontSize: 14 }}>Location: {item.location}</P>
                <P style={{ fontSize: 14 }}>City: {item.city}</P>
                <P style={{ fontSize: 14 }}>State: {item.state}</P>
                <P style={{ fontSize: 14 }}>vendor: {item.vendor}</P>
                <P style={{ fontSize: 14 }}>Contact No: {item.contactNo}</P>

                {/* TODO: Add vendor specific changes */}
              </>
            )}
          </View>
          {!hideIcons && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Button
                onPress={() => handleEdit(item)}
                style={{ marginRight: 12 }}
              >
                <Ionicons name="pencil-outline" size={24} color="black" />
              </Button>
              <Button onPress={() => handleDelete(item)}>
                <Ionicons name="trash-outline" size={24} color="red" />
              </Button>
            </View>
          )}
        </View>

        {showArrow && (
          <Button
            style={{
              position: "absolute",
              right: spacing.mr2.marginRight,
              top: 40,
            }}
          >
            <Ionicons name="chevron-forward-outline" size={32} color="gray" />
          </Button>
        )}
      </Card>
    </TouchableOpacity>
  );
}
