<template>
    <div
        ref="prering"
        @click="openVideo">
        <div
            v-if="(data.ringProdUrl || data.ringUrl) && canPlay"
            class="pre-ring"
            :class="{'ring-audio': advancedRing}">
            <img
                class="cursor"
                :src="imgUrl">
            <!-- <div class="cover"></div> -->
            <img
                class="icon-play"
                src="@/assets/icon_play.png">
            <!-- <i
                v-if="!advancedRing"
                class="iconfont icon-play"></i> -->
            <span v-if="advancedRing">试听</span>
        </div>
        <div
            v-else
            :title="'当前铃音不支持预览'"
            class="pre-ring is-disabled">
            <img :src="imgUrl">
        </div>

        <!-- <view-video-modal
            :value="showViewVideoModalVisible"
            :data="videoData"
            @close="closeVideo">
        </view-video-modal> -->
    </div>
</template>

<script>
import func from '@/utils/func'
import { LOCATION_QR_ORIGIN } from '@/constants/const'
import { mapActions, mapState } from 'vuex'
// import VideoMixins from '@/mixins/video.js'
let defaultImg = require('@/assets/ring-play.png')

export default {
    // mixins: [VideoMixins],
    props: {
        data: { // 铃音播放数据
            type: Object,
            default: () => {}
        },
        limitPlay: { // 是否限制播放
            type: Boolean,
            default: false
        },
        ringType: { // 铃音类型
            type: Number,
            default: 1
        },
        advancedRing: { // 是否有封面？？？
            type: Boolean,
            default: false
        }
    },
    data () {
        const isIE = func.isIE()
        return {
            apiUrl: LOCATION_QR_ORIGIN,
            isIE,
            videoType: ['3gp', 'vob', 'avi', 'mpg', 'wmv', 'wma'],
            imgTypeList: ['webp'] // ie不支持的图片格式
        }
    },
    computed: {
        ...mapState({
            displayDownloadTip: (state) => state.common.displayDownloadTip,
            downloadDialogVisable: (state) => state.common.downloadDialogVisable
        }),
        coverUrl () {
            return this.data.ringCoverUrl || this.data.coverUrl
        },
        imgUrl () {
            const url = this.coverUrl
            if (this.advancedRing) {
                defaultImg = require('@/assets/ring_audio.png')
            } else {
                defaultImg = require('@/assets/ring-play.png')
            }
            let preUrl = url ? (url.slice(0, 1) === '/' ? `${this.apiUrl}/evrms/media${url}` : `${this.apiUrl}/evrms/media/${url}`) : defaultImg
            if (this.isIE) {
                const fileType = preUrl.substring(preUrl.lastIndexOf('.') + 1).toLowerCase()
                preUrl = this.imgTypeList.includes(fileType) ? defaultImg : preUrl
            }
            return preUrl
        },
        canPlay () {
            const isTel = [3, 4].includes(this.ringType) || [3, 4].includes(Number(this.data.ringType))
            const playUrl = isTel ? this.data.ringUrl || this.data.ringProdUrl : this.data.ringProdUrl || this.data.ringUrl
            let fileType = playUrl.substring(playUrl.lastIndexOf('.') + 1).toLowerCase()
            if (this.advancedRing) {
                fileType = false
            }
            return !this.videoType.includes(fileType)
        }
    },
    methods: {
        ...mapActions(['showDownloadTip', 'hideDownloadTip', 'setDownloadTipObj']),
        // 保留弹窗在打开video预览之前提示的逻辑，万一需要有修改
        // openDownloadTip () {
        //     this.setDownloadTipObj(this.$refs.prering)
        //     if (!this.displayDownloadTip) this.$refs.prering.click()
        //     else this.showDownloadTip()
        // },
        openVideo () {
            if (!((this.data.ringProdUrl || this.data.ringUrl) && this.canPlay)) return
            if (this.limitPlay && (!this.data.status === '5')) {
                // 需提示资源也删除
                return
            }
            if ([3, 4].includes(this.ringType) || [3, 4].includes(Number(this.data.ringType))) {
                // this.playVideo(this.data.ringName, this.data.ringUrl || this.data.ringProdUrl, this.data.ringInfoId)
                this.$emit('playVideo', this.data.ringName, this.data.ringUrl || this.data.ringProdUrl, this.data.ringInfoId)
            } else {
                // this.playVideo(this.data.ringName, this.data.ringProdUrl || this.data.ringUrl, this.data.ringInfoId)
                this.$emit('playVideo', this.data.ringName, this.data.ringProdUrl || this.data.ringUrl, this.data.ringInfoId)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.pre-ring,
.is-disabled {
    position: relative;

    img {
        width: 2.44rem;
        height: 1.54rem;
        border-radius: 0.2rem;
    }
    // .cover {
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     width:100%;
    //     height:100%;
    //     background:#000;
    //     border-radius: 0.2rem;
    //     -moz-opacity:0.4;
    //     opacity:0.4;
    // }
    .icon-play {
        width: 0.48rem;
        height: 0.48rem;
        position: absolute;
        text-align: center;
        top: 50%;
        left: 50%;
        color: #6980fc;
        transform: translateY(-50%) translateX(-50%);
    }

    i {
        position: absolute;
        text-align: center;
        font-size: 24px;
        left: 0;
        right: 0;
        top: 0;
        line-height: 1.6rem;
        color: #fff;
    }
}

.van-overlay {
    z-index: 200;
}

.ring-audio {
    text-align: center;

    img {
        width: 2rem;
        height: 2rem;
        margin-right: 0.05rem;
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
</style>
