import { View } from "react-native";
import { H4, H5, Span } from "../components/text";
import { styles, spacing, SCREEN_WIDTH, typography } from "../styles";
const PersonalInfo = ({ data }) => {
  return (
    <View style={[spacing.mt5, spacing.mh2, { width: SCREEN_WIDTH - 16 }]}>
      <Span style={[styles.label, spacing.mb1]}>First Name</Span>
      <H4 style={[typography.textBold, typography.font16, spacing.mb2]}>
        {data.first_name}
      </H4>

      <View style={[spacing.bbw05, spacing.mv1]} />

      <Span style={[styles.label, spacing.mb1]}>Last Name</Span>
      <H4 style={[typography.textBold, typography.font16, spacing.mb2]}>
        {data.last_name}
      </H4>
      <View style={[spacing.bbw05, spacing.mv1]} />

      <Span style={[styles.label, spacing.mb1]}>Email Address</Span>
      <H4 style={[typography.textBold, typography.font16, spacing.mb2]}>
        {data.email}
      </H4>
      <View style={[spacing.bbw05, spacing.mv1]} />

      <Span style={[styles.label, spacing.mb1]}>Phone Number</Span>
      <H4 style={[typography.textBold, typography.font16, spacing.mb2]}>
        {data.contactNo}
      </H4>
      <View style={[spacing.bbw05, spacing.mv1]} />

      <Span style={[styles.label, spacing.mb1]}>Mailing address</Span>
      <H4 style={[typography.textBold, typography.font16, spacing.mb2]}>
        {data.address}
      </H4>
      <View style={[spacing.bbw05, spacing.mv1]} />

      <Span style={[styles.label, spacing.mb1]}>Date of Birth</Span>
      <H4 style={[typography.textBold, typography.font16, spacing.mb2]}>
        {data.dob}
      </H4>
      <View style={[spacing.bbw05, spacing.mv1]} />

      <Span style={[styles.label, spacing.mb1]}>Gender</Span>
      <H4
        style={[
          typography.textBold,
          typography.font16,
          spacing.mb2,
          typography.textCapitalize,
        ]}
      >
        {data.gender}
      </H4>
    </View>
  );
};

export default PersonalInfo;
