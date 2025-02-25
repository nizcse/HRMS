import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, TextStyle, useColorScheme, ViewStyle } from "react-native";

interface AttendanceData {
    labels: string[];
    values: number[];
  }
  
  
  const screenWidth = Dimensions.get('window').width;
const useAttendanceGraph = ({attendanceData}:{attendanceData:AttendanceData|undefined}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, 
        useNativeDriver: true,
      }).start();
    }, 1500); 

    return () => clearTimeout(timer);
  }, [fadeAnim]);

  const defaultData = {
    labels: ['Present', 'Absent', 'Late'],
    datasets: [{ data: [0, 0, 0] }],
  };

  const chartData = {
    labels: attendanceData?.labels || defaultData.labels,
    datasets: [
      {
        data: attendanceData?.values || defaultData.datasets[0].data,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: colorScheme === 'light' ? '#ffffff' : '#1e293b', 
    backgroundGradientFrom: colorScheme === 'light' ? '#ffffff' : '#1e293b',
    backgroundGradientTo: colorScheme === 'light' ? '#ffffff' : '#1e293b',
    decimalPlaces: 0,
    color: (opacity = 1) =>
      colorScheme === 'light' ? `rgba(0, 122, 255, ${opacity})` : `rgba(59, 130, 246, ${opacity})`,
    labelColor: (opacity = 1) =>
      colorScheme === 'light' ? `rgba(0, 0, 0, ${opacity})` : `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForBars: {
      strokeWidth: 2,
      stroke: colorScheme === 'light' ? '#007AFF' : '#60a5fa',
    },
  };

  const titleStyle: TextStyle = { marginBottom: 10 };
  const loadingStyle: TextStyle = { textAlign: 'center', marginTop: 10 };

  const containerStyle:ViewStyle = {
    alignItems: 'center',
    padding: 20,
    paddingBottom:30,
    width:screenWidth*.95,
  };
  return {
    Animated,
    chartConfig,
    chartData,
    colorScheme,
    containerStyle,
    fadeAnim,
    isLoading,
    loadingStyle,
    screenWidth,
    titleStyle
  }
}

export default useAttendanceGraph