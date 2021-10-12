<template>
    <div>
        <company-info
            :company-info="companyInfo"
            :company-member-info="companyMemberInfo"
            :department-id="pageParams.departmentId" />
        <div class="cover-label">
            <div class="labels">
                <span
                    v-if="labelList.length>0"
                    :class="{active: ringLabel === '全部'}"
                    @click="changeLabel('全部')">全部</span>
                <span
                    v-for="(item, index) in labelList"
                    :key="index"
                    :class="{active: item.id === ringLabel}"
                    @click="changeLabel(item)">
                    {{ item.ringLabel }}
                </span>
            </div>
        </div>
        <select-department
            :selected-department="info"
            :no-personal="true"
            class="dept"
            :initial="info.departmentName === ''"
            @selected="getData" />
        <div class="tab">
            <van-tabs
                class="van-tabs-cover"
                background="transparent"
                swipe-threshold="3"
                @click="changeTag">
                <van-tab
                    v-for="(item, index) in tabs"
                    :key="index"
                    :border="false"
                    :ellipsis="false"
                    :title="item.value">
                </van-tab>
            </van-tabs>
        </div>
        <div class="ring-list list-content">
            <div class="top-item">
                <div class="ring-card">
                    <van-pull-refresh
                        v-model="refreshing"
                        :class="{'no-data':!ringList.length && !loading}"
                        @refresh="onRefresh">
                        <van-list
                            v-model="loading"
                            :finished="finished"
                            finished-text="没有更多了"
                            @load="onLoad">
                            <div
                                v-for="(ring, index) in ringList"
                                :key="index"
                                :class="{active: ring.checked}"
                                class="list"
                                @click="handleCheck(ring)">
                                <div
                                    class="ring-info"
                                    :class="{'checkbox-middle': ringType === 3 || ringType === 4 }">
                                    <div class="ring-top">
                                        <div
                                            v-if="!info.isMultiTime || (ringType!==1 && ringType!==2)"
                                            class="top-checkbox">
                                            <van-checkbox
                                                v-model="ring.checked"
                                                shape="square"
                                                icon-size="16px"
                                                checked-color="#675dff" />
                                        </div>
                                        <pre-play-video
                                            :class="{'pre-img':true, 'cover-img': ringType===1}"
                                            :data="ring"
                                            :advanced-ring="ringType === 2"
                                            @playVideo="playVideo">
                                        </pre-play-video>
                                        <div
                                            class="top-content"
                                            :class="{audio: ringType===2}">
                                            <div class="ring-title">
                                                {{ ring.ringName | ringName }}
                                            </div>
                                            <div class="ring-id">
                                                {{ ring.ringId }}
                                            </div>
                                            <div v-if="ringType===2">
                                                <div>
                                                    <span>上传时间</span>
                                                    {{ ring.createTime || '--' }}
                                                </div>
                                                <div>
                                                    <span>过期时间</span>
                                                    {{ ring.deadLine || '--' }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        v-if="ringType===1"
                                        class="ring-label">
                                        <div>
                                            <span>上传时间</span>
                                            {{ ring.createTime || '--' }}
                                        </div>
                                        <div>
                                            <span>过期时间</span>
                                            {{ ring.deadLine || '--' }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </van-list>
                    </van-pull-refresh>
                </div>
            </div>
        </div>
        <div
            v-if="ringList.filter(item => item.checked).length>0 && checkButtonAuthority('zq,qz,gg:AllRingList_ring:2')"
            v-show="!info.isMultiTime || (ringType!==1 && ringType!==2)"
            class="buttons">
            <van-button
                class="primary-public"
                size="large"
                type="info"
                :disabled="setBtnDisabled"
                @click="submitPreRing">
                设置
            </van-button>
        </div>
        <view-video-modal
            :value="showViewVideoModalVisible"
            :data="videoData"
            @close="closeVideo">
        </view-video-modal>
    </div>
</template>
<script>
import api from '@/utils/apiGe'
import apiRing from '@/utils/apiRing'
import { mapState, mapActions } from 'vuex'
import geMixins from '@/mixins/companyInfo'
import AuthMixins from '@/mixins/auth'
import func from '@/utils/func'
import PrePlayVideo from '@/components/common/PrePlayVideo'
import SelectDepartment from '@/components/department/SelectDepartment'
import VideoMixins from '@/mixins/video.js'

export default {
    name: 'AdvanceRingList',
    components: {
        SelectDepartment,
        PrePlayVideo
    },
    filters: {
        ringName: (val) => {
            if (val.length > 35) {
                return val.substring(0, 35) + '...'
            } else {
                return val
            }
        }
    },
    mixins: [geMixins, AuthMixins, VideoMixins],
    data () {
        return {
            ringList: [],
            departmentId: '',
            ringType: 1,
            showDepart: false,
            departmentList: [],
            info: {
                departmentName: '',
                departmentId: ''
            },
            ringLabel: '全部',
            refreshing: false,
            loading: false, // 触底加载动画
            finished: false, // 触底加载完成
            setAudio: '0', // 设置对应音频(音频铃音传0)：1是 0否
            pageInfo: {
                pageSize: 10,
                pageNum: 0
            },
            setBtnDisabled: false
        }
    },
    computed: {
        ...mapState({
            tabs: (state) => state.ge.dictionary.ringType,
            labelList: (state) => { // 铃音标签列表
                const list = state.ring.ringLabelList.slice(0, 20) // 展示标签前20个
                return list
            }
        }),
        ringInfo () {
            return func.ringInfo()
        }
    },
    watch: {
        info: {
            deep: true,
            handler (val) {
                val.isMultiTime && this.$dialog.alert({
                    title: '提示',
                    message: '当前部门已设置多分时，无法设置预制铃音如需取消或查看多分时设置，请进入企业视频彩铃PC端操作。'
                })
            }
        }
    },
    mounted () {
        this.queryRingLabelActionList()
    },
    methods: {
        ...mapActions(['queryRingLabelActionList']),
        // 对于标签数据
        changeLabel (item) {
            if (item === '全部') {
                this.ringLabel = item
            } else {
                this.ringLabel = item.id
            }
            this.pageInfo.pageNum = 1
            this.loading = true
            this.ringList = []
            this.getRingList()
        },
        getLabelList () {
            apiRing.queryRingLabelList().then((res) => {
                this.labelList = res.slice(0, 20) // 展示标签前20个
            })
        },
        // 提交预制铃音
        submitPreRing () {
            const ringIds = []
            this.ringList.forEach((item) => {
                if (item.checked) {
                    ringIds.push(item.ringId)
                }
            })
            this.setBtnDisabled = true
            this.setAudio = '0'
            this.$dialog.confirm({
                title: '同步设置',
                message: '是否同步设置视频提取的音频铃音？'
            })
                .then(() => {
                    this.setAudio = '1'
                    this.setDptAdvanceRing(ringIds)
                })
                .catch(() => {
                    this.setDptAdvanceRing(ringIds)
                })
        },
        // 提交铃音
        setDptAdvanceRing (ringIds) {
            if (ringIds.length > 0) {
                const params = {
                    departmentId: this.info.departmentId,
                    ringIds: ringIds,
                    ringType: this.ringType,
                    setAudio: this.setAudio
                }
                api.setDptAdvanceRing(params).then((res) => {
                    this.$notify({ type: 'success', message: '设置成功' })
                    const params = { departmentId: this.info.departmentId, departmentName: this.info.departmentName, index: this.info.index, ecId: this.ringInfo.ecId, ordId: this.ringInfo.ordId, volteType: this.ringType }
                    this.$router.push({ name: 'RingList', params: params })
                }).finally(() => {
                    this.setBtnDisabled = false
                })
            }
        },
        handleCheck (item) {
            if (this.info.isMultiTime && (this.ringType === 1 || this.ringType === 2)) {
                return
            }
            item.checked = !item.checked
        },
        // 切换volte标签
        changeTag (value) {
            this.pageInfo.pageNum = 1
            this.ringType = value + 1
            this.ringList = []
            this.loading = true
            this.finished = false // 设置为加载中
            this.getRingList()
        },
        // 开启部门弹窗
        openModal () {
            // 如果只有一个部门弹窗默认选中第一个,因为部门是必选
            if (this.departmentList.length === 1) this.departmentList[0].checked = true
            this.showDepart = !this.showDepart
        },
        // 关闭部门弹窗
        close (data) {
            this.showDepart = data
        },
        getData (data) {
            if (data.departmentId !== this.info.departmentId) { // 如果没点击取消,得到新值，就跳用方法
                this.info = data
                if (data.isMultiTime) {
                    this.ringList.map(item => {
                        item.checked = false
                        return item
                    })
                }
            }
        },
        // 触底加载
        onLoad () {
            this.pageInfo.pageNum++
            this.getRingList()
        },
        onRefresh () {
            this.pageInfo.pageNum = '1'
            this.getRingList()
        },
        // 获取所有企业铃音列表数据
        getRingList () {
            const params = {
                ecId: this.ringInfo.ecId,
                ordId: this.ringInfo.ordId,
                ringType: this.ringType,
                pageNum: this.pageInfo.pageNum,
                pageSize: this.pageInfo.pageSize
            }
            if (this.ringLabel !== '全部') {
                params.ringLabel = this.ringLabel
            }
            api.getAdvanceRingSetList(params).then((res) => {
                res.list.forEach((item) => {
                    item.checked = false
                })
                if (this.refreshing) {
                    this.refreshing = false
                    this.ringList = res.list
                }
                if (this.loading) {
                    // 加载状态结束
                    this.loading = false
                    // 数据全部加载完成
                    if (res.list.length < 10) {
                        this.finished = true
                    }
                    this.ringList = this.ringList.concat(res.list)
                }
            })
        }
    }
}
</script>
<style lang='less' scoped>
    .title {
        font-size: 0.35rem;
    }

    .content {
        .info-item {
            color: #333;
            margin-top: 0.1rem;
            display: inline-block;
            width: 50%;

            span {
                display: inline-block;
                font-size: 0.1rem;
                margin-right: 0.1rem;
            }
        }
    }

    .cover-label {
        margin-right: 0.35rem;
    }

    .labels {
        display: flex;
        margin-top: 0.2rem;
        overflow-x: auto;
        overflow-y: hidden;
        box-sizing: border-box;
        padding: 0 0.1rem;
        margin-left: 0.1rem;

        span {
            display: inline-block;
            background: #fcfdff;
            border: 1px solid #d2dbff;
            border-top-right-radius: 0.2rem;
            border-bottom-right-radius: 0.2rem;
            padding: 0 0.15rem;
            margin: 0.15rem;
            color: #716f81;
            font-size: 14px;
            flex: 1 0 auto;
            height: 0.6rem;
            line-height: 0.6rem;
        }

        .active {
            background: #ffead4;
            border: 1px solid #ffcd97;
            color: #ff8500;
        }
    }

    .dept {
        margin-top: 0.2rem;
    }

    .tab {
        margin-top: -0.1rem;
        margin-right: 0.3rem;
    }

    .van-tabs__nav {
        background-color: red;
    }

    .ring-list {
        .top-item {
            margin: 0 0.1rem;
        }
        .ring-info.checkbox-middle .top-checkbox .van-checkbox{
            margin-top: .7rem;
        }
        .ring-info.checkbox-middle .pre-img {
            margin: 0 0.3rem 0 0.15rem;
        }

        .info-item {
            margin: 0.2rem 0;

            span {
                float: right;
            }
        }

        .ring-top {
            display: flex;
            background: white;

            .top-checkbox {
                margin-left: 0.12rem;
            }

            .cover-img {
                margin: 0 0.3rem 0 0.15rem;
            }

            .ring-audio {
                text-align: center;

                .audio-img {
                    width: 2rem;
                    height: 2rem;
                    margin-right: 0.2rem;
                }

                span {
                    display: inline-block;
                    color: #675dff;
                    font-size: 14px;
                    border: 1px solid #8ea0fd;
                    border-radius: 0.4rem;
                    width: 1rem;
                    height: 0.5rem;
                    line-height: 0.5rem;
                }
            }

            .top-content {
                .ring-title {
                    margin-top: 0.1rem;
                    color: #12102d;
                    font-size: 16px;
                    line-height: 0.4rem;
                    font-weight: 600;
                    height: 0.7rem;
                    word-break: break-all;
                }

                .ring-id {
                    margin-top: 0.4rem;
                    font-size: 13px;
                    color: #8a88a6;
                }
            }

            .audio {
                color: #8a88a6;
                line-height: 0.6rem;

                .ring-id {
                    margin-top: 0.3rem;
                }
            }

            .van-checkbox {
                margin-top: 1.3rem;
            }
        }

        .ring-card {
            padding: 0.2rem 0 0.1rem;
            margin-top: 0;
            box-sizing: border-box;

            .set-ring {
                display: flex;
                font-size: 0.25rem;
                padding-top: 0.3rem;
                padding-left: 0.18rem;

                div {
                    margin-right: 0.2rem;
                }

                span {
                    color: #675dff;
                    font-weight: 600;
                    font-size: 0.32rem;
                    display: inline-block;
                    margin-left: 0.25rem;
                }
            }

            .list {
                padding: 0.1rem 0;
                padding-top: 0.2rem;
                margin-top: 0.2rem;
                padding-right: 0.12rem;
                border-bottom: 1px solid #f5f6fa;
                border: 1px solid transparent;
                box-sizing: border-box;

                &:first-child {
                    margin-top: 0;
                }
            }

            .active {
                border: 1px solid #c2bdff;
                border-radius: 0.2rem;
            }

            .ring-label {
                padding: 0 0.3rem 0 0.3rem;
                margin: 0.2rem 0.4rem 0;

                div {
                    margin: 0.1rem 0;
                }
            }
        }
    }

    .department {
        padding: 0.2rem 0.3rem;
        margin: 0.2rem;
        border-radius: 8px;
        box-shadow: 0 5px 10px 0 rgba(185, 190, 199, 0.2);

        div {
            display: flex;
            justify-content: space-between;
            height: 0.7rem;
            line-height: 0.7rem;

            span {
                font-size: 0.3rem;
                color: #5c5c5c;
            }

            i {
                color: #a1a1a1;
            }
        }
    }

    .buttons {
        position: fixed;
        width: 100%;
        bottom: 0;
        background: #f6f8fc;
    }
</style>
