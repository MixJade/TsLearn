<template>
  <div class="d-flex">
    <!-- 卡片区域一-->
    <div v-for="myCard in myCardDemo" :key="myCard.cardId" class="mp-3">
      <div class="strata-card">
        <div class="card-tit">
          <strong>{{ myCard.cardId }}</strong>
          <strong>{{ myCard.cardNm }}</strong>
        </div>
        <div class="card-info">{{ myCard.cardInfo }}</div>
        <hr/>
        <div class="card-content">
          <div class="card-describe">
            <span class="label">描述之一：</span>
            <span class="text text-success">{{ myCard.cardTag }}</span>
          </div>
          <div class="card-describe">
            <span class="label">描述之二：</span>
            <span class="text">{{ myCard.tagInfo }}</span>
          </div>
          <p class="card-foot">{{ myCard.cardFoot }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface CardInfo {
  // 编号
  cardId: number;
  // 名称
  cardNm: string;
  // 描述
  cardInfo: string;
  // 标签分类
  cardTag: string;
  // 标签介绍
  tagInfo: string;
  // 最终介绍
  cardFoot: string;
}

const myCardDemo: CardInfo[] = [
  {
    cardId: 1,
    cardNm: "卡片标题",
    cardInfo: "只是一个卡片DEMO",
    cardTag: "标签一、标签二、标签三",
    tagInfo: "应该是一个不错的卡片布局",
    cardFoot: "最后的结局"
  }, {
    cardId: 2,
    cardNm: "卡片标题",
    cardInfo: "只是一个卡片DEMO，但是这个的字特别的多，多到现在这种程度",
    cardTag: "标签一、标签二、标签三、，但是这个的字特别的多，多到现在这种程度",
    tagInfo: "应该是一个不错的卡片布局，但是这个的字特别的多，多到现在这种程度",
    cardFoot: "最后的结局阿巴阿巴阿巴"
  }, {
    cardId: 3,
    cardNm: "卡片标题",
    cardInfo: "只是一个卡片DEMO",
    cardTag: "标签一、标签二、标签三",
    tagInfo: "应该是一个不错的卡片布局",
    cardFoot: "最后的结局"
  },
]
</script>

<style lang="scss" scoped>
/*常见的布局*/
.d-flex {
  display: flex;
  text-align: center;
  /*外部空隙与内部空隙*/
  .mp-3 {
    margin: 1rem;
    padding: 1rem;
  }
}

/*卡片主体*/
.strata-card {
  width: 340px;
  min-height: 180px;
  border: 2px solid #17a2b8;
  border-radius: 10px;
  padding-left: 5%;
  padding-right: 5%;
  cursor: default;
  /*悬浮加阴影，但好像不太需要*/
  &:hover {
    box-shadow: 5px 5px 15px lightskyblue;
  }

  /*卡片标题*/
  .card-tit {
    height: 20%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /*卡片描述*/
  .card-info {
    text-align: left;
    color: #ffc107;
    font-size: smaller;
    /*悬浮变色*/
    &:hover {
      color: #ba8b00;
    }
  }

  /*卡片下半部分*/
  .card-content {
    color: #6c757d;
    font-size: smaller;
    /*卡片描述：即左边标签右边说明*/
    .card-describe {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      /*标签，靠近冒号*/
      .label {
        text-align: right;
      }

      /*说明，换行也是从标签右边开始*/
      .text {
        text-align: left;
        flex: 1;
      }

      /*有一些描述应该是绿色*/
      .text-success {
        color: #28a745;
      }
    }

    /*卡片末尾*/
    .card-foot {
      margin-top: 5px;
    }
  }
}
</style>
