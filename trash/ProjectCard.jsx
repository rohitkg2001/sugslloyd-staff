import { View, Image } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import * as Progress from "react-native-progress";

import { H1, H4, H5, Span, } from "../text";
import { layouts, spacing, styles, typography, LIGHT, SCREEN_WIDTH } from "../../styles/";

export default function ProjectCard({ task }) {
    return (
        <View style={[spacing.p4, spacing.br2, styles.bgInfo, spacing.mv3, layouts.card]}>
            <View style={[styles.row, { alignItems: 'center' }]}>
                <H4 style={[typography.font16, typography.textBold, typography.textLight]}>{task.title}</H4>
                <Icon name="ellipsis-vertical-outline" size={20} color={LIGHT} />
            </View>

            <H5 style={typography.textLight}>{task.time}</H5>

            <View style={[styles.row, spacing.mv4, { alignItems: 'center' }]}>
                <Span>Progress</Span>
                <Progress.Bar progress={task.progress} width={SCREEN_WIDTH / 2} color={LIGHT} />
                <Span style={typography.textLight}>{`${Math.round(task.progress * 100)}%`}</Span>
            </View>

            <View style={[styles.row, spacing.mt3, { justifyContent: 'flex-start', alignItems: 'center' }]}>
                {task.avatars.map((avatar, index) => (
                    <Image key={index} source={{ uri: avatar }} style={layouts.circle12} />
                ))}
                <H1 style={[typography.textLight, spacing.ml1]}>+{task.participants}</H1>
            </View>
        </View>
    )
}
