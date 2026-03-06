import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";

export default function generateRomionInvoicePDF({ booking }: any) {

  const HALF = 2100;
  const FULL = 4200;

  const total = booking.days * FULL;
  const deposit = total / 2;

  return (
    <Document>
      <Page style={styles.page}>

        <Text style={styles.title}>INVOICE</Text>

        <View style={styles.section}>
          <Text>Name: {booking.name}</Text>
          <Text>Email: {booking.email}</Text>
          <Text>Phone: {booking.phone}</Text>
        </View>

        <View style={styles.section}>
          <Text>Vehicle: Toyota Romion</Text>
          <Text>Passengers: {booking.people}</Text>
          <Text>Days: {booking.days}</Text>
        </View>

        <View style={styles.section}>
          <Text>Pickup: {booking.pickupDate} {booking.pickupTime}</Text>
          <Text>Dropoff: {booking.dropoffDate} {booking.dropoffTime}</Text>
        </View>

        <View style={styles.section}>
          <Text>Full Day Rate: R {FULL}</Text>
          <Text>Total: R {total}</Text>
          <Text>Deposit (50%): R {deposit}</Text>
        </View>

      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page:{
    padding:30
  },

  title:{
    fontSize:20,
    marginBottom:20
  },

  section:{
    marginBottom:10
  }
});