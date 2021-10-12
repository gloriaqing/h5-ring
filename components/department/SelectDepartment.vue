<template>
    <div>
        <van-cell
            title="部门"
            class="select-cell"
            is-link
            :value="selectedDepartment.departmentName || '请选择部门'"
            url=""
            @click="selectDepartmentModalVisible = true" />
        <van-popup
            v-model="selectDepartmentModalVisible"
            class="btop-radius-14"
            position="bottom"
            @closed="selectDepartmentPickerVisable = false"
            @open="getChooseDepartmentList">
            <van-picker
                v-if="selectDepartmentPickerVisable"
                show-toolbar
                :columns="departmentValOptions"
                :default-index="selectedDepartmentIndex"
                @confirm="confirmDepartment"
                @cancel="selectDepartmentModalVisible = false"
            />
        </van-popup>
    </div>
</template>
<script>
import api from '@/utils/apiGe'
import func from '@/utils/func'

export default {
    name: 'SelectDepartment',
    props: {
        selectedDepartment: {
            type: Object,
            default: () => {}
        },
        initial: { // 初始化选择第一个
            type: Boolean,
            default: false
        },
        all: { // 全部筛选
            type: Boolean,
            default: false
        },
        noPersonal: {
            type: Boolean,
            default: false
        }
    },
    data () {
        const { ecId, ordId } = func.getRouteParams(this.$route)
        return {
            requestParams: {
                ecId, // 企业ID
                ordId // 企业订购ID
            },
            selectDepartmentModalVisible: false, // 选择部门popup控制参数
            selectDepartmentPickerVisable: false, // 选择部门picker控制参数
            departmentOptions: [] // 部门选择的项

        }
    },
    computed: {
        departmentValOptions () {
            const departmentValOptions = []
            this.departmentOptions.map(i => {
                departmentValOptions.push(i.departmentName)
            })
            return departmentValOptions
        },
        selectedDepartmentIndex () {
            return this.departmentOptions.findIndex(v => v.departmentId === this.selectedDepartment.departmentId)
        }
    },
    watch: {
        selectDepartmentModalVisible (val) {
            if (val) this.selectDepartmentPickerVisable = true
        }
    },
    mounted () {
        if (this.initial) {
            this.getChooseDepartmentList()
        }
    },
    methods: {
        // 获取可选择的部门列表枚举
        getChooseDepartmentList () {
            const params = this.requestParams
            params.pageNum = 1
            params.pageSize = 0
            api.getDepartmentList(params).then(res => {
                this.departmentOptions = res.list
                if (this.all) {
                    this.departmentOptions.unshift({ departmentName: '全部', departmentId: '' })
                }
                if (this.initial) {
                    this.$emit('selected', this.departmentOptions[0])
                }
                if (this.noPersonal) { // 铃音管理不涉及个人类型
                    this.departmentOptions = res.list.filter(item => item.departmentType !== '3')
                }
            })
        },
        // 确认选择部门
        confirmDepartment (val, index) {
            this.departmentOptions[index].index = index // 默认选中项
            this.$emit('selected', this.departmentOptions[index])
            this.selectDepartmentModalVisible = false
        }
    }
}
</script>
<style lang="less" scoped>
.select-cell {
    position: relative;
    width: 6.86rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 0.16rem;
    box-shadow: 0 5px 10px 0 rgba(185, 190, 199, 0.2);
}
</style>
