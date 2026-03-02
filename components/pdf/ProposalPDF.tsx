import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

type ProposalData = {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  contractType: string;
  busCount: string;
  passengers: string;
  pickup: string;
  destination: string;
  startDate: string;
  endDate: string;
  notes?: string;
};

export default function ProposalPDF({
  data,
}: {
  data: ProposalData;
}) {
  const today = new Date().toLocaleDateString();
  const ref = `PR-${data.id}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* HEADER */}
        <View style={styles.header}>
          <Image src="https://mdtravels.co.za/logo.png" style={styles.logo} />

          <View style={{ textAlign: "right" }}>
            <Text>44 Wrench Street</Text>
            <Text>Parow West</Text>
            <Text>Cape Town</Text>
            <Text>Email: info@mdtravel.co.za</Text>
            <Text>060 641 1703</Text>
          </View>
        </View>

        {/* TITLE */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>TRANSPORTATION PROPOSAL</Text>

          <View>
            <Text>DATE: {today}</Text>
            <Text>REF: {ref}</Text>
          </View>
        </View>

        {/* CLIENT INFO */}
        <View style={styles.section}>
          <Text style={styles.bold}>Client Information</Text>
          <Text>{data.clientName}</Text>
          <Text>{data.email}</Text>
          <Text>{data.phone}</Text>
        </View>

        {/* REQUEST DETAILS */}
        <View style={styles.section}>
          <Text style={styles.bold}>Transport Requirements</Text>

          <Text>Contract Type: {data.contractType}</Text>
          <Text>Buses Required: {data.busCount}</Text>
          <Text>Passengers: {data.passengers}</Text>

          <Text>Pickup: {data.pickup}</Text>
          <Text>Destination: {data.destination}</Text>

          <Text>
            Period: {new Date(data.startDate).toLocaleDateString()}
            {"  "}to{"  "}
            {new Date(data.endDate).toLocaleDateString()}
          </Text>
        </View>

        {/* NOTES */}
        {data.notes && (
          <View style={styles.section}>
            <Text style={styles.bold}>Additional Notes</Text>
            <Text>{data.notes}</Text>
          </View>
        )}

        {/* PROPOSAL TEXT */}
        <View style={styles.section}>
          <Text style={styles.bold}>Proposal Summary</Text>

          <Text>
            Malipheze Dlunge Transport proposes to provide
            professional passenger transport services using
            licensed vehicles and qualified drivers.
          </Text>

          <Text>
            Final pricing will be prepared based on route
            assessment, operational duration and service
            requirements.
          </Text>
        </View>

        {/* BANKING */}
        <View style={styles.bankBox}>
          <Text style={styles.bold}>Banking Details</Text>
          <Text>Bank Name: DLUNGE TRANSPORT SERVICE</Text>
          <Text>Branch: FNB POP BRANCH</Text>
          <Text>Swift: FIRNZAJJ</Text>
          <Text>Account Type: GOLD BUSINESS</Text>
          <Text>Account No: 62828522294</Text>
          <Text>Branch Code: 203209</Text>
        </View>

        {/* SIGNATURE */}
        <Text style={{ marginTop: 20 }}>
          Malipheze Dlunge{"\n"}
          Managing Director
        </Text>

        <Image
          src="https://mdtravels.co.za/signature.jpg"
          style={styles.logo}
        />
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
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  section: {
    marginTop: 12,
  },
  bankBox: {
    marginTop: 20,
    borderWidth: 1,
    padding: 8,
  },
  bold: {
    fontWeight: "bold",
  },
});