import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import CustomText from '../customText/CustomText';
import CustomCard from '../customCard/CustomCard';
import useShiftDetails from './useShiftDetails/useShiftDetails';

// Define types
interface Employee {
  id: string;
  name: string;
}

interface Shift {
  time: string;
  employees: Employee[];
}

interface ShiftDetailsProps {
  morning?: Shift;
  evening?: Shift;
  night?: Shift;
}

const ShiftDetails: React.FC<ShiftDetailsProps> = ({
  morning = { time: '8:00 AM - 2:00 PM', employees: [] },
  evening = { time: '2:00 PM - 10:00 PM', employees: [] },
  night = { time: '10:00 PM - 6:00 AM', employees: [] },
}) => {
const {
    cardStyle,
    defaultShifts
} = useShiftDetails({morning,evening,night})

  const renderEmployee = ({ item }: { item: Employee }) => (
    <CustomText style={styles.employee}>{item.name}</CustomText>
  );

  const renderShift = (title: string, shift: Shift|undefined) => (
    <View style={styles.shiftSection}>
        <View style={{flexDirection:'row',justifyContent:"space-between"}}>
      <CustomText style={styles.shiftTitle}>{title}</CustomText>
      <CustomText style={styles.shiftTime}>{shift?.time??''}</CustomText>
      </View>
      {shift&&(shift?.employees?.length > 0) ? (
        <FlatList
          data={shift?.employees}
          renderItem={renderEmployee}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <CustomText style={styles.noEmployees}>No employees assigned</CustomText>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomText style={styles.cardTitle}>Upcoming Shift Details</CustomText>
      <CustomCard style={cardStyle}>
        {renderShift('Morning Shift', defaultShifts?.morning)}
        {renderShift('Evening Shift', defaultShifts?.evening)}
        {renderShift('Night Shift', defaultShifts?.night)}
      </CustomCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 10,
    width: Dimensions.get('window').width*.95,
    height:350
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  shiftSection: {
    marginBottom: 15,
    paddingTop:10,
    width:"90%"
  },
  shiftTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  shiftTime: {
    fontSize: 16,
    marginTop: 2,
  },
  employee: {
    fontSize: 14,
    paddingVertical: 2,
  },
  noEmployees: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#6b7280',
  },
});

export default ShiftDetails;