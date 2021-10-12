<template>
    <div>
        <van-popup
            v-model="showDepart"
            position="bottom"
            class="popup-dep btop-radius-8"
            :style="{ height: '49%' }"
            @click-overlay="setShowPopup">
            <div class="button-height">
                <button
                    type="button"
                    class="van-picker__cancel"
                    @click="setShowPopup">
                    取消
                </button>
                <span> 选择部门 </span>
                <button
                    type="button"
                    class="van-picker__confirm"
                    @click="getDep">
                    确定
                </button>
            </div>
            <ul>
                <li
                    v-for="(item, index) in list"
                    :key="index"
                    :class="{'active': item.checked}"
                    @click="checkedItem(item, index)">
                    <span>{{ item.departmentName }}</span>
                    <i class="iconfont icon-correct"></i>
                </li>
            </ul>
        </van-popup>
    </div>
</template>
<script>
import api from '@/utils/apiGe'
import func from '@/utils/func'
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        },
        activeDept: {
            type: Array,
            default: () => []
        },
        initial: {
            type: Boolean,
            default: false
        }
    },
    data () {
        const { ecId, ordId } = func.getRouteParams(this.$route)
        return {
            showDepart: false,
            checkedList: [],
            requestParams: {
                ecId, // 企业ID
                ordId // 企业订购ID
            },
            list: []
        }
    },
    watch: {
        value (newval) {
            this.showDepart = newval
            if (newval) this.getChooseDepartmentList() // 开启时调用 获取部门更改后列表
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
                res.list.forEach((item, index) => {
                    item.checked = false
                    this.activeDept.forEach((departmentId) => { // 选中项
                        if (item.departmentId === departmentId) {
                            item.checked = true
                        }
                    })
                })
                this.list = res.list.filter(item => item.departmentType !== '3') // 过滤掉个人视频彩铃部门 departmentType: 3
                if (this.initial) {
                    this.list[0].checked = true
                    this.$emit('data', [this.list[0]])
                }
            })
        },
        // 关闭弹窗
        setShowPopup () {
            this.$emit('close', false)
            this.list.forEach((item, index) => {
                this.activeDept.forEach((departmentId) => {
                    if (item.departmentId === departmentId) {
                        item.checked = true
                    }
                })
            })
        },
        // 得到部门id
        getDep () {
            const checkedList = this.list.filter(item => item.checked)
            this.$emit('data', checkedList)
            this.$emit('close', false) // 关闭弹窗
        },
        checkedItem (item, index) {
            item.checked = !item.checked
        }
    }
}
</script>
<style lang="less" scoped>
.button-height {
    height: 0.9rem;
    border-bottom: 1px solid #eee;
    padding: 0.1rem 0 0.05rem;
    margin: 0 0.35rem;
    text-align: center;
    position: fixed;
    width: 91%;
    background: #fff;

    span {
        line-height: 0.9rem;
        color: #35344d;
        font-size: 17px;
    }

    button {
        font-size: 16px;
    }

    button:first-child {
        float: left;
        color: #999;
    }

    button:last-child {
        float: right;
        color: #675dff;
    }
}

.popup-dep {
    text-align: left;
    font-size: 16px;

    ul {
        margin-top: 1.55rem;

        li {
            display: flex;
            justify-content: space-between;
            padding-bottom: 0.45rem;
            margin: 0 0.65rem;
            color: #414057;

            i {
                display: none;
            }

            span {
                width: 90%;
                display: inline-block;
            }
        }
    }

    .active {
        color: #675dff;

        i {
            display: inline;
        }
    }
}
</style>
