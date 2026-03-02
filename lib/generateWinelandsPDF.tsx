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
  row: { marginBottom: 6 },
});

export async function generateWinelandsPDF(data: any) {
  const total =
    1600 + (data.tourType === "half-day" ? 3500 : 6000);

  const Invoice = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          MD Shuttles Invoice
        </Text>

        <View style={styles.row}>
          <Text>Client: {data.name}</Text>
          <Text>Email: {data.email}</Text>
        </View>

        <Text>Services:</Text>

        <Text>• Airport Shuttle (Return) — R1600</Text>

        {data.tourType === "half-day" ? (
          <Text>• Half-Day Winelands Tour — R3500</Text>
        ) : (
          <Text>• Full-Day Winelands Tour — R6000</Text>
        )}

        <Text style={{ marginTop: 10 }}>
          TOTAL: R{total}
        </Text>

        <Text>
          Deposit Required (50%): R{total / 2}
        </Text>
      </Page>
    </Document>
  );

  return await renderToBuffer(Invoice);
}