/*
 * @Author: liangxunpei
 * @Date: 2021-04-15 09:57:15
 * @Last Modified by:
 * @Last Modified time:
 * @Desc: 弹出层公共样式
 */
<template>
    <van-popup
        v-model="visible"
        position="bottom"
        class="popup-dep btop-radius-14"
        @click-overlay="close">
        <div class="button-height">
            <button
                type="button"
                class="van-picker__cancel"
                @click="close">
                取消
            </button>
            <p>请选择</p>
            <button
                type="button"
                class="van-picker__confirm"
                @click="confirm">
                确定
            </button>
            <van-divider />
        </div>
        <slot name="body"></slot>
    </van-popup>
</template>
<script>
export default {
    name: 'VantPopup',
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            visible: false
        }
    },
    watch: {
        value (newval) {
            this.visible = newval
        }
    },
    methods: {
        // 取消
        close () {
            this.$emit('close', false)
        },
        // 确定
        confirm () {
            this.$emit('confirm', false)
        }
    }
}
</script>
<style lang="less" scoped>
.popup-dep {
    max-height: 50%;

    .button-height {
        position: relative;
        height: 1rem;
        line-height: 1rem;
        padding: 0 0.32rem;
        text-align: left;
        margin-bottom: 10px;

        .van-picker__cancel,
        .van-picker__confirm {
            position: absolute;
            float: left;
            padding: 0 0.32rem;
            font-size: 0.32rem;
        }

        .van-picker__cancel {
            left: 0;
        }

        .van-picker__confirm {
            right: 0;
            top: 0;
            color: #675dff;
        }

        p {
            font-size: 0.36rem;
            text-align: center;
        }
    }

    .van-divider {
        margin: 0;
    }
}
</style>
