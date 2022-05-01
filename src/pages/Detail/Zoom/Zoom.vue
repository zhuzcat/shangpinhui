<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["imageList"],
  data() {
    return {
      // 定义一个响应式数据存取当前显示的图片索引
      currentIndex: 0,
    };
  },
  computed: {
    // 数组有可能会返回undefined所以在这里进行兜底操作，以防报红
    imgObj() {
      return this.imageList[this.currentIndex] || {};
    },
  },
  mounted() {
    // 通过事件总线获取图片索引
    this.$bus.$on("changeImg", (index) => {
      // 修改当前的索引
      this.currentIndex = index;
    });
  },
  methods: {
    handler(event) {
      // 获取需要修改的元素
      const mask = this.$refs.mask;
      const big = this.$refs.big;
      // 计算出新的坐标
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;
      // 限制边界
      if (left < 0) left = 0;
      if (left > mask.offsetWidth) left = mask.offsetWidth;

      if (top < 0) top = 0;
      if (top > mask.offsetHeight) top = mask.offsetHeight;
      // 为元素赋新的坐标值
      mask.style.left = left + "px";
      mask.style.top = top + "px";

      big.style.left = left * -2 + "px";
      big.style.top = top * -2 + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>