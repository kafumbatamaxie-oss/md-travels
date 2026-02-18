// import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   page: { padding: 40, fontSize: 12, fontFamily: 'Helvetica' },
//   header: { fontSize: 20, marginBottom: 20, fontWeight: 'bold', color: '#0c4a6e' },
//   row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
//   total: { marginTop: 20, borderTop: 1, paddingTop: 10, fontSize: 16, fontWeight: 'bold' }
// });

// export const QuotePDF = ({ data, price }: any) => (
//   <Document>
//     <Page style={styles.page}>
//       <Text style={styles.header}>MD Shuttles - Official Quote</Text>
//       <Text>Dear {data.firstName},</Text>
//       <View style={{ marginVertical: 20 }}>
//         <Text>Service: {data.serviceName}</Text>
//         <Text>Route: {data.pickupAddress} to {data.destination}</Text>
//         <Text>Date: {data.pickupDate} - {data.dropoffDate}</Text>
//       </View>
//       <View style={styles.total}>
//         <Text>Total Estimated Price: R {price.toLocaleString()}</Text>
//       </View>
//       <Text style={{ marginTop: 40, fontSize: 10 }}>
//         * 50% deposit required to secure booking.
//       </Text>
//     </Page>
//   </Document>
// );
