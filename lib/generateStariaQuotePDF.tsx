import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  title: { fontSize: 18, marginBottom: 15 },
  section: { marginBottom: 10 },
});

export async function generateQuotePDF(data: any) {
  const Quote = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>MD Shuttles Quotation</Text>

        <View style={styles.section}>
          <Text>Client: {data.name}</Text>
          <Text>Email: {data.email}</Text>
          <Text>Phone: {data.phone}</Text>
          <Text>Date: {data.tripDate}</Text>
        </View>

        <View style={styles.section}>
          <Text>Pickup: {data.pickupLocation}</Text>
          <Text>Pickup Time: {data.pickupTime}</Text>
          <Text>Destination: {data.destination}</Text>
        </View>

        <View style={styles.section}>
          <Text>Evening Pickup: {data.eveningPickupLocation}</Text>
          <Text>Time: {data.eveningPickupTime}</Text>
          <Text>Drop-off: {data.eveningDropoffLocation}</Text>
        </View>

        <View style={styles.section}>
          <Text>
            Vehicle: 8-Seater Hyundai Staria 2025
          </Text>
          <Text>Driver Included</Text>
        </View>

        <Text>Total Cost: R2200</Text>
      </Page>
    </Document>
  );

  return await renderToBuffer(Quote);
}