import React from 'react';
import { View,   ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-chart-kit'; 
import CustomText from '../customText/CustomText';
import useAttendanceGraph from './useAttendanceGraph/useAttendanceGraph';

interface AttendanceData {
  labels: string[];
  values: number[];
}

interface AttendanceGraphProps {
  attendanceData?: AttendanceData;
  title?: string; 
}


const AttendanceGraph: React.FC<AttendanceGraphProps> = ({
  attendanceData,
  title = 'Employee Attendance Summary',
}) => {

  const {
    Animated,
    chartConfig,
    chartData,
    colorScheme,
    containerStyle,
    fadeAnim,
    isLoading,
    loadingStyle,
    screenWidth,
    titleStyle,
  } = useAttendanceGraph({attendanceData})

  return (
    <View style={containerStyle}>
      <CustomText style={titleStyle}>{title}</CustomText>
      {isLoading ? (
        <View style={{ height: 220, justifyContent: 'center' }}>
          <ActivityIndicator
            size="large"
            color={colorScheme === 'light' ? '#007AFF' : '#60a5fa'}
          />
          <CustomText style={loadingStyle}>Loading...</CustomText>
        </View>
      ) : (
        <Animated.View style={{ opacity: fadeAnim }}>
          <BarChart
            data={chartData}
            
            width={screenWidth - 40}
            height={220}
            yAxisLabel=""
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            fromZero={true}
            showValuesOnTopOfBars={true}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default AttendanceGraph;