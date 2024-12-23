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
  showView,
  onEyePress,
  handleDelete,
  handleEdit,
  isSite = false,
  isVendor = false,
  isProject = false,
  isSiteData = false,
  isInventoryData = false,
  isTargetManagementData,
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
                <H6
                  style={[typography.textBold, typography.font20, spacing.pv1]}
                >
                  {item.siteName}
                </H6>

                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <P style={{ fontSize: 12, flexShrink: 1 }}>{item.location}</P>
                  <P style={{ fontSize: 12, flexShrink: 1 }}>,{item.city}</P>
                  <P style={{ fontSize: 12, flexShrink: 1 }}>,{item.state}</P>
                </View>

                <P style={[spacing.pv2]}>
                  <H6 style={[typography.textBold, typography.font14]}>
                    Site Engineer:
                  </H6>

                  <P style={{ fontSize: 16 }}> {item.siteEngineer}</P>
                </P>

                <P style={[spacing.pv1]}>
                  <H6 style={[typography.textBold, typography.font14]}>
                    Vendor:
                  </H6>

                  <P style={{ fontSize: 16 }}> {item.vendor}</P>
                </P>

                <P
                  style={{
                    fontSize: 16,
                    color: "green",
                    textAlign: "right",
                    flexShrink: 1,
                  }}
                >
                  {item.status}
                </P>
              </>
            )}

            {isInventoryData && (
              <>
                <H6 style={[typography.textBold, typography.font20]}>
                  {item.productName}
                </H6>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <P
                    style={{
                      fontWeight: "bold",
                      flexDirection: "row",
                      display: "flex",
                    }}
                  >
                    * {item.category} | *{item.sub_category}
                  </P>
                </View>
              </>
            )}

            {isTargetManagementData && (
              <>
                <View
                  style={{
                    position: "absolute",
                    top: 90,
                    right: 4,
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                    backgroundColor: (() => {
                      const currentDate = new Date();
                      const startDate = new Date(item.start_date);
                      const endDate = new Date(item.end_date);

                      if (startDate < currentDate && endDate < currentDate) {
                        // If both start and end date are in the past
                        return "red"; // Red dot for past dates
                      } else if (
                        startDate <= currentDate &&
                        endDate >= currentDate
                      ) {
                        return "orange";
                      } else if (
                        startDate > currentDate &&
                        endDate > currentDate
                      ) {
                        return "green";
                      } else {
                        return "#FF6347";
                      }
                    })(),
                  }}
                />

                <P style={[spacing.pv1]}>
                  <H6 style={[typography.textBold, typography.font16]}>
                    Site Name:
                  </H6>
                  <P style={{ fontSize: 16 }}>{item.site_name}</P>
                </P>

                <P>
                  <H6 style={[typography.textBold, typography.font16]}>
                    Location:
                  </H6>
                  <P style={[spacing.pv1, { fontSize: 16 }]}>{item.location}</P>
                </P>

                <H6
                  style={[typography.textBold, typography.font20, spacing.pv2]}
                >
                  {item.activity}
                </H6>

                <View style={[spacing.pv1, { flexDirection: "row" }]}>
                  <P style={{ fontSize: 16, color: "#020409" }}>
                    {item.start_date}
                  </P>
                  <P style={{ fontSize: 14, color: "#020409", marginLeft: 15 }}>
                    {item.end_date}
                  </P>
                </View>
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
        {showView && (
          <Button
            style={{
              position: "absolute",
              right: spacing.mr3.marginRight,
              top: 15,
              backgroundColor: "#76885B",
              padding: 4,
              borderRadius: 8,
            }}
          >
            {/* <Ionicons name="eye-outline" size={32} color="white" /> */}
            <TouchableOpacity onPress={onEyePress}>
              <Ionicons name="eye-outline" size={32} color="white" />
            </TouchableOpacity>
          </Button>
        )}
      </Card>
    </TouchableOpacity>
  );
}
