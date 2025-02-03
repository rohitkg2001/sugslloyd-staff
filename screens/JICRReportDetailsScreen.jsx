import React from "react";
import { View, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { H6, P } from "../components/text";
import { fakerData, executingAgencyData } from "../utils/faker";
import Button from "../components/buttons/Button";

import {
  ICON_LARGE,
  LIGHT,
  PRIMARY_COLOR_TRANSPARENT,
  spacing,
  styles,
  typography,
} from "../styles";

export default function JICRReportDetailsScreen({ route }) {
  const { reportData } = route.params;

  return (
    <ContainerComponent>
      <MyHeader isBack title="JICR Report Details" hasIcon />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card
          style={[
            spacing.p3,
            spacing.m3,
            {
              backgroundColor: PRIMARY_COLOR_TRANSPARENT,
            },
          ]}
        >
          <View style={[styles.row]}>
            <H6 style={[typography.textBold]}>District:</H6>
            <P>{reportData.district}</P>
          </View>

          <View style={[styles.row]}>
            <H6 style={[typography.textBold]}>Block:</H6>
            <P>{reportData.block}</P>
          </View>

          <View style={[styles.row]}>
            <H6 style={[typography.textBold]}>Panchayat:</H6>
            <P>{reportData.panchayat}</P>
          </View>

          <View style={[styles.row]}>
            <H6 style={[typography.textBold]}>Ward:</H6>
            <P>{reportData.ward}</P>
          </View>

          {/* <View>
            <View style={[styles.row, spacing.mt3]}>
              <View>
                <Span
                  style={[
                    typography.font12,
                    { textTransform: "uppercase", color: "gray" },
                  ]}
                >
                  Start date
                </Span>
                <P style={[typography.font14]}>{reportData.fromDate}</P>
              </View>
              <View>
                <Span
                  style={[
                    typography.font12,
                    { textTransform: "uppercase", color: "gray" },
                  ]}
                >
                  End date
                </Span>
                <P style={[typography.font14]}>{reportData.toDate}</P>
              </View>
            </View>
          </View> */}
        </Card>
        <View
          style={[
            spacing.m3,
            spacing.p2,
            {
              backgroundColor: LIGHT,
            },
          ]}
        >
          {executingAgencyData.map((agency, index) => (
            <View key={index}>
              <View
                style={[
                  styles.row,
                  spacing.mv2,
                  spacing.pb1,
                  spacing.bbw05,
                  spacing.bbwc1,
                ]}
              >
                <H6 style={[typography.textBold]}>Agency Name:</H6>
                <P>{agency.agencyName}</P>
              </View>

              <View
                style={[
                  styles.row,
                  spacing.mv2,
                  spacing.pb1,
                  spacing.bbw05,
                  spacing.bbwc1,
                ]}
              >
                <H6 style={[typography.textBold]}>Full Address:</H6>
                <P>{agency.fullAddress}</P>
              </View>

              <View
                style={[
                  styles.row,
                  spacing.mv2,
                  spacing.pb1,
                  spacing.bbw05,
                  spacing.bbwc1,
                ]}
              >
                <H6 style={[typography.textBold]}>Contact Person:</H6>
                <P>{agency.contactPerson}</P>
              </View>

              <View
                style={[
                  styles.row,
                  spacing.mv2,
                  spacing.pb1,
                  spacing.bbw05,
                  spacing.bbwc1,
                ]}
              >
                <H6 style={[typography.textBold]}>Mobile No:</H6>
                <P>{agency.mobileNo}</P>
              </View>
              <View
                style={[
                  styles.row,
                  spacing.mv2,
                  spacing.pb1,
                  spacing.bbw05,
                  spacing.bbwc1,
                ]}
              >
                <H6 style={[typography.textBold]}>Name of System:</H6>
                <P>{agency.nameOfSystem}</P>
              </View>
              <View
                style={[
                  styles.row,
                  spacing.mv2,
                  spacing.pb1,
                  spacing.bbw05,
                  spacing.bbwc1,
                ]}
              >
                <H6 style={[typography.textBold]}>Agreement number & Date:</H6>
                <P>{agency.agreementNumberDate}</P>
              </View>
              <View
                style={[
                  styles.row,
                  spacing.mv2,
                  spacing.pb1,
                  spacing.bbw05,
                  spacing.bbwc1,
                ]}
              >
                <H6 style={[typography.textBold]}>Capacity of System:</H6>
                <P>{agency.capacityOfSystem}</P>
              </View>
              <View
                style={[
                  styles.row,
                  spacing.mv2,
                  spacing.pb1,
                  spacing.bbw05,
                  spacing.bbwc1,
                ]}
              >
                <H6 style={[typography.textBold]}>Latitude and longitude:</H6>
                <P>
                  {agency.latitude}, {agency.longitude}
                </P>
              </View>
              <View
                style={[
                  styles.row,
                  spacing.mv2,
                  spacing.pb1,
                  spacing.bbw05,
                  spacing.bbwc1,
                ]}
              >
                <H6 style={[typography.textBold]}>Date of installation:</H6>
                <P>{agency.dateOfInstallation}</P>
              </View>
              <View
                style={[
                  styles.row,
                  spacing.mv2,
                  spacing.pb1,
                  spacing.bbw05,
                  spacing.bbwc1,
                ]}
              >
                <H6 style={[typography.textBold]}>Warrantee expire on:</H6>
                <P>{agency.warranteeExpire}</P>
              </View>
              <View
                style={[
                  styles.row,
                  spacing.mv2,
                  spacing.pb1,
                  spacing.bbw05,
                  spacing.bbwc1,
                ]}
              >
                <H6 style={[typography.textBold]}>Address:</H6>
                <P style={{ flex: 1, textAlign: "right" }}>
                  {agency.serviceCentreInfo}
                </P>
              </View>
              <View
                style={[
                  styles.row,
                  spacing.mv2,
                  spacing.pb1,
                  spacing.bbw05,
                  spacing.bbwc1,
                ]}
              >
                <H6 style={[typography.textBold, { flex: 1 }]}>
                  Post, P.S, District, State, PIN Code:
                </H6>
                <P style={{ flex: 1, textAlign: "right" }}>{agency.details}</P>
              </View>
            </View>
          ))}
        </View>

        {/* {fakerData.map((item, index) => (
          <View
            key={index}
            style={[
              spacing.p2,
              {
                backgroundColor: LIGHT,
              },
            ]}
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={[styles.row, { alignItems: "center" }]}>
                {[
                  { label: "Solar Panel No:", data: item.solarPanel },
                  { label: "Battery No:", data: item.battery },
                  { label: "Light No:", data: item.light },
                  { label: "SIM No:", data: item.sim },
                  { label: "Pole No:", data: item.pole },
                  { label: "PIN", data: item.pin },
                  { label: "State", data: item.state },
                ].map((field, fieldIndex) => (
                  <View
                    key={fieldIndex}
                    style={[
                      spacing.mr4,
                      spacing.pv2,
                      {
                        alignItems: "center",
                      },
                    ]}
                  >
                    <P style={[typography.textBold]}>{field.label}</P>

                    <View
                      style={[
                        spacing.bbw05,
                        spacing.bbwc1,
                        spacing.mv1,
                        { width: "100%" },
                      ]}
                    />
                    {field.data.split(", ").map((value, valueIndex) => (
                      <View key={valueIndex} style={{ marginVertical: 5 }}>
                        <P>{value}</P>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        ))} */}
        {fakerData.map((item, index) => (
          <View
            key={index}
            style={[
              spacing.p2,
              {
                backgroundColor: LIGHT,
              },
            ]}
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={[styles.row, { alignItems: "center" }]}>
                {[
                  { label: "District:", data: item.district },
                  { label: "Block:", data: item.block },
                  { label: "Panchayat:", data: item.panchayat },
                  { label: "Solar Panel No:", data: item.solarPanel },
                  { label: "Battery No:", data: item.battery },
                  { label: "Light No:", data: item.light },
                  { label: "SIM No:", data: item.sim },
                  { label: "Ward No:", data: item.wardNo },
                  { label: "Pole No:", data: item.pole },
                  { label: "PIN:", data: item.pin },
                  { label: "Nearest House:", data: item.nearestHouse },
                  { label: "Latitude:", data: item.latitude },
                  { label: "Longitude:", data: item.longitude },

                  { label: "State:", data: item.state },
                  {
                    label: "Date of Installation:",
                    data: item.installationDate,
                  },
                ].map((field, fieldIndex) => (
                  <View
                    key={fieldIndex}
                    style={[
                      spacing.mr4,
                      spacing.pv2,
                      {
                        alignItems: "center",
                      },
                    ]}
                  >
                    <P style={[typography.textBold]}>{field.label}</P>

                    <View
                      style={[
                        spacing.bbw05,
                        spacing.bbwc1,
                        spacing.mv1,
                        { width: "100%" },
                      ]}
                    />
                    {field.data.split(", ").map((value, valueIndex) => (
                      <View key={valueIndex} style={{ marginVertical: 5 }}>
                        <P>{value}</P>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        ))}
      </ScrollView>
      <Button style={styles.addButton}>
        <Icon name="download-outline" size={ICON_LARGE} color="white" />
      </Button>
    </ContainerComponent>
  );
}
