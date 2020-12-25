<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{open: open}" @click="open = !open">{{ selected }}<img :src="require(`@/assets/images/arrow_black.svg`)" alt="arrow"></div>
    <div class="items" :class="{selectHide: !open}">
      <div
        class="item"
        v-for="(option, index) of data"
        :key="index"
        @click="selected=option.name; open=false; $emit('input', option.key)"
      >{{ option.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0
    },
    last: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selected: this.data.length > 0 ? this.data[0].name : null,
      open: false
    };
  },
  mounted() {
    // this.$emit("input", this.selected);
    if(this.last) {
      this.selected = this.data[this.data.length-1].name
    }
  }
};
</script>