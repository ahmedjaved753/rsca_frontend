import { Document, Page, Text, View } from "@react-pdf/renderer";
import React from "react";

function ReportPDF({ reportData }) {
  return (<Document>
      <Page wrap style={{ flexDirection: "row" }}>
        <View style={{ color: "purple", textAlign: "center", margin: 30, display: "inline-block" }}>
          {reportData.map(rep => {
            return (
              <Text>
                <Text>{rep.postTitle}</Text>
                <Text>Total Markers: {rep.totalMarkers}</Text>
                <Text>Only Potholes: {rep.onlyPotholes}</Text>
                <Text>Only Cracks: {rep.onlyCracks}</Text>
                <Text>Only Bleeds: {rep.onlyBleeds}</Text>
                <Text>Potholes and Cracks: {rep.potholesAndCracks}</Text>
                <Text>Potholes and Bleeds: {rep.potholesAndBleeds}</Text>
                <Text>Cracks And Bleeds: {rep.cracksAndBleeds}</Text>
              </Text>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}

export default ReportPDF