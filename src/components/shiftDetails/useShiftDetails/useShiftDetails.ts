import { ViewStyle } from "react-native";
import { Dimensions, useColorScheme } from "react-native";

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
  

const useShiftDetails = ({morning,evening,night}:ShiftDetailsProps) => {
    const colorScheme = useColorScheme();

    const defaultShifts: { [key: string]: Shift|undefined } = {
      morning: morning?.employees.length
        ? morning
        : { time: '8:00 AM - 2:00 PM', employees: [{ id: '1', name: 'Alice Johnson' }, { id: '2', name: 'Bob Smith' }] },
      evening: evening?.employees.length
        ? evening
        : { time: '2:00 PM - 10:00 PM', employees: [{ id: '3', name: 'David Brown' }] },
      night: night?.employees.length
        ? night
        : { time: '10:00 PM - 6:00 AM', employees: [{ id: '4', name: 'Frank Wilson' }, { id: '5', name: 'Grace Taylor' }] },
    };
  
    const screenWidth = Dimensions.get('window').width;
    const cardStyle:ViewStyle = {
      width: screenWidth*.95, 
      marginHorizontal: 10,
      marginVertical: 10,
    };
  return {
    Dimensions,
    cardStyle,
    colorScheme,
    screenWidth,
    useColorScheme,
    defaultShifts
  }
}

export default useShiftDetails