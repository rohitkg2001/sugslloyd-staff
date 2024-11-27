import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import BottomSheet from './bottomsheet/BottomSheet'
import { SCREEN_WIDTH, spacing, styles, typography } from '../styles'
import Button from './buttons/Button'
import { H2, H1, Span } from './text'
import states from '../utils/states.json'


export default function Filter() {
  return (
    <BottomSheet>
      <View style={[spacing.mh1, spacing.bbw05, spacing.p4, { height: '16%' }]}>
        <H1 style={[typography.font16, typography.textBold]}>Apply Filter</H1>
      </View>
      {/* Header */}
      <View style={[styles.row, spacing.mt5, spacing.ml2, { height: '60%' }]}>
        <View style={[spacing.brw1, spacing.brc, { height: '100%', width: "40%" }]}>
          <TouchableOpacity style={[spacing.bbw05, spacing.p3, spacing.mh1]}>
            <Span style={typography.font16}>State</Span>
          </TouchableOpacity>
          <TouchableOpacity style={[spacing.bbw05, spacing.p3, spacing.mh1]}>
            <Span style={typography.font16}>Budget</Span>
          </TouchableOpacity>
          <TouchableOpacity style={[spacing.bbw05, spacing.p3, spacing.mh1]}>
            <Span style={typography.font16}>Project Status</Span>
          </TouchableOpacity>
          <TouchableOpacity style={[spacing.bbw05, spacing.p3, spacing.mh1]}>
            <Span style={typography.font16}>Site Status</Span>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {/* Filters based on left selection */}
          {/* array of states */}
          {
            states.states.map((state, index) =>
              <TouchableOpacity key={index} style={[spacing.bbw05, spacing.p3, spacing.mh1]}>
                <Text>{state.name}</Text>
              </TouchableOpacity>
            )
          }
        </ScrollView>
      </View>
      {/* Body */}
      <View style={[spacing.mh1, spacing.p4, styles.row, { height: '24%', width: SCREEN_WIDTH }]}>
        <Button style={[styles.btn, styles.bgDanger, { justifyContent: 'center', width: '40%' }]}>
          <H2 style={[styles.btnText, typography.textLight, styles.textLarge]}>Clear</H2>
        </Button>
        <Button style={[styles.btn, styles.bgPrimary, { justifyContent: 'center', width: '40%' }]}>
          <H2 style={[styles.btnText, typography.textLight, styles.textLarge]}>Apply</H2>
        </Button>
      </View>
      {/* Footer */}
    </BottomSheet>
  )
}