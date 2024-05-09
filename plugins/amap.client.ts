// 引入 AMapLoader 依赖包
import AMapLoader from "@amap/amap-jsapi-loader";
export default defineNuxtPlugin(async (nuxtApp) => {
  // 安全密钥
  (window as any)._AMapSecurityConfig = {
    securityJsCode: "b311cee28d7357d51dea98873bb88ef3",
  };
  return {
    provide: {
      _AMap: await AMapLoader.load({
        key: "d6d36547a7eb1e54b66c9893a962c339",
        version: "2.0",
        plugins: [],
      }),
    },
  };
});
