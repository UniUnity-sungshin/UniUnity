// dbConnector.js
const k8s = require('@kubernetes/client-node');
require('dotenv').config(); // Load environment variables from .env file

async function getDatabasePool() {
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();
  const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

  const secretName = 'db-secret';
  const namespace = 'default';

  try {
    const response = await k8sApi.readNamespacedSecret(secretName, namespace);

    const dbHost = Buffer.from(response.body.data.DB_HOST, 'base64').toString('utf-8');
    const dbPort = Buffer.from(response.body.data.DB_PORT, 'base64').toString('utf-8');
    const dbUser = Buffer.from(response.body.data.DB_USER, 'base64').toString('utf-8');
    const dbPw = Buffer.from(response.body.data.DB_PW, 'base64').toString('utf-8');
    const dbName = Buffer.from(response.body.data.DB_NAME, 'base64').toString('utf-8');

    process.env.DB_HOST = dbHost;
    process.env.DB_PORT = dbPort;
    process.env.DB_USER = dbUser;
    process.env.DB_PW = dbPw;
    process.env.DB_NAME = dbName;

    console.log(dbHost, dbPort, dbUser, dbPw, dbName);
  } catch (err) {
    console.error('Error reading secret:', err);
    throw err;
  }
}

module.exports = { getDatabasePool };
