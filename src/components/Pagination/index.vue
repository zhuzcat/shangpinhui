<template>
  <div class="pagination">
    <!-- 上部 -->
    <button :disabled="pageNo == 1" @click="$emit('pageChange', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="StartPageAndEndPage.start > 1"
      @click="$emit('pageChange', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="StartPageAndEndPage.start > 2">···</button>

    <!-- 中部 -->
    <button
      v-for="(page, index) in StartPageAndEndPage.end"
      :key="index"
      v-show="isShow(page)"
      @click="$emit('pageChange', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <!-- 下部 -->
    <button v-if="StartPageAndEndPage.end < totalPage - 1">···</button>
    <button
      v-if="StartPageAndEndPage.end < totalPage"
      @click="$emit('pageChange', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('pageChange', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 获取开始和结束的连续页码数
    StartPageAndEndPage() {
      // 获取数据
      const { continues, pageNo, totalPage } = this;
      // 初始化数据
      let start = 0,
        end = 0;
      if (totalPage < continues) {
        start = 1;
        end = totalPage;
      } else {
        // 为start与end赋值
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        // 第一种特殊情况，start越界
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 第二种特殊情况，end越界
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
  methods: {
    // 判断中间的分页按钮是否显示
    isShow(page) {
      return this.StartPageAndEndPage.start <= page;
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
/* .active {
  background: skyblue;
} */
</style>