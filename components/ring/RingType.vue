/*
 * @Author: liangxunpei
 * @Date: 2021-04-14 14:57:15
 * @Last Modified by:
 * @Last Modified time:
 * @Desc: 播放规则
 */
<template>
    <vant-popup
        v-model="showRingType"
        class="ring-type-popup"
        @close="close"
        @confirm="confirm">
        <div
            slot="body"
            class="popup-content">
            <van-picker
                ref="pickerRef"
                show-toolbar
                :default-index="defaultIndex"
                :columns="ringTypeOptions"
                @change="onChange"
            />
        </div>
    </vant-popup>
</template>
<script>
import authMixins from '@/mixins/auth'
import VantPopup from '@/components/common/VantPopup'
export default {
    name: 'RingType',
    components: {
        VantPopup
    },
    mixins: [authMixins],
    props: {
        value: {
            type: Boolean,
            default: false
        },
        ringTypeList: {
            type: Array,
            default: () => []
        },
        currentRingType: {
            type: [String, Number],
            default: ''
        }
    },
    data () {
        return {
            showRingType: false,
            uploadForm: {
                ringType: '1' // 铃音类型value
            }
        }
    },
    computed: {
        currentRingList () {
            const currentRingList = []
            this.ringTypeList.map(i => {
                if (Number(i.key) === 3) {
                    if (this.checkButtonAuthority('zq:EnterpriseList_ring:10')) { currentRingList.push(i) }
                } else if (Number(i.key) === 4) {
                    if (this.checkButtonAuthority('zq:EnterpriseList_ring:11')) { currentRingList.push(i) }
                } else {
                    currentRingList.push(i)
                }
            })
            return currentRingList
        },
        ringTypeOptions () {
            const ringTypeOptions = []
            this.currentRingList.map(i => {
                ringTypeOptions.push(i.value)
            })
            return ringTypeOptions
        },
        defaultIndex () {
            var currentIndex = ''
            this.currentRingList.forEach((i, index) => {
                if (i.key === String(this.currentRingType)) {
                    currentIndex = index
                }
            })
            return currentIndex
        }
    },
    watch: {
        value (newVal) {
            this.showRingType = newVal
        }
    },
    methods: {
        onChange (picker, value, index) {
            this.uploadForm.ringType = this.ringTypeList.filter(item => item.value === value)[0].key
        },
        // 确定
        confirm () {
            this.$emit('setForm', this.uploadForm)
            this.close()
        },
        // 取消
        close () {
            this.$emit('close', false)
        }
    }
}
</script>
<style lang="less" scoped>
.ring-type-popup {
    /deep/ .van-picker__toolbar {
        display: none;
    }
}
</style>
