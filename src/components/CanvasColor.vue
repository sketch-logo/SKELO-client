<template>
  <div class="cvs_colors">
    <div class="color_btn" style="background-color: #2c2c2c;" @click="onClickColorBtn"></div>
    <div class="color_btn" style="background-color: #ffffff;" @click="onClickColorBtn"></div>
    <div class="color_btn" style="background-color: #ff3b30;" @click="onClickColorBtn"></div>
    <div class="color_btn" style="background-color: #ff9500;" @click="onClickColorBtn"></div>
    <div class="color_btn" style="background-color: #ffcc00;" @click="onClickColorBtn"></div>
    <div class="color_btn" style="background-color: #4cd963;" @click="onClickColorBtn"></div>
    <div class="color_btn" style="background-color: #5ac8fa;" @click="onClickColorBtn"></div>
    <div class="color_btn" style="background-color: #0579ff;" @click="onClickColorBtn"></div>
    <div class="color_btn" style="background-color: #5856d6;" @click="onClickColorBtn"></div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickColorBtn(event) {
      this.$store.commit("CLICK_DRAWING_BTN");
      this.$store.state.mousecursor
        .set({
          top: this.$store.state.mousecursor.cacheHeight,
          left: this.$store.state.mousecursor.cacheWidth,
          radius: this.rangeValue / 2,
        })
        .setCoords()
        .canvas.renderAll();

      const btnColor = event.target.style.backgroundColor;
      this.$store.state.canvas.freeDrawingBrush.color = btnColor;
    },
  },
};
</script>

<style lang="scss" scoped>
.cvs_colors {
  display: flex;
  width: 600px;
  position: absolute;
  bottom: -12%;
  justify-content: space-around;

  .color_btn {
    width: 45px;
    height: 45px;
    border-radius: 25px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);

    &:active {
      transform: scale(1.15);
    }
  }
}
</style>