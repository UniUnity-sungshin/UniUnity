// dbConnector.js
const k8s = require('@kubernetes/client-node');

async function getDatabasePool() {
  return new Promise(async (resolve,reject)=>{
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
  
    const secretName = 'db-secret';
    const namespace = 'default';  // 네임스페이스에 주의
  
    try {
      // 시크릿 가져오기
      const response = await k8sApi.readNamespacedSecret(secretName, namespace);
  
      // 환경 변수 설정
      const dbHost = Buffer.from(response.body.data.DB_HOST, 'base64').toString('utf-8');
      const dbPort = Buffer.from(response.body.data.DB_PORT, 'base64').toString('utf-8');
      const dbUser = Buffer.from(response.body.data.DB_USER, 'base64').toString('utf-8');
      const dbPw = Buffer.from(response.body.data.DB_PW, 'base64').toString('utf-8');
      const dbName = Buffer.from(response.body.data.DB_NAME, 'base64').toString('utf-8');
      
      resolve({ dbHost:dbHost,dbPort:dbPort,dbUser:dbUser,dbPw:dbPw,dbName:dbName });
    } catch (err) {
      console.error('Error reading secret:', err);
      throw err; // 호출자에게 에러 전파
    }
  })
 
  
}
//db.js
// require('dotenv').config();
const dbInfo = await getDatabasePool()
console.log(`dbInfo:${dbInfo} `)
const mysql = require('mysql2/promise');

// MySQL 연결 풀 생성
const pool = mysql.createPool({
    host:dbInfo.dbHost,
        user:dbInfo.user,
        port:dbInfo.port,
        database:dbInfo.database,
        password:dbInfo.password,
        waitForConnections:true,
        insecureAuth:true,
        dateStrings : "date",
        connectionLimit: 1000,
        waitForConnections: false
        
});
console.log('db.js파일 Pool:', pool);

module.exports=pool;