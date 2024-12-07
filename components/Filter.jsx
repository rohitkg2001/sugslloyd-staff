import { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import BottomSheet from './bottomsheet/BottomSheet'
import { SCREEN_WIDTH, spacing, styles, typography, DANGER_COLOR, ICON_LARGE } from '../styles'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from './buttons/Button'
import { H2, H1, Span } from './text'
import states from '../utils/states.json'
import { useSelector } from 'react-redux'


export default function Filter({ onClose, onApply }) {
  const [filterState, setFilterState] = useState(0)
  const [selectedState, setSelectedState] = useState("")
  const [selectedProject, setSelectedProject] = useState("")
  const [rangeStartDate, setRangeStartDate] = useState(Date.now())
  const [rangeEndDate, setRangeEndDate] = useState(Date.now())//Not working. Make UI of Date filter first

  const { projects } = useSelector(state => state.project)

  const onClear = () => {
    // implement logic to delete currentFilter
    setFilterState(0)
    setSelectedState("")
    setSelectedProject("")
    setRangeStartDate(Date.now())
    setRangeEndDate(Date.now())
    onClose()
  }
  // To clear temporarily selected filters and close the filter popup
  const applyFilter = () => {
    onApply(selectedState, selectedProject, setRangeStartDate, setRangeEndDate)
  }

  return (
    <BottomSheet>
      <View style={[styles.row, spacing.mh1, spacing.bbw05, spacing.p4, { height: '16%' }]}>
        <H1 style={[typography.font16, typography.textBold]}>Apply Filter</H1>
        <TouchableOpacity onPress={onClose}>
          <Icon name="close-outline" color={DANGER_COLOR} size={ICON_LARGE} />
        </TouchableOpacity>
      </View>
      {/* Header */}
      <View style={[styles.row, spacing.mt5, spacing.ml2, spacing.bbw05, { height: '62%' }]}>
        <View style={[spacing.brw1, spacing.brc, { height: '100%', width: "40%" }]}>
          <TouchableOpacity style={[spacing.bbw05, spacing.p3, spacing.mh1]} onPress={() => setFilterState(0)}>
            <Span style={typography.font16}>State</Span>
          </TouchableOpacity>
          <TouchableOpacity style={[spacing.bbw05, spacing.p3, spacing.mh1]} onPress={() => setFilterState(1)}>
            <Span style={typography.font16}>Project</Span>
          </TouchableOpacity>
          <TouchableOpacity style={[spacing.bbw05, spacing.p3, spacing.mh1]} onPress={() => setFilterState(2)}>
            <Span style={typography.font16}>Date</Span>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {/* Filters based on left selection */}
          {/* array of states */}
          {
            filterState === 0 ? states.states.map((state, index) =>
              <TouchableOpacity key={index} style={[spacing.bbw05, spacing.p3, spacing.mh1]} onPress={() => setSelectedState(state.name)}>
                <Text>{state.name}</Text>
              </TouchableOpacity>
            )
              : filterState === 1 ? projects.map((project, index) => <TouchableOpacity key={index} style={[spacing.bbw05, spacing.p3, spacing.mh1]} onPress={() => setSelectedProject(project.project_name)}>
                <Text>{project.project_name}</Text>
              </TouchableOpacity>) :
                <>
                  <H2>From</H2>
                  {/* Insert one date picker here */}
                  <H2>To</H2>
                  {/* Insert other date picker here */}
                </>
          }
        </ScrollView>
      </View>
      {/* Body */}
      <View style={[spacing.mh1, spacing.ph4, styles.row, { height: '22%', width: SCREEN_WIDTH }]}>
        <Button style={[styles.btn, styles.bgDanger, { justifyContent: 'center', width: '40%' }]} onPress={onClear}>
          <H2 style={[styles.btnText, typography.textLight, styles.textLarge]}>Clear</H2>
        </Button>
        <Button style={[styles.btn, styles.bgPrimary, { justifyContent: 'center', width: '40%' }]} onPress={applyFilter}>
          <H2 style={[styles.btnText, typography.textLight, styles.textLarge]}>Apply</H2>
        </Button>
      </View>
      {/* Footer */}
    </BottomSheet>
  )
}

// state filter id=state,
// Project filter id=project
// date filter id=date