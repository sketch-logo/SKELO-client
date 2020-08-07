<template>
  <div class="cvs-container" @contextmenu.prevent="switchMode">
    <div class="cvs-column-container">
      <canvas-tools></canvas-tools>

      <div id="cont">
        <canvas class="cvs" id="cvs" ref="cvs"></canvas>
        <canvas id="cursor" width="600" height="600"></canvas>
      </div>

      <canvas-color @click.native="changeCursorPosition"></canvas-color>

      <input
        type="range"
        class="brush-size"
        min="1"
        max="150"
        step="1"
        v-model="rangeValue"
        @input="changeBrushSize"
      />
    </div>
  </div>
</template>

<script>
import { fabric } from "fabric";

import CanvasColor from "./CanvasColor";
import CanvasTools from "./CanvasTools";

export default {
  data() {
    return {
      canvas: "",
      cursor: "",
      mousecursor: "",
      rangeValue: 10,
    };
  },
  components: {
    CanvasColor,
    CanvasTools,
  },
  mounted() {
    const ref = this.$refs.cvs;
    this.$store.state.canvas = new fabric.Canvas(ref, { isDrawingMode: true });
    this.$store.state.canvas.freeDrawingBrush = new fabric.PencilBrush(
      this.$store.state.canvas
    );

    this.$store.state.canvas.freeDrawingBrush.width = this.rangeValue;

    this.$store.state.canvas.setHeight(600);
    this.$store.state.canvas.setWidth(600);
    this.$store.state.canvas.freeDrawingCursor = "none";

    this.$store.state.cursor = new fabric.StaticCanvas("cursor");
    this.$store.state.mousecursor = new fabric.Circle({
      left: -100,
      top: -100,
      radius: this.rangeValue / 2,
      fill: "rgba(255,0,0,0)",
      stroke: "black",
      originX: "center",
      originY: "center",
    });

    this.$store.state.cursor.add(this.$store.state.mousecursor);

    this.$store.state.canvas.on("mouse:move", this.changeCursorDrawing);
    this.$store.state.canvas.on("mouse:out", this.changeCursorOut);

    this.$store.state.canvas.on("mouse:up", this.endDrawing);
    this.$store.state.canvas.on(
      "before:selection:cleared",
      this.clearSelection
    );

    const self = this;
    window.addEventListener("keyup", function (event) {
      if (event.key == "Delete" || event.key == "Backspace") {
        self.$store.commit("REMOVE_SELECTED_OBJECTS");
      }

      if (
        event.ctrlKey == true &&
        (event.keyCode == 65 || event.keyCode == 97)
      ) {
        self.$store.commit("SELECT_ALL_OBJECTS");
      }
    });
  },
  methods: {
    switchMode() {
      this.$store.commit("SWITCH_MODE");
    },
    onClickDrawingBtn() {
      this.$store.commit("CLICK_DRAWING_BTN");
    },
    clearSelection() {
      this.$store.commit("UNGROUP_SELECTED_OBJECTS");
    },
    endDrawing() {
      if (this.$store.state.canvas.isDrawingMode) {
        this.$store.commit("SELECT_ALL_OBJECTS");
        this.$store.commit("GROUP_SELECTED_OBJECTS");
      }
    },
    changeBrushSize(event) {
      this.rangeValue = parseInt(event.target.value);
      this.$store.state.canvas.freeDrawingBrush.width = this.rangeValue;

      this.onClickDrawingBtn();

      this.changeCursorPosition();

      this.$store.state.canvas.renderAll();
    },
    changeCursorDrawing(event) {
      const mouse = event.pointer;
      if (this.$store.state.canvas.isDrawingMode) {
        this.$store.state.mousecursor
          .set({
            top: mouse.y,
            left: mouse.x,
          })
          .setCoords()
          .canvas.renderAll();
      }
    },
    changeCursorOut() {
      if (this.$store.state.canvas.isDrawingMode) {
        this.$store.state.mousecursor.set({}).setCoords().canvas.renderAll();
      }
    },
    changeCursorPosition() {
      this.$store.state.mousecursor
        .set({
          top: 300,
          left: 300,
          radius: this.rangeValue / 2,
        })
        .setCoords()
        .canvas.renderAll();
    },
  },
};
</script>

<style lang="scss" scoped>
.cvs-container {
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  justify-content: center;
}

.cvs-column-container {
  margin: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 600px;
  height: 600px;
}

/*  Canvas  *****************************************************************/

.cvs {
  background-color: white;
  border-radius: 15px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
}

#cont {
  position: absolute;
  width: 600px;
  height: 600px;
  left: 50%;
  transform: translate(-50%);
}

#cont canvas,
.canvas-container {
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
  width: 100% !important;
  height: 100% !important;
}

#cursor {
  pointer-events: none !important;
}

/*  Canvas Brush size  *****************************************************************/

.brush-size {
  position: absolute;
  top: 50%;
  left: -33%;
  transform: translate(-50%);
  width: 300px;
  transform: rotate(270deg);
}
</style>
