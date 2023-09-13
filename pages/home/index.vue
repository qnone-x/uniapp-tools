<template>
  <uni-container title="工具堂" ref="messageRef" navType="custom">
    <view class="flex-start box">
      <view class="item" :key="i.url" v-for="i in list" @click="handleClickItem(i)">
        <image class="img" :src="i.url"></image>
        <view>{{ i.name }}</view>
      </view>
    </view>
  </uni-container>
</template>

<script setup>
import { ref } from 'vue';
let list = ref([
  { name: '利率计算', url: '/static/images/ll.png', path: '/pages/rate/index' },
  { name: '利息计算', url: '/static/images/lx.png', path: '/pages/interest/index' },
]);

function handleClickItem({ path }) {
  uni.navigateTo({ url: path });
}
</script>

<style scoped lang="scss">
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-right: 20px;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 0 5px #f1f1f1;
  .img {
    width: 30px;
    height: 30px;
  }
}
.box {
  flex-wrap: wrap;
}
</style>
