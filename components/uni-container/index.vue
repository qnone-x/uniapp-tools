<template>
  <view class="container">
    <image class="img" :src="bg2" model="scaleToFill" />
    <view class="header-wrap">
      <view class="status-bar" :style="{ height: `${systemInfo?.statusBarHeight}px` }" />
      <div class="header">
        <template v-if="navType === 'custom'">
          <uni-title>{{ title }}</uni-title>
        </template>
        <templatate v-else>
          <view class="left" @click="handleBack()">
            <image class="back-img" :src="back"></image>
          </view>
          <uni-title>{{ title }}</uni-title>
        </templatate>
      </div>
    </view>
    <view style="position: relative; z-index: 999; padding: 20px">
      <slot />
    </view>
  </view>
</template>

<script>
import bg2 from '~@/static/images/bg-back-2.jpg';
import back from '~@/static/images/back.png';
export default {
  props: {
    navType: {
      type: String,
      default: 'default',
    },
    title: {
      type: String,
      default: '标题',
    },
    leftArrow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      bg2,
      back,
      systemInfo: {},
    };
  },
  created() {
    // 获取设备系统信息
    this.systemInfo = wx.getSystemInfoSync();
    // 输出设备信息
    console.log('设备型号：', this.systemInfo.model);
    console.log('操作系统版本：', this.systemInfo.system);
    console.log('屏幕宽度：', this.systemInfo.windowWidth);
    console.log('屏幕高度：', this.systemInfo.windowHeight);
    console.log('像素比率：', this.systemInfo.pixelRatio);
    console.log('刘海/电池状态栏->高度：', this.systemInfo.statusBarHeight);
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    });
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },
  },
};
</script>
<style scoped lang="scss">
.back-img {
  width: 26px;
  height: 26px;
}
.img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 0;
}
.status-bar {
  width: 100%;
  //border: 1px dashed black;
}

.header-wrap {
  position: sticky;
  top: 0;
  z-index: 100;
  //background-position: center;
  //background-size: 100% 100%;
  //background-repeat: no-repeat;
  height: 80px;
}

.header {
  position: relative;
  height: 40px;
  line-height: 40px;
  //border: 1px dashed black;
  display: flex;
  justify-content: center;
  align-items: center;
  .left {
    position: absolute;
    left: 0;
    padding-left: 15px;
    top: 5px;
    height: 26px;
    //border: 1px dashed black;
  }
}
</style>
