import React from "react";
import { View } from "react-native";
import { H4, Span } from "./text";
import { styles, spacing, SCREEN_WIDTH, typography } from "../styles";

const JobInfo = ({ jobData }) => {
  return (
    <View style={[spacing.mt5, spacing.mh2, { width: SCREEN_WIDTH - 16 }]}>
      <Span style={[styles.label, spacing.mb1]}>JobTitle</Span>
      <H4 style={[typography.textBold, typography.font16, spacing.mb2]}>
        {jobData.job_title}
      </H4>

      <View style={[spacing.bbw05, spacing.mv1]} />

      <Span style={[styles.label, spacing.mb1]}>Salary</Span>
      <H4 style={[typography.textBold, typography.font16, spacing.mb2]}>
        {jobData.salary}
      </H4>

      <View style={[spacing.bbw05, spacing.mv1]} />

      <Span style={[styles.label, spacing.mb1]}>SalaryTerm</Span>
      <H4 style={[typography.textBold, typography.font16, spacing.mb2]}>
        {jobData.salary_term}
      </H4>

      <View style={[spacing.bbw05, spacing.mv1]} />

      <Span style={[styles.label, spacing.mb1]}>Date of Hire</Span>
      <H4 style={[typography.textBold, typography.font16, spacing.mb2]}>
        {jobData.Date_of_hire}
      </H4>

      <View style={[spacing.bbw05, spacing.mv1]} />
    </View>
  );
};

export default JobInfo;
