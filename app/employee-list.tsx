import React, { } from 'react';
import {
  View,
  TextInput,
  RefreshControl,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Calendar, CheckCircle } from 'lucide-react-native';
import CustomText from '@/src/components/customText/CustomText';
import CustomCard from '@/src/components/customCard/CustomCard';
import { StyleSheet } from 'react-native';
import useEmployeeList, { Employee } from '@/src/hooks/useEmployeeList/useEmployeeList';


const EmployeeListScreen: React.FC = () => {
  
    const {
        colorScheme,
        employees,
        filters,
        onRefresh,
        query,
        refreshing,
        setQuery,
        toggleFilter,
        styles,
        themeContainerStyle
    } = useEmployeeList()
  const renderHiddenItem = (data: { item:Employee }) => (

    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backButton, styles.backLeft]}
        // onPress={() => router.push(`/profile/${data.item.id}`)}
        accessibilityLabel={`View profile of ${data.item.name}`}
      >
        <User size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backButton, styles.backRight]}
        onPress={() => approveShiftChange(data.item)}
        accessibilityLabel={`Approve shift change for ${data.item.name}`}
      >
        <CheckCircle size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const approveShiftChange = (employee: Employee) => {
    console.log(`Shift change approved for ${employee.name}`);
  };

  const renderItem = ({ item }: { item: Employee }) => {
    return(
    <CustomCard style={styles.employeeCard}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
        <View style={styles.employeeInfo}>
          <CustomText style={styles.employeeName}>{item.name}</CustomText>
          <CustomText style={styles.employeeDept}>{item.department}</CustomText>
          <View style={styles.statusContainer}>
            <Calendar size={16} color={colorScheme === 'light' ? '#1e3a8a' : '#93c5fd'} />
            <CustomText style={styles.employeeStatus}>{item.shiftStatus}</CustomText>
          </View>
        </View>
      </View>
    </CustomCard>
  )};

  const FilterChip = ({ status }: { status: string }) => (
    <TouchableOpacity
      style={[styles.filterChip, filters.includes(status) && styles.filterChipActive]}
      onPress={() => toggleFilter(status)}
      accessibilityLabel={`Filter by ${status} status`}
    >
      <CustomText
        style={[styles.filterText, filters.includes(status) && styles.filterTextActive]}
      >
        {status}
      </CustomText>
    </TouchableOpacity>
  );
  


  return (
    <View style={themeContainerStyle}>
      <LinearGradient
        colors={colorScheme === 'light' ? ['#87cefa', '#1e90ff'] : ['#4169e1', '#191970']}
        style={styles.header}
      >
        <CustomText style={styles.tagline}>Smart Attendance for Smarter Workplaces</CustomText>
      </LinearGradient>

      <TextInput
        style={styles.searchBar}
        placeholder="Search employees..."
        placeholderTextColor={colorScheme === 'light' ? '#6b7280' : '#9ca3af'}
        value={query}
        onChangeText={(text) => {
          setQuery(text);
        }}
        accessibilityLabel="Search employees by name"
      />

      <View style={styles.filterContainer}>
        <FilterChip status="Present" />
        <FilterChip status="Absent" />
        <FilterChip status="Late" />
      </View>

      <SwipeListView
        data={employees}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        keyExtractor={(item) => item.id}
        leftOpenValue={75}
        rightOpenValue={-75}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={styles.list}
        contentContainerStyle={{ gap: 15 }}
      />
    </View>
  );
};

export default EmployeeListScreen;