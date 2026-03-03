import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

export default function StariaInvoicePDF({ booking }: any) {
  const date = new Date().toLocaleDateString();
  const ref = `ST-${Date.now().toString().slice(-6)}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            src="https://mdtravels.co.za/logo.png"
            style={styles.logo}
          />

          <View>
            <Text>MD Shuttles</Text>
            <Text>Cape Town</Text>
            <Text>060 641 1703</Text>
            <Text>info@mdshuttles.co.za</Text>
          </View>
        </View>

        {/* TITLE */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>INVOICE</Text>

          <View>
            <Text>Date: {date}</Text>
            <Text>Ref: {ref}</Text>
          </View>
        </View>

        {/* CLIENT */}
        <View style={styles.section}>
          <Text style={styles.bold}>Client</Text>
          <Text>{booking.name}</Text>
          <Text>{booking.email}</Text>
          <Text>{booking.phone}</Text>
        </View>

        {/* TRIP DETAILS */}
        <View style={styles.section}>
          <Text style={styles.bold}>Trip Details</Text>

          <Text>Date: {booking.tripDate}</Text>
          <Text>
            Morning: {booking.pickupLocation} → {booking.destination}
          </Text>
          <Text>
            Return: {booking.eveningPickupLocation} →{" "}
            {booking.eveningDropoffLocation}
          </Text>
        </View>

        {/* PRICE */}
        <View style={styles.totalBox}>
          <Text>Hyundai Staria Day Package</Text>
          <Text style={styles.total}>TOTAL: R 2,200.00</Text>
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>
          Thank you for choosing MD Shuttles.
        </Text>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: { width: 90 },
  titleRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: { fontSize: 18, fontWeight: "bold" },
  section: { marginTop: 20 },
  bold: { fontWeight: "bold" },
  totalBox: {
    marginTop: 30,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  total: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  footer: {
    marginTop: 40,
    textAlign: "center",
  },
});