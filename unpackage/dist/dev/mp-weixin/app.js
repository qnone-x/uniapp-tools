"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/home/index.js";
  "./pages/my/index.js";
  "./pages/rate/index.js";
  "./pages/interest/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
console.log(common_vendor.index.$u.config.v, "console.log(uni.$u.config.v);");
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/work/demo/qn-tools/App.vue"]]);
const uniContainer = () => "./components/uni-container/index.js";
const uniTitle = () => "./components/uni-title/index.js";
const app = common_vendor.createSSRApp(App);
app.use(common_vendor.uviewPlus);
app.component("uniContainer", uniContainer);
app.component("uniTitle", uniTitle);
function createApp() {
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
