<template>
  <uni-container title="首页" ref="messageRef" navType="custom">
    <div class="wrapper">111</div>
  </uni-container>
</template>

<script setup>
import { ref } from 'vue';
import UniContainer from '../../components/uni-container/index.vue';
let a = ref(1);
</script>

<style lang="scss">
.wrapper {
  //height: 1500px;
  //background-color: red;
  padding-top: 30px;
  padding-bottom: 50px;
  position: relative;
  z-index: 50;
}

.notice-wrap {
  padding: 0 30px;

  .content-wrap {
    border-radius: 12px;
    width: 100%;
    height: 82px;
    padding: 0 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: linear-gradient(270deg, #bfd8ff 0%, #ecf3ff 37%, #ffffff 100%);

    .icon {
      width: 42px;
      height: 42px;
      //margin-right: 5px;
      flex-shrink: 0;
    }
  }
}
</style>
