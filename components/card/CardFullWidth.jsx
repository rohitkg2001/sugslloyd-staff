import React from 'react'
import { View } from 'react-native'
import { spacing, styles } from '../../styles'

export default function CardFullWidth({ backgroundColor, children }) {
    return (
        <View
            style={[spacing.mv2, spacing.mh2, spacing.p3, spacing.bw05, { ...styles.cardFullWidth, backgroundColor }, spacing.br2]}>
            {children}
        </View>
    )
}