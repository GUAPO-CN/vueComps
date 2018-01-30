<template>
	<div>
		<el-table :data="tableData" :span-method="arraySpanMethod" border style="width: 100%">
			<el-table-column prop="id" label="ID" width="180">
			</el-table-column>
			<el-table-column prop="name" label="姓名">
			</el-table-column>
			<el-table-column prop="amount1" sortable label="数值 1">
			</el-table-column>
			<el-table-column prop="amount2" sortable label="数值 2">
			</el-table-column>
			<el-table-column prop="amount3" sortable label="数值 3">
			</el-table-column>
		</el-table>

		<el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
			<el-table-column prop="id" label="ID" width="180">
			</el-table-column>
			<el-table-column prop="name" label="姓名">
			</el-table-column>
			<el-table-column prop="amount1" label="数值 1（元）">
			</el-table-column>
			<el-table-column prop="amount2" label="数值 2（元）">
			</el-table-column>
			<el-table-column prop="amount3" label="数值 3（元）">
			</el-table-column>
		</el-table>
		<!--基础表格-->
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="date" label="日期" width="180">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="180">
			</el-table-column>
			<el-table-column prop="address" label="地址">
			</el-table-column>
		</el-table>
		<!--带斑马纹表格-->
		<el-table :data="tableData" stripe style="width: 100%">
			<el-table-column prop="date" label="日期" width="180">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="180">
			</el-table-column>
			<el-table-column prop="address" label="地址">
			</el-table-column>
		</el-table>
		<!--带状态表格-->
		<el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
			<el-table-column prop="date" label="日期" width="180">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="180">
			</el-table-column>
			<el-table-column prop="address" label="地址">
			</el-table-column>
		</el-table>

		<!--¶ 固定列-->
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column fixed prop="date" label="日期" width="150">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120">
			</el-table-column>
			<el-table-column prop="province" label="省份" width="120">
			</el-table-column>
			<el-table-column prop="city" label="市区" width="120">
			</el-table-column>
			<el-table-column prop="address" label="地址" width="300">
			</el-table-column>
			<el-table-column prop="zip" label="邮编" width="120">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
					<el-button type="text" size="small">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [{
					id: '12987122',
					name: '王小虎',
					amount1: '234',
					amount2: '3.2',
					amount3: 10
				}, {
					id: '12987123',
					name: '王小虎',
					amount1: '165',
					amount2: '4.43',
					amount3: 12
				}, {
					id: '12987124',
					name: '王小虎',
					amount1: '324',
					amount2: '1.9',
					amount3: 9
				}, {
					id: '12987125',
					name: '王小虎',
					amount1: '621',
					amount2: '2.2',
					amount3: 17
				}, {
					id: '12987126',
					name: '王小虎',
					amount1: '539',
					amount2: '4.1',
					amount3: 15
				}]
			};
		},
		methods: {
			arraySpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if(rowIndex % 2 === 0) {
					if(columnIndex === 0) {
						return [1, 2];
					} else if(columnIndex === 1) {
						return [0, 0];
					}
				}
			},
			tableRowClassName({
				row,
				rowIndex
			}) {
				if(rowIndex === 1) {
					return 'warning-row';
				} else if(rowIndex === 3) {
					return 'success-row';
				}
				return '';
			},
			objectSpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if(columnIndex === 0) {
					if(rowIndex % 2 === 0) {
						//						return {
						//							rowspan: 2,
						//							colspan: 1
						//						};
						return [2, 1];
					} else {
						//						return {
						//							rowspan: 0,
						//							colspan: 0
						//						};
						return [0, 0];
					}
				}
			},
		},
	};
</script>
<style type="text/css">
	.el-table .warning-row {
		background: oldlace;
	}
	
	.el-table .success-row {
		background: #f0f9eb;
	}
</style>