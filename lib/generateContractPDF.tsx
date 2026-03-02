import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10, lineHeight: 1.5 },
  title: { fontSize: 16, marginBottom: 10 },
  section: { marginBottom: 8 },
  bold: { fontWeight: "bold" },
});

export async function generateContractPDF(data: any) {
  const Contract = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          CONTRACT FOR CHARTER SERVICES
        </Text>

        <Text style={styles.section}>
          This Contract is made on {data.contractStartDate}
          between:
        </Text>

        <Text style={styles.section}>
          {data.hotelName}
          {"\n"}
          {data.hotelAddress}
          {"\n"}("Hotel")
        </Text>

        <Text style={styles.section}>
          AND
        </Text>

        <Text style={styles.section}>
          MD SHUTTLES{"\n"}
          129 Beaufort Street, Goodwood, Cape Town
        </Text>

        <Text style={styles.bold}>ARTICLE 1: SCOPE OF SERVICES</Text>
        <Text>
          Airport transfers, city tours, Winelands tours and
          Western Cape transportation services.
        </Text>

        <Text style={styles.bold}>
          ARTICLE 2: PRICING
        </Text>

        <Text>
          Airport transfer: R600{"\n"}
          Point-to-point: R300{"\n"}
          Half-day (4-seater): R3000{"\n"}
          Full-day (4-seater): R5500{"\n"}
          Half-day Executive (9 pax): R5500{"\n"}
          Full-day Executive (9 pax): R9000
        </Text>

        <Text style={styles.bold}>
          ARTICLE 3–8
        </Text>

        <Text>
          Terms include payment within 7 days, termination
          notice of 30 days, confidentiality, indemnification,
          and South African governing law.
        </Text>

        <View style={{ marginTop: 30 }}>
          <Text>HOTEL</Text>
          <Text>
            Name: {data.contactPerson}
          </Text>
          <Text>
            Title: {data.title}
          </Text>
          <Text>
            Date: {data.signingDate}
          </Text>
          <Text>Signature: __________________</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text>SERVICE PROVIDER</Text>
          <Text>Name: Malipeze Dlunge</Text>
          <Text>Occupation: Owner</Text>
          <Text>Date: 01 January</Text>
          <Text>Signature: __________________</Text>
        </View>
      </Page>
    </Document>
  );

  return await renderToBuffer(Contract);
}