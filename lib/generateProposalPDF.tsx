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
  title: { fontSize: 18, marginBottom: 10 },
  section: { marginBottom: 10 },
});

export async function generateProposalPDF(data: any) {
  const Proposal = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          Transportation Service Proposal
        </Text>

        <View style={styles.section}>
          <Text>Client: {data.clientName}</Text>
          <Text>Email: {data.email}</Text>
          <Text>Phone: {data.phone}</Text>
        </View>

        <View style={styles.section}>
          <Text>Contract Type: {data.contractType}</Text>
          <Text>Buses Required: {data.busCount}</Text>
          <Text>Passengers: {data.passengers}</Text>
          <Text>Pickup: {data.pickup}</Text>
          <Text>Destination: {data.destination}</Text>
          <Text>Start Date: {data.startDate}</Text>
          <Text>End Date: {data.endDate}</Text>
        </View>

        <View style={styles.section}>
          <Text>
            Fleet: 15-Seater Mini Buses with safety belts,
            first aid kits and professional drivers.
          </Text>
        </View>

        <Text>
          Malipheze Dlunge Transport — Cape Town
        </Text>
      </Page>
    </Document>
  );

  return await renderToBuffer(Proposal);
}