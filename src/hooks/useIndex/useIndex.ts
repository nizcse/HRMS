const useIndex = () => {
    const data = {
        labels: ['Present', 'Absent', 'Late'],
        values: [25, 5, 10],
      };
      const customShifts = {
        morning: {
          time: '7:00 AM - 3:00 PM',
          employees: [{ id: '1', name: 'Jane Doe' }, { id: '2', name: 'John Smith' }],
        },
        evening: {
          time: '3:00 PM - 11:00 PM',
          employees: [{ id: '3', name: 'Emily Clark' }],
        },
        night: {
          time: '11:00 PM - 7:00 AM',
          employees: [],
        },
      };

  return {
    data,
    customShifts
  }
}

export default useIndex