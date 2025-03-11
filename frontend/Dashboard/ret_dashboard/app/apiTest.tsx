// 'use client';

// import { useEffect, useState } from 'react';
// import api from './utils/api';

// export default function ApiTest() {
//   const [data, setData] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     api.get('/app') // Adjust endpoint as per Swagger UI
//       .then((res) => setData(res.data))
//       .catch((err) => setError(err.message));
//   }, []);

//   return (
//     <div className="p-5">
//       <h1 className="text-2xl font-bold">API Test</h1>
//       {error ? (
//         <p className="text-red-500">Error: {error}</p>
//       ) : (
//         <pre className="bg-gray-100 p-3 rounded">{JSON.stringify(data, null, 2)}</pre>
//       )}
//     </div>
//   );
// }
