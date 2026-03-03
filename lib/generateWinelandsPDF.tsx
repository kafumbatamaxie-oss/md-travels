import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  renderToBuffer,
} from "@react-pdf/renderer";

export async function generateWinelandsPDF(data: any) {
  const SHUTTLE_PRICE = 1600;
  const TOUR_PRICE =
    data.tourType === "half-day" ? 3500 : 6000;

  const total = SHUTTLE_PRICE + TOUR_PRICE;
  const deposit = total / 2;

  const invoiceDate = new Date().toLocaleDateString();
  const refNumber =
    "MD-" + Math.random().toString(36).slice(2, 8).toUpperCase();

  const rows = [
    {
      date: new Date(data.shuttlePickup).toLocaleDateString(),
      no: "1",
      vehicle: "Airport Shuttle",
      destination: "Airport Transfer (Return)",
      rate: SHUTTLE_PRICE,
    },
    {
      date: new Date(data.shuttlePickup).toLocaleDateString(),
      no: "2",
      vehicle: "Winelands Tour",
      destination:
        data.tourType === "half-day"
          ? "Half-Day Wine Experience"
          : "Full-Day Wine Experience",
      rate: TOUR_PRICE,
    },
  ];

  const Invoice = (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            src="https://mdtravels.co.za/logo.png"
            style={styles.logo}
          />

          <View style={styles.headerRight}>
            <Text>44 Wrench Street</Text>
            <Text>Parow West</Text>
            <Text>Cape Town</Text>
            <Text>7500</Text>
            <Text>Email: info@mdtravel.co.za</Text>
            <Text>24 Hours: 060 641 1703</Text>
            <Text>Alt: 071 945 5941</Text>
          </View>
        </View>

        {/* TITLE */}
        <View style={styles.titleRow}>
          <Text style={styles.invoiceTitle}>INVOICE</Text>

          <View style={styles.metaRight}>
            <Text>DATE: {invoiceDate}</Text>
            <Text>REF NO: {refNumber}</Text>
          </View>
        </View>

        {/* CLIENT + BANK */}
        <View style={styles.metaSection}>
          <View style={styles.clientBox}>
            <Text style={styles.bold}>Attention:</Text>
            <Text>{data.name}</Text>
            <Text>{data.email}</Text>
            <Text>{data.phone}</Text>
            <Text>Passengers: {data.people}</Text>

            <View style={styles.spacer} />

            <Text>Airport Shuttle + Winelands Experience</Text>
            <Text>Professional Driver Included</Text>
          </View>

          <View style={styles.bankBox}>
            <Text style={styles.bold}>Banking Details</Text>
            <Text>Bank Name: DLUNGE TRANSPORT SERVICE</Text>
            <Text>Branch Name: FNB POP BRANCH</Text>
            <Text>DELOTTERY</Text>
            <Text>Swift Code: FIRNZAJJ</Text>
            <Text>Account Type: GOLD BUSINESS</Text>
            <Text>Account No: 62828522294</Text>
            <Text>Branch Code: 203209</Text>
          </View>
        </View>

        <Text style={styles.thankYou}>
          THANK YOU FOR YOUR BOOKING
        </Text>

        {/* TABLE */}
        <View style={styles.table}>
          <View style={styles.trHeader}>
            <Text style={styles.th}>DATE</Text>
            <Text style={styles.th}>NO</Text>
            <Text style={styles.th}>SERVICE</Text>
            <Text style={styles.th}>DESCRIPTION</Text>
            <Text style={styles.thRight}>RATE</Text>
          </View>

          {rows.map((row, i) => (
            <View key={i} style={styles.tr}>
              <Text style={styles.td}>{row.date}</Text>
              <Text style={styles.td}>{row.no}</Text>
              <Text style={styles.td}>{row.vehicle}</Text>
              <Text style={styles.td}>{row.destination}</Text>
              <Text style={styles.tdRight}>
                R {row.rate.toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={styles.vatText}>
              ALL PASSENGER TRANSPORT IS EXEMPT OF VAT
            </Text>

            <Text style={styles.totalText}>
              TOTAL&nbsp;&nbsp;R {total.toFixed(2)}
            </Text>
          </View>

          <View style={styles.depositRow}>
            <Text>Deposit Required (50%)</Text>
            <Text style={styles.totalText}>
              R {deposit.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* TERMS */}
        <View style={styles.terms}>
          <Text style={styles.bold}>TERMS & CONDITIONS:</Text>
          <Text>• Booking confirmed upon deposit payment.</Text>
          <Text>• Balance payable before travel date.</Text>
          <Text>• Wine tasting fees not included unless stated.</Text>
          <Text>• Route flexibility subject to timing.</Text>
          <Text>• Passenger belongings remain responsibility.</Text>
          <Text>• Services governed by South African law.</Text>
        </View>

        {/* FOOTER */}
        <Text style={styles.noDrive}>NO SELF-DRIVE</Text>

        <Text style={styles.signature}>
          Malipheze Dlunge{"\n"}
          Managing Director{"\n"}
          060 641 1703
        </Text>

        <Image
          src="https://mdtravels.co.za/signature.jpg"
          style={styles.logo}
        />
      </Page>
    </Document>
  );

  return await renderToBuffer(Invoice);
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 9.5,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: { width: 90 },
  headerRight: { textAlign: "right" },

  titleRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  invoiceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
  },

  metaRight: { textAlign: "right" },

  metaSection: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  clientBox: { width: "55%" },

  bankBox: {
    width: "40%",
    borderWidth: 1,
    padding: 6,
  },

  thankYou: {
    marginTop: 6,
    marginBottom: 6,
    textAlign: "center",
    color: "red",
  },

  table: {
    borderWidth: 1,
    marginTop: 6,
  },

  trHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    backgroundColor: "#eee",
  },

  tr: {
    flexDirection: "row",
    borderBottomWidth: 1,
    minHeight: 22,
  },

  th: { flex: 1, padding: 4, fontWeight: "bold" },

  thRight: {
    flex: 1,
    padding: 4,
    fontWeight: "bold",
    textAlign: "right",
  },

  td: { flex: 1, padding: 4 },

  tdRight: {
    flex: 1,
    padding: 4,
    textAlign: "right",
  },

  totalRow: {
    padding: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  depositRow: {
    paddingHorizontal: 6,
    paddingBottom: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  vatText: { fontWeight: "bold" },
  totalText: { fontWeight: "bold" },

  terms: { marginTop: 10 },
  bold: { fontWeight: "bold" },

  noDrive: {
    marginTop: 12,
    fontWeight: "bold",
  },

  signature: { marginTop: 10 },
  spacer: { marginVertical: 6 },
});