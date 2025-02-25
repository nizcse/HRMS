import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import CustomText from '../customText/CustomText';
import CustomCard from '../customCard/CustomCard';
import usePendingRequests from './usePendingRequests/usePendingRequests';

interface Request {
  id: string;
  employee: string;
  details: string; 
}

interface PendingRequestsProps {
  leaveRequests?: Request[];
  shiftChangeRequests?: Request[];
}

const PendingRequests: React.FC<PendingRequestsProps> = ({
  leaveRequests = [],
  shiftChangeRequests = [],
}) => {
  const {
    cardStyle,
    defaultRequests,
  } = usePendingRequests({leaveRequests,shiftChangeRequests})
  const renderRequest = ({ item }: { item: Request }) => (
    <CustomText style={styles.request}>
      {`${item.employee} - ${item.details}`}
    </CustomText>
  );

  const renderSection = (title: string, requests: Request[]) => (
    <View style={styles.section}>
      <CustomText style={styles.sectionTitle}>{title}</CustomText>
      {requests.length > 0 ? (
        <FlatList
          data={requests}
          renderItem={renderRequest}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <CustomText style={styles.noRequests}>No pending requests</CustomText>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomText style={styles.cardTitle}>Pending Requests</CustomText>
      <CustomCard style={cardStyle}>
        {renderSection('Leave Requests', defaultRequests.leave)}
        {renderSection('Shift Change Requests', defaultRequests.shiftChange)}
      </CustomCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width:Dimensions.get('window').width*.95,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
    padding:10,
    width: '100%', 
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  request: {
    fontSize: 14,
    paddingVertical: 2,
  },
  noRequests: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#6b7280',
  },
});

export default PendingRequests;