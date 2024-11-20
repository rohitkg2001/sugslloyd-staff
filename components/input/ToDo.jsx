import React from "react";
import { View } from "react-native";
import { RadioButton } from "react-native-paper";
import { styles } from "../../styles/components.styles";
import { H4, P } from "../text";

const ToDo = ({
  projects,
  setProjects,
  checkedProject,
  setCheckedProject,
  handleTaskProgress,
  setActiveStatus,
}) => {
  return (
    <View style={styles.projectList}>
      <H4>Select a Project:</H4>
      <RadioButton.Group
        onValueChange={(value) => {
          setCheckedProject(value);
          handleTaskProgress(
            projects,
            parseInt(value),
            setProjects,
            setActiveStatus
          );
        }}
        value={checkedProject}
      >
        {projects
          .filter((project) => project.status === "toDo")
          .map((project) => (
            <View style={styles.radioItem} key={project.id}>
              <RadioButton value={project.id.toString()} />
              <P>{project.title}</P>
            </View>
          ))}
      </RadioButton.Group>
    </View>
  );
};

export default ToDo;
