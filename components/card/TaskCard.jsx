import { View, Text } from 'react-native'
import React from 'react'
import ClickableCard1 from './ClickableCard1'
import { H5, Span, P } from '../text'
import { spacing, typography, styles } from '../../styles'


export default function TaskCard({ item, navigation, selectTargets, selectedTargets }) {
    return (
        <ClickableCard1
            key={item.id}
            index={item.id}
            title={item.site?.site_name}
            subtitle={`${item.site?.location}, ${item.site?.district}, ${item.site?.state}`}
            onPress={() => navigation.navigate("targetManagementScreen", { id: item.id })}
            onLongPressAction={(idx) => selectTargets(idx)}
            selected={selectedTargets.find(target => target.id === item.id)}
        >
            <View>
                <H5 style={[typography.font20]}>{item.activity}</H5>
                <View style={[spacing.mt1, styles.row]}>
                    <View>
                        <Span
                            style={[typography.font12, { textTransform: "capitalize" }]}
                        >
                            start date
                        </Span>
                        <P style={[typography.font12]}>{item.start_date}</P>
                    </View>
                    <View>
                        <Span
                            style={[typography.font12, { textTransform: "capitalize" }]}
                        >
                            end date
                        </Span>
                        <P style={[typography.font12]}>{item.start_date}</P>
                    </View>
                </View>
            </View>
        </ClickableCard1>
    )
}