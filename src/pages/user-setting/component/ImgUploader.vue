<template>
  <Uploader
    :multiple="getMultiple"
    :after-read="onRead"
    :max-size="maxSize"
    @oversize="overSizeImg"
  >
    <slot name="trigger-upload"></slot>
  </Uploader>
</template>

<script>
  import { Uploader, Toast } from 'vant';
  import uploadLocalImage from './UploadLocal';

  const arraySlice = Array.prototype.slice;

  export default {
    name: 'ImgUploader',

    components: {
      Uploader
    },

    props: {
      tokenUrl: {
        type: String,
        default: '//huiyi.youzan.com/h5/material/token'
      },
      uploadUrl: {
        type: String,
        default: '//up.qbox.me'
      },
      maxSize: {
        type: Number,
        default: 5 * 1024 * 1024
      },
      maxAmount: {
        type: Number,
        default: 0
      },
      accept: {
        type: String,
        default: 'image/gif, image/jpeg, image/png'
      }
    },

    computed: {
      getMultiple() {
        return this.maxAmount !== 1
      }
    },

    methods: {
      onRead(file) {
        console.log('上传文件', file)
        let files = [];
        if (Array.isArray(file)) { files = files.concat(file) } else { files.push(file);}
        uploadLocalImage({
          target: files,
          tokenUrl: this.tokenUrl,
          uploadUrl: this.uploadUrl
        }).then(files => {
          this.$emit('upload', files)
        })
      },

      overSizeImg() {
        Toast('图片太大，请传小于5M的图片');
      }
    }

  }
</script>
