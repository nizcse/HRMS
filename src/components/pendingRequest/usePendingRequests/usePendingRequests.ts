import { useColorScheme, ViewStyle } from "react-native";

interface Request {
    id: string;
    employee: string;
    details: string; 
  }
  

  
const usePendingRequests = ({leaveRequests,shiftChangeRequests}:{leaveRequests:Request[],shiftChangeRequests:Request[]}) => {
    const colorScheme = useColorScheme();

  const defaultRequests: { leave: Request[]; shiftChange: Request[] } = {
    leave: leaveRequests.length
      ? leaveRequests
      : [
          { id: '1', employee: 'Alice Johnson', details: 'Jan 10-12' },
          { id: '2', employee: 'Bob Smith', details: 'Feb 1-3' },
        ],
    shiftChange: shiftChangeRequests.length
      ? shiftChangeRequests
      : [
          { id: '3', employee: 'David Brown', details: 'Morning to Evening' },
          { id: '4', employee: 'Emma Davis', details: 'Night to Morning' },
        ],
  };

  const cardStyle:ViewStyle = {
    marginHorizontal: 10,
    alignItems:"center",
    padding: 15,
    justifyContent:"center"
  };

  return {
      cardStyle,
      defaultRequests,
  }
}

export default usePendingRequests