<template>
  <view class="container">
    <view class="header-wrap" :style="{ backgroundImage: `url('../../static/images/bg-back-1.jpg')` }">
      <view class="status-bar" :style="{ height: `${systemInfo.statusBarHeight}px` }" />
      <div class="header">
        <template v-if="navType === 'custom'">
          <view class="title">{{ title }}</view>
        </template>
        <templatate v-else>
          <view class="left" @click="handleBack()">
            <u-icon name="arrow-left" color="#000000" size="22" />
          </view>
          <view class="title">{{ title }}</view>
        </templatate>
      </div>
    </view>
    <view class="bg-wrap" :style="{ paddingTop: `calc(${statusBarHeight}px + 40rpx)` }">
      <image class="img" :src="'../../static/images/bg-back-2.jpg'" model="scaleToFill" />
    </view>
    <view style="position: relative; z-index: 999">
      <slot />
    </view>
  </view>
</template>

<script>
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
      statusBarHeight: 0,
      systemInfo: {},
    };
  },
  created() {
    // 获取设备系统信息
    this.systemInfo = wx.getSystemInfoSync();
    // 输出设备信息
    console.log('设备型号：', systemInfo.model);
    console.log('操作系统版本：', systemInfo.system);
    console.log('屏幕宽度：', systemInfo.windowWidth);
    console.log('屏幕高度：', systemInfo.windowHeight);
    console.log('像素比率：', systemInfo.pixelRatio);
    console.log('刘海/电池状态栏->高度：', systemInfo.statusBarHeight);
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
.bg-wrap {
  width: 100%;
  height: 800px;
  position: absolute;
  z-index: 0;
  top: 0;

  .img {
    width: 100%;
    height: 100%;
  }
}

.status-bar {
  width: 100%;
  //border: 1px dashed black;
}

.header-wrap {
  position: sticky;
  top: 0;
  z-index: 100;
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 80px;
}

.header {
  position: relative;
  height: 40px;
  line-height: 40px;
  //border: 1px dashed black;

  .left {
    position: absolute;
    left: 0;
    padding-left: 15px;
    //border: 1px dashed black;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .title {
    text-align: center;
  }
}
</style>
