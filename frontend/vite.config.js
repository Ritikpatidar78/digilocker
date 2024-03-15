// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//    server: {
//     proxy: {
//       "/api": {
//         target: "https://localhost:3000/",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://digilocker.onrender.com/",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
});

