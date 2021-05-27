<template>
  <div class="cvs-colors">
    <div class="color-btn" style="background-color: #2c2c2c;" @click="onClickColorBtn"></div>
    <div class="color-btn" style="background-color: #ffffff;" @click="onClickColorBtn"></div>
    <div class="color-btn" style="background-color: #ff3b30;" @click="onClickColorBtn"></div>
    <div class="color-btn" style="background-color: #ff9500;" @click="onClickColorBtn"></div>
    <div class="color-btn" style="background-color: #ffcc00;" @click="onClickColorBtn"></div>
    <div class="color-btn" style="background-color: #4cd963;" @click="onClickColorBtn"></div>
    <div class="color-btn" style="background-color: #5ac8fa;" @click="onClickColorBtn"></div>
    <div class="color-btn" style="background-color: #0579ff;" @click="onClickColorBtn"></div>
    <div class="color-btn" style="background-color: #5856d6;" @click="onClickColorBtn"></div>
    <input
      type="color"
      id="color"
      class="color-btn"
      @input="onClickColorPicker"
      :value="colorValue"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      colorValue: "",
    };
  },
  methods: {
    onClickColorBtn(event) {
      this.$store.commit("CLICK_DRAWING_BTN");

      const btnColor = event.target.style.backgroundColor;
      this.$store.state.canvas.freeDrawingBrush.color = btnColor;
      this.colorValue = this.rgbToHex(btnColor);
    },
    onClickColorPicker(event) {
      this.$store.commit("CLICK_DRAWING_BTN");

      const btnColor = event.target.value;
      this.$store.state.canvas.freeDrawingBrush.color = btnColor;
    },
    rgbToHex(rgb) {
      return rgb.replace(/rgb\((.+?)\)/gi, (_, rgb) => {
        return (
          "#" +
          rgb
            .split(",")
            .map((str) => parseInt(str, 10).toString(16).padStart(2, "0"))
            .join("")
        );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cvs-colors {
  display: flex;
  width: 600px;
  position: absolute;
  bottom: -12%;
  justify-content: space-around;

  .color-btn {
    width: 45px;
    height: 45px;
    border-radius: 25px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    padding: 0;

    &:active {
      transform: scale(1.15);
    }
  }

  input[type="color"] {
    -webkit-appearance: none;
    padding: 0;
    border: 3px double $black;
    border-radius: 25px;
    outline: none;
    box-sizing: border-box;

    &:focus {
      outline: none;
    }

    &::-webkit-color-swatch {
      border: none;
      border-radius: 25px;
      padding: 0;
      outline: none;
    }

    &::-webkit-color-swatch-wrapper {
      border: none;
      border-radius: 25px;
      padding: 0;
      outline: none;
    }
  }
}
</style>