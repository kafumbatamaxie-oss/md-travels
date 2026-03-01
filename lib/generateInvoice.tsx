import {
  Document as PDFDocument,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  renderToBuffer
} from "@react-pdf/renderer"

export async function generateInvoice(booking: any, tripItems: any[]) {

  const styles = StyleSheet.create({
    page: { padding: 30 },
    section: { marginBottom: 10 }
  })

  const InvoiceDocument = () => {
    return (
    <PDFDocument>
      <Page style={styles.page}>
        <Text>MD Shuttles Invoice</Text>

        <View style={styles.section}>
          <Text>Client: {booking.clientName}</Text>
          <Text>Email: {booking.clientEmail}</Text>
        </View>

        {tripItems.map((item: any, index: number) => (
          <View key={index} style={styles.section}>
            <Text>{item.description}</Text>
            <Text>Qty: {item.quantity}</Text>
            <Text>R {item.total}</Text>
          </View>
        ))}

        <View style={styles.section}>
          <Text>Total: R {booking.totalPrice}</Text>
          <Text>Deposit: R {booking.depositDue}</Text>
          <Text>Balance: R {booking.balanceDue}</Text>
        </View>
      </Page>
    </PDFDocument>
  )}

  const pdfBuffer = await renderToBuffer(<InvoiceDocument />)
  return pdfBuffer
}