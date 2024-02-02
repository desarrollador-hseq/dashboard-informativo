"use client";

import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
  Font,
  Link,
  PDFDownloadLink,
} from "@react-pdf/renderer";

Font.register({
  family: "calibri",
  fonts: [
    {
      src: "/font/calibrii.ttf",
      fontStyle: "italic",
    },
    {
      src: "/font/calibri.ttf",
      fontWeight: 300,
    },
    {
      src: "/font/calibri.ttf",
      fontWeight: 400,
    },
    {
      src: "/font/calibrib.ttf",
      fontWeight: 500,
    },
    {
      src: "/font/calibrib.ttf",
      fontWeight: 600,
    },
    {
      src: "/font/calibrib.ttf",
      fontWeight: 700,
    },
  ],
});

interface CertificateTemplateProps {
  collaboratorName?: string | null;
  collaboratorDoc?: string | null;
  endDate?: string | null;
  city?: string | null;
}

export const CertificateTemplate = ({
  collaboratorName,
  collaboratorDoc,
  endDate,
  city,
}: CertificateTemplateProps) => {
  return (
    <Document style={{ height: "100%", width: "100%" }}>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <View
            style={{
              height: "101%",
              backgroundColor: "#ff0000",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: 45,
            }}
          />
          <Image
            style={{ width: 130, position: "absolute", top: 10, right: 20 }}
            src="/riesgo.png"
          />

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
              height: "90%",
              marginLeft: 55,
              marginRight: 10,
            }}
          >
            <View style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              {/* --------Title--------- */}
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "30",
                }}
              >
                <Text style={{ fontSize: 36, fontWeight: "bold" }}>
                  COMUNICACIÓN CELULAR
                </Text>
                <Text style={{ fontSize: 36, fontWeight: "bold" }}>
                  COMCEL S.A.
                </Text>
                <Text style={{ fontSize: 15, marginTop: 12 }}>
                  Hace constar que:{" "}
                </Text>
              </View>

              {/* --------Nombres--------- */}
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "semibold",
                    textTransform: "uppercase",
                  }}
                >
                  {collaboratorName}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "normal" }}>
                  Identificado con número de documento:
                </Text>
                <Text style={{ fontSize: 15 }}>{collaboratorDoc}</Text>
              </View>

              {/* --------Course--------- */}
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "normal",
                    marginBottom: 20,
                  }}
                >
                  Participó y aprobó la capacitación:
                </Text>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#ff0000",
                    textTransform: "uppercase",
                  }}
                >
                  FORMACIÓN Y ENTRENAMIENTO SEGURIDAD ELÉCTRICA
                </Text>
                <Text
                  style={{ fontSize: 17, fontWeight: "bold", color: "#ff0000" }}
                >
                  (Cuatro horas)
                </Text>
              </View>
              {/* --------Date and Resolution--------- */}
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 26,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Cumpliendo los Requerimientos de la Resolución 5018 de 2019 y
                  40293 de 2021
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "normal",
                    marginTop: 20,
                  }}
                >
                  {city === "Virtual"
                    ? "Realizado en modalidad virtual,"
                    : `Realizado en ciudad de ${city},`}{" "}
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "semibold",
                      marginBottom: 5,
                    }}
                  >
                    el día {endDate}
                  </Text>
                </Text>
              </View>
            </View>

            <Image
              style={{ height: "75%", alignSelf: "flex-end" }}
              src={`/user.png`}
            />
          </View>

          {/* -------- Signature --------- */}
          <View
            style={{
              width: "75%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginLeft: 35,
              marginBottom: 15,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginLeft: 55,
                marginRight: 40,
              }}
            >
              <Text style={{ fontWeight: "semibold", fontSize: 16 }}>
                FERNANDO FORERO NAVARRETE
              </Text>
              <Text style={{ fontSize: 14 }}>JEFE SST&A</Text>
            </View>
            {/* --------------------------------------------------- */}
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                height: "100%",
              }}
            >
              <View>
                <Image
                  style={{
                    width: 130,
                    height: 28,
                    position: "absolute",
                    top: -25,
                    left: 94,
                  }}
                  src={`/jose-firma2.png`}
                />
                <Text style={{ fontWeight: "semibold", fontSize: 16 }}>
                  JOSE CRISTANCHO DURAN Ing. Área electrotecnia
                </Text>
              </View>
              <Text style={{ fontSize: 12, fontWeight: "semibold" }}>
                M.P: SN250 - 152628
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "semibold" }}>
                Licencia SST 3084 DE 2023
              </Text>
              <Text style={{ fontSize: 14 }}>Instructor</Text>
            </View>
          </View>
          {/* -------- Footer --------- */}
          <View
            style={{
              width: "88%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-start",
              marginLeft: 40,
              marginRight: 80,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 10,
                justifyContent: "flex-start",
              }}
            >
              <Image
                style={{
                  width: 125,
                  height: 42,
                  marginBottom: 20,
                  marginLeft: 10,
                }}
                src={`/ssta.png`}
              />
            </View>
            {/* --------------------------------------------------- */}
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 12, color: "000000", fontStyle: "italic" }}
              >
                La autenticidad de este documento puede ser consultado a través
                del área de seguridad, salud y ambiente (SST&A)
              </Text>
              <Text
                style={{ fontSize: 12, color: "000000", fontStyle: "italic" }}
              >
                correo riesgoelectrico@claro.com.co
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
const styles = StyleSheet.create({
  page: {
    fontFamily: "calibri",
    backgroundColor: "#fff",
    padding: 0,
    marginHorizontal: "auto",
  },
});
