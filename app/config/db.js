const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const secretName = 'db-secret';
const namespace = 'default';  // 네임스페이스에 주의

// 시크릿 가져오기
k8sApi.readNamespacedSecret(secretName, namespace).then((response) => {
  // 환경 변수 설정
  const dbHost = Buffer.from(response.body.data.DB_HOST, 'base64').toString('utf-8');
  const dbPort = Buffer.from(response.body.data.DB_PORT, 'base64').toString('utf-8');
  const dbUser = Buffer.from(response.body.data.DB_USER, 'base64').toString('utf-8');
  const dbPassword = Buffer.from(response.body.data.DB_PW, 'base64').toString('utf-8');
  const dbName = Buffer.from(response.body.data.DB_NAME, 'base64').toString('utf-8');

  // MySQL 연결 풀 생성
  const mysql = require('mysql2/promise');

  const pool = mysql.createPool({
    host: dbHost,
    user: dbUser,
    port: dbPort,
    database: dbName,
    password: dbPassword,
    waitForConnections: true,
    insecureAuth: true,
    dateStrings: "date",
    connectionLimit: 1000,
    waitForConnections: false
  });

  console.log(dbHost,dbName,dbUser);  // 이제는 변수를 직접 사용
  module.exports = pool;
}).catch((err) => {
  console.error('Error reading secret:', err);
});
