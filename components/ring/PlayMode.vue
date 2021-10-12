/*
 * @Author: liangxunpei
 * @Date: 2021-04-14 14:57:15
 * @Last Modified by:
 * @Last Modified time:
 * @Desc: 播放方式
 */
<template>
    <vant-popup
        v-model="showPlayMode"
        @close="close"
        @confirm="confirm">
        <div
            slot="body"
            class="popup-content">
            <van-radio-group v-model="uploadForm.setType">
                <template v-for="item in setTypeList">
                    <van-radio
                        :key="item.key"
                        :name="item.key"
                        checked-color="#675dff">
                        {{ item.value }}
                    </van-radio>
                </template>
            </van-radio-group>
        </div>
    </vant-popup>
</template>
<script>
import VantPopup from '@/components/common/VantPopup'
export default {
    name: 'PlayRules',
    components: {
        VantPopup
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        initSetType: {
            type: String,
            default: '0'
        }
    },
    data () {
        return {
            showPlayMode: false,
            uploadForm: {
                setType: '0' // 播放规则value
            },
            setTypeList: [
                { key: '0', value: '覆盖单独播放' },
                { key: '1', value: '加入随机轮播' }
            ]
        }
    },
    watch: {
        value (newval) {
            this.showPlayMode = newval
        },
        initSetType (newVal) {
            this.uploadForm.setType = newVal
        }
    },
    methods: {
        // 确定
        confirm () {
            this.$emit('setForm', this.uploadForm)
            this.$emit('close', false)
        },
        // 取消
        close () {
            this.$emit('close', false)
        }
    }
}
</script>
<style lang="less" scoped>
.popup-content {
    padding: 0.48rem 0.64rem;
    text-align: left;

    .van-radio {
        margin-bottom: 0.48rem;
    }

    .play-switch {
        vertical-align: middle;
        margin-top: 0.48rem;

        p {
            float: left;
            color: #675dff;
            margin-right: 0.32rem;
        }
    }

    /deep/ .van-radio__label {
        font-size: 0.32rem;
        margin-left: 12px;
    }

    /deep/ .van-radio__icon--checked + .van-radio__label {
        color: #675dff;
        font-size: 0.32rem;
    }
}
</style>
