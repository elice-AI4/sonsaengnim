import app from "./src/app";
import config from "./src/config";
import mkcert from "mkcert";
import https from "https";

const server = async () => {
  // create a certificate authority
  const ca = await mkcert.createCA({
    organization: "Hello CA",
    countryCode: "NP",
    state: "Bagmati",
    locality: "Kathmandu",
    validityDays: 365,
  });

  // then create a tls certificate
  const cert = await mkcert.createCert({
    domains: ["127.0.0.1", "localhost"],
    validityDays: 365,
    caKey: ca.key,
    caCert: ca.cert,
  });

  https.createServer(cert, app).listen(config.PORT, () => {
    console.log(`${config.PORT}번 포트 온`);
  });
};
server();
