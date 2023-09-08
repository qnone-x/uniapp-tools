import App from './App';
import './styles/index.scss';
// import 'vant/lib/index.css';
// #ifndef VUE3
import Vue from 'vue';
Vue.config.productionTip = false;
App.mpType = 'app';

try {
  function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
  }

  // 统一 vue2 API Promise 化返回格式与 vue3 保持一致
  uni.addInterceptor({
    returnValue(res) {
      if (!isPromise(res)) {
        return res;
      }
      return new Promise((resolve, reject) => {
        res.then((res) => {
          if (res[0]) {
            reject(res[0]);
          } else {
            resolve(res[1]);
          }
        });
      });
    },
  });
} catch (error) {}

const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue';

import uniContainer from '@/components/uni-container/index.vue';
import uniTitle from '@/components/uni-title';
const app = createSSRApp(App);

app.component('uniContainer', uniContainer);
app.component('uniTitle', uniTitle);
export function createApp() {
  return {
    app,
  };
}
// #endif
