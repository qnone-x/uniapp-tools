
## 介绍
基于uni-app开发的一个普通的表格组件，功能有固定首列和表头、排序、操作按钮、
table 表格 固定表头、固定首列、多列 上拉加载更多、 排序、自适应列宽、多选checkbox、编辑、删除、按钮、合计 多页功能
已用于生产环境

> 遇到问题或有建议可以加入QQ群(<font color=#f00>455948571</font>)反馈  
> 如果觉得组件不错，<font color=#f00>给五星鼓励鼓励</font>咯！


## 参考依赖
本组件居于github开源项目[zb-table](https://github.com/zouzhibin/zb-table#readme)进行二开，功能会有些差异和增强，如果有需要原版请参考源开源项目。感谢作者

## 注意本插件依赖于scss的编译，如果没有使用scss请手动改源码去掉scss的语法方可使用。如果有疑问请加入加入QQ群(<font color=#f00>455948571</font>)

## 使用

>[从uniapp插件市场导入](https://ext.dcloud.net.cn/plugin?name=next-table)

### 预览

***

|                 						功能预览                  			 |   
| :----------------------------------------------------------: |
| ![](https://lixueshiaa.github.io/webtest/www/static/next-table.gif) |

## 示例(vue3+ts; 同样支持vue2,这里不再写vue2的demo)
``` html
<next-table
            :show-header="true"
            :columns="column"
            :stripe="true"
            :fit="false"
            show-summary
            sum-text="合计"
            @rowClick="rowClick"
            :summary-method="getSummaries"
            @toggleRowSelection="toggleRowSelection"
            @toggleAllSelection="toggleAllSelection"
            :border="true"
            @edit="buttonEdit"
            @dele="dele"
            :data="data"></next-table>
```

```js
<script setup lang="ts">
import {ref, unref} from "vue"
const pageIndex = ref(1)
const pageTotal = ref(5)
const datalist = ref([])
const checkNameList = ref([])

function getdatalist(pageIndex) {
	const pageSize = 10
	const arr = []
	for(let i = pageSize*(pageIndex-1) + 1; i < pageSize*pageIndex; i++) {
		arr.push({
			date: '2023-06-23',
			name: `刘先生${i}`,
			province: '上海',
			sex: i%2 ? '0' : '1',
			checked: unref(checkNameList)[unref(pageIndex)] ? unref(checkNameList)[unref(pageIndex)].indexOf(`刘先生${i}`) !== -1 : false,
			age: 20,
			img: 'https://gss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=e58ae9feb1003af34defd464001aea6a/8601a18b87d6277f4d763bcf2f381f30e824fce5.jpg',
			city: '广州市',
			address: '天河区东圃镇2002号',
			zip: 200333
		})
	}
	datalist.value = arr
} 
function pageChange(index) {
	pageIndex.value = index
	getdatalist(unref(pageIndex))
}
function dele(item) {
	const index = unref(datalist).findIndex(it => it.name == item.name)
	if (index != -1) {
		unref(datalist).splice(index, 1)
	}
}
function toggleAllSelection(_, list) {
	unref(checkNameList)[unref(pageIndex)] = list.map(item => item.name)
}
function toggleRowSelection(bool, list) {
	unref(checkNameList)[unref(pageIndex)] = list.map(item => item.name)
}
function buttonEdit(item) {
	console.log(111111, item)
}
const column = ref([
	{ type:'selection', fixed:true,width:60 },
	{ name: 'name', label: '姓名',fixed:false,width:80,emptyString:'--' },
	{ name: 'age', label: '年纪',sorter:false,align:'right', },
	{ name: 'sex', label: '性别',filters:{'0':'男','1':'女'}},
	{ name: 'img', label: '图片',type:"img" },
	{ name: 'address', label: '地址' },
	{ name: 'date', label: '日期',sorter:true },
	{ name: 'province', label: '省份' },
	{ name: 'city', label: '城市' },
	{ name: 'zip', label: '邮编' },
	{ name: 'operation', type:'operation',label: '操作',renders:[
		{
			name:'编辑',
			func:'edit' // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
		},
		{
			name:'删除',
			type:'warn',
			func:"dele"
		},
	]},
])
getdatalist(unref(pageIndex))
</script>

```

## table 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |是否必须|
| ------ | ------ | ------ | ------ | ------ |------ |
| data | 显示的数据 | array |-- | -- |必须 |
| column | 显示的列数据 | array |-- | -- |必须 |
| stripe | 是否为斑马纹 table| boolean | - |false | 否 |
| fit | 列的宽度是否自撑开 | boolean |true,false | false |否 |
| show-header | 是否显示表头 | boolean |true,false | true |否 |
| cell-style | 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。 | Function({row, column, rowIndex, columnIndex})/Object |-- | -- |否 |
| cell-header-style | 头部单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。 | Function({ column, columnIndex})/Object |-- | -- |否 |
| formatter | colomn =》formatter 必须设置为true,才有作用，进行格式化数据，进行数据的转换 | Function({row, column, rowIndex, columnIndex})/Object |-- | -- |否 |
| border | 是否带有纵向边框 | boolean |true,false | true |否 |
| highlight | 是否要高亮当前行 | boolean |true,false | false |否 |
| show-summary | 是否在表尾显示合计行 | boolean |true,false | false |否 |
| sum-text | 合计行第一列的文本 | String |- | 合计 |否 |
| summary-method | 自定义的合计计算方法 | Function({ columns, data }) |- | - |否 |
| permissionBtn | 是否动态控制按钮的显示隐藏 | Function({ row, renders,index }) |- | - |否 |
| isShowLoadMore | 是否开启上拉加载 | boolean |true,false | false |否 |
| pullUpLoading | 开启上拉加载后的返回函数，接收参数done是函数,done(type),type为空代表还有数据，继续开启上拉加载，type='ok',代表结束上拉加载 | Function(done) |-- | -- |否 |
| showPaging | 是否开启分页器 | boolean |true,false | false |否 |
| pageIndex | 开启分页器后，当前页码 | Number |-- | 1 |否 |
| pageTotal | 开启分页器后，总页数 | Number |-- | 0 |否 |
| primaryColor | 主题颜色(注意：只支持16进制的颜色值如 #000000) | String |-- | 0 |#f0ad4e |

```
关闭上拉加载的方式1：pullUpLoading((done)=>{
	done(type)
})
done 接收参数为 type ，type为空代表还有数据，可以继续加载，无数据的时候传入 'ok'代表结束
```

## table 事件
| 参数 | 说明 | 类型 | 可选值                      | 默认值 |是否必须|
| ------ | ------ | ------ |--------------------------| ------ |------ |
| 事件名自定义 | 取决于type类型为operation的 renders参数里面 func 的参数名 | Function | (row,index)=>{}          | -- |否 |
| sort-change | 取决于type类型为operation的 renders参数里面 func 的参数名 | Function | (column,model,index)=>{} | -- |否 |
| currentChange | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight属性,this.$refs.table.resetHighlight()清除选中 | Function | (row,index)=>{}          | -- |否 |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态，第一个参数代表选中状态，参数二代表选中的对象 | Function | (selected ,array)=>{}    | -- |否 |
| toggleAllSelection | 用于多选表格，切换所有行的选中状态 ，第一个参数代表选中状态，参数二代表选中的对象| Function | (selected ,array)=>{}    | -- |否 |
| rowClick | 单击某行 ，第一个参数代表选中对象，参数二代表选中的index| Function | (row ,index)=>{}         | -- |否 |
| cellClick | 单击单元格 ，当某个单元格被点击时会触发该事件| Function | (row ,index,column)=>{}        | -- |否 |
| pullUpLoading | 开启上拉加载后的返回函数，无参数| Function  | --                       |-- |否 |
| pageChange | 开起分页paging时候，分页切换后的事件 返回切换后的页码 | Function  | --                       |-- |否 |

```
关闭上拉加载的方式2：this.$refs.zbTable.pullUpCompleteLoading('ok')
接收参数为 type ，type为空代表还有数据，可以继续加载，无数据的时候传入 'ok'代表结束
```

## data 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| checked | 是否被勾选 | boolean |true,false | 无 |


## column 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | ------ | ------ |
| name | 属性值 | string |-- | 无 |
| label | 显示的标题 | string |-- | 无 |
| width | 列的宽度 | number |-- | 100 |
| fixed | 列是否固定在左侧，true 表示固定在左侧 | boolean |true,false | true |
| sorter | 排序，当设置为custom的时候代表自定义排序，不会再触发默认排序，会触发table事件@sort-change,可以通过接口来进行排序 | boolean |true,false,'custom' | false |
| emptyString | 当值为空的时候默认显示的值 | string |  | -- |
| filters | 对象过滤的选项，对象格式，对象中的元素需要有 key 和 value 属性。 | Object | {key:value} | -- |
| align | 对齐方式 | String | left/center/right | left |
| type | 为 operation 的时候代表为操作按钮,img的时候代表图片地址,index代表序列号 | string | operation,img,index | -- |
| renders | type 为operation的时候 必传 | Array | {name:'名字',func:"父元素接收事件名",type:"按钮的类型",size:"大小"} | -- |
```
type 为 operation 的时候代表为操作按钮
renders 代表传入的按钮  Array  =>[
    {
        name:'编辑',
        class:"", // 添加class
        type:'primary',代表按钮的类型  type 为custom的时候自定义按钮 其他类型取决于uniapp buttom组件按钮
        size:'mini',代表按钮的大小
        func:'edit' // func 代表操作按钮点击的事件名字 父元素接收的事件 父元素 @edit
        例如：// <next-table @edit=""/> 
        
    }
]
```

