<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="cart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="changeChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <!-- 操作数量区域 -->
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>

          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCart(cart.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck && cartInfoList.length > 0"
          @change="changeAll"
        />
        <span>全选</span>
      </div>
      <!-- 选择操作 -->
      <div class="option">
        <a @click="deleteChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  methods: {
    // 获取数据
    getData() {
      // 发送请求
      this.$store.dispatch("reqCartList"); //由于这里的数据可能需要请求多次，所以不能只在挂载的时候发送请求
    },
    // 修改数量，发送请求
    handler: throttle(async function (type, disNum, cart) {
      // 节流防止用户狂点，浏览器反应不过来
      /* 
        参数说明
          type:操作数量的类型
          disNum:需要操作的数量
          cart:当前的商品
      */
      switch (type) {
        // 通过switch来判断不同情况下应执行的代码
        case "minus":
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "add":
          disNum = 1;
          break;
        case "change":
          if (isNaN(disNum) || disNum < 0) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - cart.skuNum;
          }
      }
      // 将修改后的数据发送到服务端，由于发送之后需要重新获取数据，所以用try catch来发送请求
      try {
        // 发送请求，存储新的数据
        await this.$store.dispatch("addOrUpdataCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        // 如果发送成功就执行获取新的数据
        this.getData();
      } catch (error) {
        // 如果发送失败就输出错误信息
        console.log(error.message);
      }
    }, 1000),
    // 删除选中的商品
    async deleteCart(skuId) {
      try {
        await this.$store.dispatch("deleteCart", skuId);
        // 如果发送请求成功，就执行下一步,获取新数据
        this.getData();
      } catch (error) {
        // 如果发送请求失败，就打印错误信息
        console.log(error.message);
      }
    },
    //修改选中商品的状态
    async changeChecked(cart, event) {
      // isChecked数据只能为0或1，所以需要转换一下
      let isChecked = event.target.checked ? 1 : 0;
      try {
        await this.$store.dispatch("changeIsChecked", {
          skuId: cart.skuId,
          isChecked,
        });
        // 发送请求修改成功，获取新的数据
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    },
    //全选框
    async changeAll(event) {
      // 判断这次更改是否成功
      try {
        await this.$store.dispatch(
          "updateAllCart",
          event.target.checked ? "1" : "0"
        );
        // 如果更改成功 重新获取数据
        this.getData();
      } catch (error) {
        // 提示错误
        alert(error.message);
      }
    },
    // 删除选中的商品
    async deleteChecked() {
      // 判断是否删除成功
      try {
        await this.$store.dispatch("deleteCartChecked");
        // 如果删除成功,重新获取数据
        this.getData();
      } catch (error) {
        // 报告错误信息
        alert(error.message);
      }
    },
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["cartInfo"]),
    // 再次简化一下
    cartInfoList() {
      return this.cartInfo.cartInfoList || [];
    },
    // 总计价钱
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    // 是否全选
    isAllCheck() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>