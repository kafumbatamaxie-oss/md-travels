import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 11 },

  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },

  section: { marginBottom: 12 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  total: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default function PackageInvoicePDF({
  booking,
}: any) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <Text style={styles.title}>
          MD Travels — Package Invoice
        </Text>

        {/* CUSTOMER */}
        <View style={styles.section}>
          <Text>Name: {booking.name}</Text>
          <Text>Email: {booking.email}</Text>
          <Text>Phone: {booking.phone}</Text>
          <Text>Passengers: {booking.people}</Text>
          <Text>Pickup Date: {booking.pickupDate}</Text>
        </View>

        {/* PACKAGE */}
        <View style={styles.section}>
          <Text>Vehicle: Luxury 65-Seater Bus</Text>
          <Text>Days Booked: {booking.days}</Text>
        </View>

        {/* PRICING */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text>Airport Transfer (Arrival)</Text>
            <Text>R{booking.pricing.arrival}</Text>
          </View>

          <View style={styles.row}>
            <Text>Daily Trips</Text>
            <Text>R{booking.pricing.dailyTotal}</Text>
          </View>

          <View style={styles.row}>
            <Text>Airport Transfer (Return)</Text>
            <Text>R{booking.pricing.returnTransfer}</Text>
          </View>

          <Text style={styles.total}>
            TOTAL: R{booking.pricing.total}
          </Text>
        </View>

      </Page>
    </Document>
  );
}