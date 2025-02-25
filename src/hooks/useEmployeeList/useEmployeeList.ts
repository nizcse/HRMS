import { useRouter } from "expo-router";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
export interface Employee {
  id: string;
  name: string;
  department: string;
  shiftStatus: 'Present' | 'Absent' | 'Late';
  profilePic: string;
}

const initialEmployees: Employee[] = [
  { id: '1', name: 'Alice Johnson', department: 'HR', shiftStatus: 'Present', profilePic: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: '2', name: 'Bob Smith', department: 'IT', shiftStatus: 'Absent', profilePic: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: '3', name: 'Carol Lee', department: 'Sales', shiftStatus: 'Late', profilePic: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: '4', name: 'David Brown', department: 'Marketing', shiftStatus: 'Present', profilePic: 'https://randomuser.me/api/portraits/men/4.jpg' },
];
const useEmployeeList = () => {
    const colorScheme = useColorScheme();
      const router = useRouter();
      const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
      const [searchQuery, setSearchQuery] = useState<string>('');
      const [filters, setFilters] = useState<string[]>([]);
      const [refreshing, setRefreshing] = useState<boolean>(false);
        const [query,setQuery] = useState('')
      useEffect(() => {
        fetchEmployees();
      }, []);
    
      const fetchEmployees = () => {
        setEmployees(initialEmployees);
      };
    
      useEffect(() => {
        let filtered =employees;
    
        if (searchQuery.length>0) {
            filtered = employees.filter((employee) =>
                employee.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setEmployees(filtered)
        return
    }
    
    if (filters.length > 0) {
        filtered = initialEmployees.filter((employee) => filters.includes(employee.shiftStatus));
        setEmployees(filtered)
        return
    }
    else{
        setEmployees(initialEmployees)
        return;
    }
      }, [searchQuery, filters]);
    
      const handleSearch = useCallback(
        debounce((query: string) => {
          setSearchQuery(query);
        }, 300),
        []
      );
      useEffect(()=>{
         let debouncedSearch = setTimeout(()=>{
            setSearchQuery(query);
         },500)
         return ()=>clearTimeout(debouncedSearch)
      },[query])
    
      const toggleFilter = (status: string) => {
        setFilters((prev) =>
          prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
        );
      };
    
      const onRefresh = useCallback(() => {
        setRefreshing(true);
        try {
          setTimeout(() => {
            fetchEmployees();
            setRefreshing(false);
          }, 1000);
        } catch (error) {
          console.error('Refresh failed:', error);
          setRefreshing(false);
        }
      }, []);
      
      const styles = StyleSheet.create({
        lightBackground:{backgroundColor:"#e0f2fe"},
        darkBackground:{backgroundColor:"#0f172a"},
      container: {
        flex: 1,
        backgroundColor: colorScheme === 'light' ? '#f0f0f0' : '#0f172a', 
      },
      header: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colorScheme === 'light' ? '#d1d5db' : '#334155', 
      },
      tagline: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',  
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
      },
      searchBar: {
        margin: 10,
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: colorScheme === 'light' ? '#fff' : '#334155',
        borderColor: colorScheme === 'light' ? '#d1d5db' : '#475569',
        borderWidth: 1,
      },
      filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
      },
      filterChip: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: colorScheme === 'light' ? '#e5e7eb' : '#4b5563',
        borderColor: colorScheme === 'light' ? '#d1d5db' : '#6b7280',
        borderWidth: 1,
      },
      filterChipActive: {
        backgroundColor: colorScheme === 'light' ? '#1e90ff' : '#60a5fa',
        borderColor: colorScheme === 'light' ? '#1e90ff' : '#60a5fa',
      },
      filterText: {
        fontSize: 14,
        color: colorScheme === 'light' ? '#374151' : '#d1d5db',
      },
      filterTextActive: {
        color: '#fff',
      },
      list: {
        // flex: 1,
      },
      employeeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: colorScheme === 'light' ? '#fff' : '#1e293b',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      },
      profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        borderWidth: 1,
        alignSelf: 'center',
        borderColor: colorScheme === 'light' ? '#e5e7eb' : '#4b5563',
      },
      employeeInfo: {
        flex: 1,
      },
      employeeName: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      employeeDept: {
        fontSize: 14,
        color: colorScheme === 'light' ? '#6b7280' : '#9ca3af',
      },
      statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
      },
      employeeStatus: {
        fontSize: 14,
        marginLeft: 5,
        color: colorScheme === 'light' ? '#1e3a8a' : '#93c5fd',
      },
      rowBack: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        // marginHorizontal: 10,
      },
      backButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
        borderRadius: 8,
      },
      backLeft: {
        backgroundColor: colorScheme === 'light' ? '#3b82f6' : '#1d4ed8',
      },
      backRight: {
        backgroundColor: colorScheme === 'light' ? '#22c55e' : '#15803d', 
      },
    });
    
      const themeContainerStyle =
      colorScheme === 'light' ? styles.lightBackground : styles.darkBackground;
      return{
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
      }
}

export default useEmployeeList