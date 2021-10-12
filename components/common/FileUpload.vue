/*
 * @Author: liangxunpei
 * @Date: 2021-04-09 15:31:36
 * @Desc: 铃音(视频,音频,版权证明)上传
 */
<template>
    <div class="ring-upload-main">
        <van-uploader
            v-model="fileList"
            class="ring-upload-file"
            :max-size="maxSize"
            :accept="fileAccpet"
            :max-count="1"
            :after-read="afterRead"
            :before-read="beforeRead"
            :upload-icon="defaultIcon"
            @oversize="onOversize"
            @delete="deleteFile">
            <template
                v-if="fileType !== 1"
                #preview-cover>
                <div
                    class="preview-cover van-ellipsis">
                    <img
                        :src="defaultImg"
                        alt="">
                    <img
                        class="play-icon"
                        :src="playIcon"
                        alt="">
                </div>
            </template>
        </van-uploader>
        <span
            v-if="fileName"
            class="file-name">
            {{ fileName }}
        </span>
    </div>
</template>

<script>
import api from '@/utils/apiRing'
import func from '@/utils/func'
import { RING_UPLOAD_TYPE, RING_UPLOAD_WARN } from '@/constants/const'
export default {
    name: 'FileUpload',
    props: {
        maxSize: { // 文件上传最大值
            type: Number,
            default: 80 * 1024 * 1024
        },
        maxCount: { // 限制文件上传的个数
            type: Number,
            default: 1
        },
        fileType: { // 文件上传类型
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            fileList: [],
            ringUploadType: RING_UPLOAD_TYPE,
            ringUploadWran: RING_UPLOAD_WARN,
            defaultImg: require('@/assets/Video-default.png'),
            playIcon: require('@/assets/play_img.png'),
            defaultIcon: require('@/assets/ring_icon_upload_img.png'),
            fileName: ''
            // fileAccpet: '' // 文件筛选
        }
    },
    computed: {
        fileAccpet () {
            // 获取文件类型，并对文件类型的类别进行处理再筛选
            const ringUploadList = JSON.parse(JSON.stringify(this.ringUploadWran))
            // 0 为视频 1 为图片 2 为音频
            const wildcard = this.fileType === 0 ? 'video/*' : this.fileType === 1 ? 'image/*' : 'audio/*' // 通配符添加
            // 安卓不能给具体通配符，会处理失败然后提示没有可执行的应用
            if (!func.isAndroid()) {
                return wildcard + ',' + ringUploadList[this.fileType].map(i => {
                    i = '.' + i
                    return i
                }).join(',')
            } else {
                return wildcard
            }
        }
    },
    methods: {
        // 上传前文件校验
        beforeRead (file) {
            // 获取文件后缀
            const type = ('/' + file.name.substring(file.name.lastIndexOf('.') + 1)).toLowerCase()
            const indexVal = this.ringUploadType[this.fileType].indexOf(type)
            const warnTitle = this.ringUploadWran[this.fileType].join(',')
            if (indexVal === -1) {
                this.$notify(`文件类型只能是:\n"${warnTitle}"，请重新选择`)
                return false
            }
            return true
        },
        // 文件上传完毕后会触发回调函数，获取到对应的 file 对象
        afterRead (file) {
            const formParams = new FormData()
            formParams.append('file', file.file)
            formParams.append('fileType', this.fileType)
            file.status = 'uploading'
            file.message = '上传中...'
            api.uploadFileRing(formParams).then((res) => {
                const fileObj = res
                file.status = 'done'
                this.fileName = this.fileList[0].file.name
                fileObj.name = this.fileName
                this.$emit('changeUpload', fileObj)
            }).catch((err) => {
                this.$emit('changeUpload', '')
                file.status = 'failed'
                file.message = '上传失败'
                this.$notify(err)
            })
        },
        // 限制上传回调
        onOversize (file) {
            this.$notify(`文件大小不能超过${this.maxSize / 1024 / 1024}M`)
        },
        // 删除文件
        deleteFile () {
            this.fileName = ''
            this.fileList = []
            this.$emit('changeUpload', '')
        }
    }
}
</script>

<style lang="less" scoped>
.ring-upload-main {
    width: 100%;

    .file-name {
        display: inline-block;
        vertical-align: top;
        width: 60%;
    }
}
</style>
