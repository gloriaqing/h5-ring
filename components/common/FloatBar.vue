/*
 * @Author: zhengqiang
 * @Date: 2021-04-01 14:31:36
 * @Desc: 页面右边固定浮窗
 */

<template>
    <section
        v-el-drag="'main-body'"
        class="float-bar">
        <div
            v-for="(action, index) in normalActions"
            :key="action.route"
            :class="['item', { last: (index === normalActions.length - 1 && !otherActions.length) || (!showOther && index === normalActions.length - 1) }, {disabled: action.disabled}]"
            @click="toAction(action)">
            <img :src="getImg(action.icon)">
            <div class="text">
                {{ action.text }}
            </div>
        </div>
        <section v-show="otherActions.length && showOther">
            <div
                v-for="(action, index) in otherActions"
                :key="action.route"
                :class="['item', { last: index === otherActions.length - 1 }, {disabled: action.disabled}]"
                @click="toAction(action)">
                <img :src="getImg(action.icon)">
                <div class="text">
                    {{ action.text }}
                </div>
            </div>
        </section>
        <div
            class="arrow-icon"
            @click="showOther = !showOther">
            <i
                v-if="!showOther"
                class="iconfont icon-Packup">
            </i>
            <i
                v-else
                class="iconfont icon-step">
            </i>
        </div>
    </section>
</template>

<script>
export default {
    name: 'FloatBar',
    props: {
        actions: {
            type: Array,
            default: () => []
        },
        type: { // 1为铃音管理页面 0为其它页面
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            showOther: true
        }
    },
    computed: {
        normalActions () {
            const actions = this.actions
            return actions.length <= 2 ? actions : actions.slice(0, 2)
        },
        otherActions () {
            const actions = this.actions
            return actions.length <= 2 ? [] : actions.slice(2)
        }
    },
    methods: {
        toAction (action) {
            if (action.disabled) return // 异常/暂停/开通待归档状态相关页面不能点击
            const actionRoute = action.route
            // 铃音管理页面的铃音上传按钮使用replace方法
            if (this.type === 1 && actionRoute === 'UploadRing') {
                this.$router.replace({
                    name: action.route,
                    params: action.params
                })
            } else {
                this.$router.push({
                    name: action.route,
                    params: action.params
                })
            }
        },
        getImg (name) {
            return require(`@/assets/${name}.png`)
        }
    }
}
</script>

<style lang="less" scoped>
    .float-bar {
        position: fixed;
        right: 32px;
        bottom: 20%;
        border-radius: 100px;
        padding: 22px 6px;
        text-align: center;
        font-size: 11px;
        background: #fff;
        color: #404257;
        box-shadow: 0 5px 10px 0 rgba(185, 190, 199, 0.2);
        touch-action: none;

        .item {
            margin-bottom: 8px;

            &.last {
                margin-bottom: 0;
            }
        }

        img {
            display: inline-block;
            width: 36px;
        }

        .text {
            margin-top: -8px;
        }

        .arrow-icon {
            position: relative;
            top: 10px;
            font-size: 14px;
            color: #ccc;
        }
    }
</style>
