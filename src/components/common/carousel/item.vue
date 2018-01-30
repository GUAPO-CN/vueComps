<template>
  <div
    v-show="ready"
    class="el-carousel__item"
    :class="{
      'is-active': active,
      'el-carousel__item--card': $parent.type === 'card',
      'is-in-stage': inStage,
      'is-hover': hover,
      'is-animating': animating
    }"
    @click="handleItemClick"
    :style="{
      msTransform: `translateX(${ translate }px) scale(${ scale })`,
      webkitTransform: `translateX(${ translate }px) scale(${ scale })`,
      transform: `translateX(${ translate }px) scale(${ scale })`
    }">
    <div
      v-if="$parent.type === 'card'"
      v-show="!active"
      class="el-carousel__mask">
    </div>
    <slot></slot>
  </div>
</template>

<script>
  const CARD_SCALE = 0.83;
  export default {
    name: 'LxmCarouselItem',

    props: {
      name: String,
      label: {
        type: [String, Number],
        default: ''
      }
    },

    data() {
      return {
        hover: false,
        translate: 0,
        scale: 1,
        active: false,
        ready: false,
        inStage: false,
        animating: false
      };
    },

    methods: {
      processIndex(index, activeIndex, length) { 
//    	console.log('index',index,',activeIndex',activeIndex,',length',length, '---->item.vue processIndex()')
        if (activeIndex === 0 && index === length - 1) { //点击的是第一个  处理最后一个  -----》 放前一个
          return -1;
        } else if (activeIndex === length - 1 && index === 0) { //点击的是 最后一个  处理第一个 -----》 放在后一个
          return length;
        } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {//相隔一个以上 的，index 小于activeindex 的   丢  右	边去
          return length + 1;
        } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {//相隔一个以上的，index 大于 activeindex 的   丢  左边去
          return -2;
        }
        console.log('index',index)
        return index;
      },
      
      calculateTranslate(index, activeIndex, parentWidth) {
        if (this.inStage) {
          return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4;
        } else if (index < activeIndex) {
          return -(1 + CARD_SCALE) * parentWidth / 4;
        } else {
          return (3 + CARD_SCALE) * parentWidth / 4;
        }
      },
      
      translateItem(index, activeIndex, oldIndex) { //移动  item们
        const parentWidth = this.$parent.$el.offsetWidth;
        console.log('index',index,',activeIndex',activeIndex,',oldIndex',oldIndex, '---->item.vue translateItem()')
        const length = this.$parent.items.length;
        if (this.$parent.type !== 'card' && oldIndex !== undefined) {
          this.animating = index === activeIndex || index === oldIndex;
        }
        if (index !== activeIndex && length > 2) {//非 当前 activeindex
          index = this.processIndex(index, activeIndex, length);
        }
        if (this.$parent.type === 'card') {
          this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
          this.active = index === activeIndex;
          this.translate = this.calculateTranslate(index, activeIndex, parentWidth);
          this.scale = this.active ? 1 : CARD_SCALE;
        } else {
          this.active = index === activeIndex;
          this.translate = parentWidth * (index - activeIndex);
        }
        this.ready = true;
      },



      handleItemClick() { //卡片化 模式 下 点击卡片------》
        const parent = this.$parent;
        if (parent && parent.type === 'card') {
          const index = parent.items.indexOf(this);//从 父组件 中找到 this 的位置
          parent.setActiveItem(index);
        }
      }
    },

    created() {
    	console.log('created')
      this.$parent && this.$parent.updateItems();
    },

    destroyed() {
    	console.log('destroyed')
      this.$parent && this.$parent.updateItems();
    }
  };
</script>
