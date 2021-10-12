/*
 * @Author: cuishuxia
 * @Date: 2020-11-05 09:43:05
 * @Last Modified by: liqiao
 * @Last Modified time: 2021-07-06 16:27:43
 * @Desc 视频播放弹窗
 */

<template>
    <van-overlay
        id="videoDialog"
        ref="receivable"
        :show="isShown"
        class="video-dialog"
        @click="doClose">
        <div
            v-if="isShown"
            class="wrapper"
            @click="doClose">
            <div
                class="custom-video">
                <span class="head">
                    {{ data.ringName }}
                </span>
                <video-player
                    ref="videoPlayer"
                    :options="playerOptions"
                    :events="moreEvents"
                    @fullscreenchange="onPlayerFullscreenChange($event)"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    @ended="onPlayerEnded($event)"
                    @waiting="onPlayerWaiting($event)"
                    @playing="onPlayerPlaying($event)"
                    @loadeddata="onPlayerLoadeddata($event)"
                    @timeupdate="onPlayerTimeupdate($event)"
                    @canplay="onPlayerCanplay($event)"
                    @canplaythrough="onPlayerCanplaythrough($event)"
                    @statechanged="playerStateChanged($event)"
                    @ready="playerReadied">
                </video-player>
            </div>
        </div>
    </van-overlay>
</template>
<script>
import Vue from 'vue'
import api from '@/utils/apiRing'
import func from '@/utils/func'
import { mapState, mapActions } from 'vuex'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import * as videojs from 'video.js'
window.videojs = VueVideoPlayer.videojs
require('video.js/dist/lang/zh-CN.js')
require('vue-video-player/src/custom-theme.css')
Vue.use(VueVideoPlayer, {
    events: ['fullscreenchange']
})

export default {
    name: 'ViewVideoModal',
    components: {
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: () => {}
        },
        modal: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            moreEvents: ['fullscreenchange'],
            playerOptions: {
                muted: false, // true 禁音， false 播放声音
                language: 'zh-CN',
                autoplay: true,
                playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放频率
                poster: '',
                controlBar: {
                    volumePanel: {
                        inline: false
                    },
                    timeDivider: true, // 当前时间和持续时间的分隔符
                    durationDisplay: true, // 显示持续时间
                    fullscreenToggle: true, // 是否全屏
                    remainingTimeDisplay: false // 是否显示剩余时间
                },
                sources: [
                    {
                        type: 'video/mp4',
                        src: ''
                    }
                ]
            },
            allowDownload: true, // 是否允许下载
            downloadUrl: api.downloadRing // 下载的方法
        }
    },
    computed: {
        ...mapState({
            displayDownloadTip: (state) => state.common.displayDownloadTip // 下载提示永久不显示参数
        }),
        player () {
            return this.$refs.videoPlayer.player
        },
        isShown () {
            return this.value
        }
    },
    watch: {
        data: {
            handler (val, oldval) {
                this.initUrl(val)
            },
            deep: true
        },
        isShown (val) {
            if (val) {
                this.$refs.receivable.style['-webkit-overflow-scrolling'] = 'auto !important'
                setTimeout(() => {
                    this.createMyButton()
                }, 500)
            }
        }
    },
    mounted () {
        this.initUrl(this.data)
    },
    methods: {
        ...mapActions(['showDownloadTip', 'setDownloadTipObj']),
        // 插入下载节点
        createMyButton () {
            const Button = videojs.getComponent('Button')
            const MyButton = videojs.extend(Button, {
                constructor: function (player, options) {
                    Button.apply(this, arguments)
                    this.addClass('fullscreen-enter')
                },
                handleClick: () => {
                    // 绑定点击事件
                    if (!this.allowDownload) return false // 不允许下载
                    const params = { ringInfoId: this.data.ringInfoId, ringProdUrl: this.data.ringProdUrl }
                    this.setDownloadTipObj(() => {
                        func.downloadFile(params, this.downloadUrl)
                    })
                    if (!this.displayDownloadTip) func.downloadFile(params, this.downloadUrl)
                    else {
                        this.$emit('close', false)
                        this.showDownloadTip()
                    }
                    // func.downloadFile(params, this.downloadUrl)
                    this.allowDownload = false
                    setTimeout(() => {
                        this.allowDownload = true
                    }, 3000)
                },
                buildCSSClass: function () {
                    return 'vjs-icon-custombutton vjs-control vjs-button iconfont icon-download'
                }
            })
            // 注册
            const instanceButton = new MyButton()
            this.$nextTick(() => {
                // 添加到controlBar中
                const control = this.$refs.videoPlayer.player.getChild('controlBar').el_ // 父节点
                const fullscreen = control.querySelector('.vjs-fullscreen-control') // 全屏的dom节点
                control.insertBefore(instanceButton.el_, fullscreen) // 在全屏节点前插入下载节点
            })
        },
        doClose () {
            // 弹窗关闭前停止播放视频
            this.$emit('close', false)
            // this.player && this.player.pause()
        },
        initUrl (data) {
            if (!data) return
            const url = data.ringProdUrl
            // this.playerOptions.sources[0].src = require('../../assets/bb95ec9b2c22f6bfd898bfdaf2cd3316.mp4') || url
            this.playerOptions.sources[0].src = url || require('../../assets/bb95ec9b2c22f6bfd898bfdaf2cd3316.mp4')
        },
        onPlayerFullscreenChange (play) {
        },
        onPlayerPlay (player) {
        },
        onPlayerPause (player) {
        },
        onPlayerEnded (player) {
        },
        onPlayerWaiting (player) {
        },
        onPlayerPlaying (player) {
        },
        onPlayerLoadeddata (player) {
        },
        onPlayerTimeupdate (player) {
        },
        onPlayerCanplay (player) {
        },
        onPlayerCanplaythrough (player) {
        },
        playerStateChanged (playerCurrentState) {
        },
        playerReadied (player) {
        }
    }
}
</script>

<style lang='less'>
.video-dialog {
    z-index: 9999 !important;

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .el-dialog {
        overflow: hidden;

        .el-dialog__header {
            z-index: 1000;
            height: 50px;
            line-height: 50px;
            padding: 0 20px;
            background: #2a2a2c;
            color: #e5e5e5;
            font-size: 12px;
            font-weight: normal;

            &::after {
                height: 0;
            }

            .el-dialog__headerbtn {
                margin-right: 20px;
                line-height: 50px;
                font-weight: normal;
                right: 0;
                top: 0;

                i {
                    color: #e5e5e5;
                    font-size: 14px;
                    font-weight: normal;
                }
            }
        }

        .el-dialog__body {
            padding: 0;
            background: #1e1e1e;
        }

        .el-dialog__footer {
            padding: 0;
            background: #000;
        }
    }
}

.custom-video {
    width: 7.5rem;
    height: 300px;
    background: #000;
    color: #fff;
    .head {
        display: block;
        height: 36px;
        line-height: 36px;
        width: 100vw;
        position: absolute;
        top: 148px;
        z-index: 9;
        background-color: rgba(43, 51, 63, 0.7);
        color: #e5e5e5;
        transition: visibility 0.1s, opacity 0.1s;
    }
    .tool-tip {
        padding: 2px 4px;
    }

    .vjs_video_3-dimensions {
        width: 100%;
        height: 100%;
    }

    .video-player {
        width: 100%;
        height: 100%;

        .video-js {
            width: 7.5rem;
            height: 300px;
        }

        .vjs-big-play-button {
            left: 50%;
            top: 50%;
            margin-left: -1.25em;
            margin-top: -1.25em;
            height: 2.5em;
            width: 2.5em;
            font-size: 3em;
            line-height: 2.5em;
            border-radius: 50%;
        }

        .vjs-big-play-button .vjs-icon-placeholder::before {
            font-size: 1.65em;
        }
    }

    .video-js:hover .vjs-big-play-button,
    .vjs-custom-skin > .video-js .vjs-big-play-button:focus,
    .vjs-custom-skin > .video-js .vjs-big-play-button:active {
        background: none;
    }

    .vjs-control-bar {
        height: 36px;
    }

    .vjs-control-bar {
        .vjs-icon-custombutton {
            font-family: VideoJS;
            font-weight: normal;
            font-style: normal;

            .vjs-icon-custombutton::before {
                content: "\f108";
                font-size: 1.8em;
                line-height: 1.67;
            }
        }

        .icon-download {
            cursor: pointer;
        }
    }

    .video-js .vjs-current-time,
    .vjs-no-flex .vjs-current-time,
    .vjs-time-divider,
    .video-js .vjs-duration,
    .vjs-no-flex .vjs-duration {
        display: block;
        padding: 0 8px;
        line-height: 36px;
    }

    .vjs-time-divider {
        min-width: auto;
        padding: 0;
    }

    .vjs-button > .vjs-icon-placeholder::before,
    .vjs-fullscreen-control,
    .vjs-playback-rate .vjs-playback-rate-value {
        line-height: 36px;
    }

    .vjs-time-tooltip {
        min-width: 50px;
    }
}
</style>
