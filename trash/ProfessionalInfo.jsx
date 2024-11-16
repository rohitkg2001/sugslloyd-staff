import { View } from "react-native";
import { H1, H4, H5, Span } from "../components/text";
import { styles } from "../styles/components.styles";

const ProfessionalInfo = ({ professionalData }) => {
  return (
    <View style={styles.content}>
      <Span style={styles.label}>Employee ID</Span>
      <H4 style={styles.value}>{professionalData.employeeId}</H4>

      <Span style={styles.label}>Designation</Span>
      <H4 style={styles.value}>{professionalData.designation}</H4>

      <Span style={styles.label}>Company Email Address</Span>
      <H4 style={styles.value}>{professionalData.companyEmail}</H4>

      <Span style={styles.label}>Employee Type</Span>
      <H4 style={styles.value}>{professionalData.employeeType}</H4>

      <Span style={styles.label}>Department</Span>
      <H4 style={styles.value}>{professionalData.department}</H4>

      <Span style={styles.label}>Reporting Manager</Span>
      <H4 style={styles.value}>{professionalData.reportingManager}</H4>

      <Span style={styles.label}>Company Experience</Span>
      <H4 style={styles.value}>{professionalData.companyExperience}</H4>

      <Span style={styles.label}>Office Time</Span>
      <H4 style={styles.value}>{professionalData.officeTime}</H4>
    </View>
  );
};

export default ProfessionalInfo;
