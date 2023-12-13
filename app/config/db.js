
const k8s = require('@kubernetes/client-node');

// Kubernetes 클라이언트 구성
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

// 쿠버네티스 API 사용
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

// 시크릿 이름과 네임스페이스 설정
const secretName = 'db-secrets';
const namespace = 'uniunity';

const mysql = require('mysql2/promise');

// 시크릿 가져오기
k8sApi.readNamespacedSecret(secretName, namespace).then((response) => {
  const dbHost = Buffer.from(response.body.data.DB_HOST, 'base64').toString('utf-8');
  const dbPort = Buffer.from(response.body.data.DB_PORT, 'base64').toString('utf-8');
  const dbUser = Buffer.from(response.body.data.DB_USER, 'base64').toString('utf-8');
  const dbPassword = Buffer.from(response.body.data.DB_PASSWORD, 'base64').toString('utf-8');
  const dbName = Buffer.from(response.body.data.DB_NAME, 'base64').toString('utf-8');

  // 이제 dbHost, dbPort, dbUser, dbPassword, dbName 변수를 사용하여 DB에 연결할 수 있습니다.

  // MySQL 연결 풀 생성

  const pool = mysql.createPool({
    host:dbHost,
        user:dbUser,
        port:dbPort,
        database:dbName,
        password:dbPassword,
        waitForConnections:true,
        insecureAuth:true,
        dateStrings : "date",
        connectionLimit: 1000,
        waitForConnections: false
        
});

module.exports=pool;
}).catch((err) => {
  console.error('Error reading secret:', err);
});



