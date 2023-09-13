<template>
  <uniContainer title="利率计算">
    <u--form labelPosition="left" :model="data" :rules="rules" ref="form1" labelWidth="100px">
      <u-form-item label="贷款额度:" prop="amount">
        <u--input v-model="data.amount" border="bottom" type="number"></u--input>
      </u-form-item>
      <u-form-item label="贷款期限:" prop="month">
        <view class="flex-start"> <u--input v-model="data.month" border="bottom" type="number"></u--input>期(月) </view>
      </u-form-item>
      <u-form-item label="年利率:" prop="rate">
        <view class="flex-start"> <u--input v-model="data.rate" border="bottom" type="number"></u--input>%</view>
      </u-form-item>
      <u-form-item label="还款方式:" prop="type">
        <u-radio-group v-model="data.type" @change="groupChange">
          <u-radio
            :customStyle="{ marginRight: '8px' }"
            v-for="(item, key) in rateType"
            :key="key"
            :label="item"
            :name="Number(key)"
          >
          </u-radio>
        </u-radio-group>
      </u-form-item>
      <u-form-item label="">
        <view class="flex-around">
          <view style="width: 48%">
            <up-button type="error" @click="handleReset">重置</up-button>
          </view>
          <view style="width: 48%">
            <up-button type="primary" @click="handleCalc">计算</up-button>
          </view>
        </view>
      </u-form-item>
    </u--form>

    <next-table
      height="300px"
      show-header
      :columns="column"
      stripe
      :fit="false"
      show-summary
      sum-text="合计"
      :summary-method="getSummaries"
      border
      :data="list"
    ></next-table>
  </uniContainer>
</template>
<script setup>
import { reactive, ref } from 'vue';
import NextTable from '../../uni_modules/next-table/components/next-table/next-table.vue';
import { rateType } from './dicts';
import _ from 'lodash';
let data = reactive({
  amount: '250000',
  month: '120',
  rate: '6.37',
  type: 1, //1.等额本金 2.等额本息
  periods: 0,
});
const rules = {};
let list = ref([]);
const column = [
  { name: 'db', label: '还款期数', sorter: true },
  { name: 'hm', label: '每期还款额' },
  { name: 'ma', label: '本期应还本金', width: '120' },
  { name: 'rb', label: '本期应还利息', width: '120' },
  { name: 'ms', label: '剩余本金' },
];

function handleCalc() {
  list.value = [];
  //计算开始
  let da = data.month; //还款期数
  //var ra=Math.round((r/12)*1000,5)/1000   //月利率
  //转换类型
  let r = parseFloat(data.rate);
  let m = parseFloat(data.amount);
  let ra = Math.round((r / (12 * 100)) * 100000, 5) / 100000;

  //等额本金
  if (data.type === 1) {
    let obj = {};
    //每月本金=总本金/还款月数
    let ma = Math.round((m / da) * 100, 5) / 100;
    let hm = 0;
    for (let i = 0; i < da; i++) {
      let db = i + 1;
      //每月还本付息金额=(本金/还款月数)+(本金-累计已还本金)×月利率
      hm = Math.round((m / da + (m - ma * db) * ra) * 100, 5) / 100;
      //每月利息=(本金-累计已还本金)×月利率
      let rb = Math.round((m - ma * db) * ra * 100, 5) / 100;
      //剩余本金
      let ms = Math.round((m - ma * db) * 100, 5) / 100;
      obj = {
        db,
        hm,
        ma,
        rb,
        ms: db != da ? ms : 0,
      };
      list.value.push(obj);
    }
  }
  //等额本息
  if (data.type === 2) {
    let obj = {};
    //1每月还本付息金额 =[ 本金 x 月利率 x(1+月利率)贷款月数 ] / [(1+月利率)还款月数 - 1]
    //月均还款
    let hm = Math.round((ra / (1 - 1 / Math.pow(1 + ra, da))) * m * 100, 5) / 100;
    //还款总利息=贷款额*贷款月数*月利率*（1+月利率）贷款月数/【（1+月利率）还款月数 - 1】-贷款额
    let rb1 = 0;
    let ms = m;
    for (let i = 0; i < da; i++) {
      let db = i + 1;
      //每月利息 = 剩余本金x贷款月利率
      rb1 = ms * ra;
      let rb = Math.round(rb1 * 100, 5) / 100;
      //剩余本金	var ms=Math.round((m-ma*db)*100,5)/100
      ms = Math.round((ms - (hm - rb)) * 100, 5) / 100;
      //每月还的本金
      let maa = Math.round((hm - rb) * 100, 5) / 100;
      obj = {
        db,
        hm,
        ma: maa,
        rb,
        ms: db != da ? ms : 0,
      };
      list.value.push(obj);
    }
  }
}
function handleReset() {
  list.value = [];
}
</script>
<style lang="scss" scoped></style>
