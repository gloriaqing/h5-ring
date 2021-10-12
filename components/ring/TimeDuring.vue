/*
 * @Author: liqiao
 * @Date: 2021-04-14 14:57:15
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-05-19 14:31:32
 * @Desc: 时间段选择
 */

<template>
    <section class="time-during">
        <van-datetime-picker
            v-model="startTime"
            :show-toolbar="false"
            class="time-during-item"
            type="time"
            title="选择时间"
            :visible-item-count="visibleCount"
            :item-height="itemHeight"
            @change="changeTime"
        />
        <div class="time-during-split">
            -
        </div>
        <van-datetime-picker
            v-model="endTime"
            :show-toolbar="false"
            class="time-during-item"
            type="time"
            title="选择时间"
            :visible-item-count="visibleCount"
            :item-height="itemHeight"
            @change="changeTime"
        />
    </section>
</template>

<script>
export default {
    name: 'TimeDuring',
    props: {
        actions: {
            type: Array,
            default: () => []
        },
        start: { // 组件传来的开始时间
            type: String,
            default: ''
        },
        end: { // 组件传来的结束时间
            type: String,
            default: ''
        }
    },
    data () {
        return {
            startTime: '00:00',
            endTime: '23:59',
            minHour: '00',
            minMinute: '00',
            visibleCount: 3,
            itemHeight: '22px'
        }
    },
    watch: {
        start (newVal) {
            this.startTime = newVal.substring(0, 5)
        },
        end (newVal) {
            this.endTime = newVal.substring(0, 5)
        }
    },
    methods: {
        changeTime () {
            const startH = this.startTime.split(':')[0]
            const startM = this.startTime.split(':')[1]
            const endH = this.endTime.split(':')[0]
            const endM = this.endTime.split(':')[1]
            if (Number(startH) > Number(endH)) {
                this.startTime = this.endTime
            } else if (startH === endH && Number(startM) > Number(endM)) {
                this.startTime = this.endTime
            }
            const startTime = this.startTime + ':00'
            const endTime = this.endTime + ':59'
            this.$emit('changeTime', startTime, endTime)
        }
    }
}
</script>

<style lang="less" scoped>
    .time-during {
        display: flex;
        align-items: center;
        justify-content: center;

        .time-during-item {
            flex: 1;
        }

        .time-during-split {
            width: 10%;
            text-align: center;
        }

        /deep/ .van-picker__columns {
            height: 80px;
        }

        /deep/ .van-picker-column::after {
            position: absolute;
            right: 68px;
            top: 20px;
            content: ':';
        }
    }
</style>
