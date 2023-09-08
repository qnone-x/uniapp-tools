<template>
  <uniContainer title="利率计算">
    1
    <!--    <van-button type="primary">主要按钮</van-button>-->
    <!--    <u-form :model="data" ref="uForm">-->
    <!--      <u-form-item label="贷款额度:"><u-input v-model="data.amount" /></u-form-item>-->
    <!--      <u-form-item label="贷款期限:"> <u-input v-model="data.month" />期(月) </u-form-item>-->
    <!--      <u-form-item label="年利率:"> <u-input v-model="data.rate" />% </u-form-item>-->
    <!--    </u-form>-->
  </uniContainer>
</template>
<script setup>
import { reactive, ref } from 'vue';
import _ from 'lodash';
let data = reactive({
  amount: '250000',
  month: '120',
  rate: '6.37',
  type: 1, //1.等额本金 2.等额本息
  periods: 0,
});
let list = ref([]);
</script>
<style lang="scss" scoped></style>
