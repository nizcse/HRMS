import AttendanceGraph from "@/src/components/attendanceGraph/AttendanceGraph";
import CustomCard from "@/src/components/customCard/CustomCard";
import CustomText from "@/src/components/customText/CustomText";
import PendingRequests from "@/src/components/pendingRequest/PendingRequest";
import ShiftDetails from "@/src/components/shiftDetails/ShiftDetails";
import useIndex from "@/src/hooks/useIndex/useIndex";
import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Index() {
const {customShifts,data} = useIndex()
const ListData = [
  (<>
  <CustomText style={styles.cardTitle}>Employee Attendance Summary</CustomText>
  <CustomCard >
  <AttendanceGraph attendanceData={data} />
  </CustomCard>
  </>),
(<ShiftDetails {...customShifts} />),
(<PendingRequests/>),
(
  <Link href="/employee-list" style={styles.link}>
    <CustomText>Employee List</CustomText>
  </Link>),
  // (<LeaveRequestScreen/>)
]
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={ListData}
        contentContainerStyle={{alignItems:"center",marginVertical:10,paddingBottom:10}}
        renderItem={({item,index})=>{
          return(
            <Pressable style={{alignItems:'center'}}>
            {item}
            </Pressable>
          )
        }}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  link: {
    padding: 10,
  },
})