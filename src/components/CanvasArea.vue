<template>
  <div class="cvs-container" @contextmenu.prevent="switchMode">
    <div class="cvs-column-container">
      <div class="cvs_tools">
        <div class="tool_btn" @click="onClickPointerBtn">
          <font-awesome-icon icon="arrows-alt" class="tool_icon"></font-awesome-icon>
        </div>

        <div class="tool_btn" @click="onClickDrawingBtn">
          <font-awesome-icon icon="pen" class="tool_icon"></font-awesome-icon>
        </div>

        <div class="tool_btn" @click="onClickClearBtn">
          <font-awesome-icon icon="trash-alt" class="tool_icon"></font-awesome-icon>
        </div>

        <div class="tool_btn" @click="onClickSaveImgBtn">
          <font-awesome-icon icon="download" class="tool_icon"></font-awesome-icon>
        </div>
      </div>

      <div id="cont">
        <canvas class="cvs" id="cvs" ref="cvs"></canvas>
        <canvas id="cursor" width="500" height="500"></canvas>
      </div>

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

import { library as faLibrary } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowsAlt,
  faPen,
  faDownload,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

faLibrary.add(faArrowsAlt, faPen, faDownload, faTrashAlt);

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
    FontAwesomeIcon,
  },
  mounted() {
    const ref = this.$refs.cvs;
    this.canvas = new fabric.Canvas(ref, { isDrawingMode: true });
    this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);

    this.canvas.freeDrawingBrush.width = this.rangeValue;

    this.canvas.setHeight(500);
    this.canvas.setWidth(500);
    this.canvas.freeDrawingCursor = "none";

    this.cursor = new fabric.StaticCanvas("cursor");
    this.mousecursor = new fabric.Circle({
      left: -100,
      top: -100,
      radius: this.rangeValue / 2,
      fill: "rgba(255,0,0,0)",
      stroke: "black",
      originX: "center",
      originY: "center",
    });

    this.cursor.add(this.mousecursor);

    this.canvas.on("mouse:move", this.changeCursorDrawing);
    this.canvas.on("mouse:out", this.changeCursorOut);

    this.canvas.on("mouse:up", this.endDrawing);
    this.canvas.on("before:selection:cleared", this.clearSelection);

    const self = this;
    window.addEventListener("keyup", function (event) {
      if (event.key == "Delete" || event.key == "Backspace") {
        self.onClickClearBtn();
      }

      if (
        event.ctrlKey == true &&
        (event.keyCode == 65 || event.keyCode == 97)
      ) {
        self.selectAllObjects();
      }
    });
  },
  methods: {
    switchMode() {
      if (this.canvas.isDrawingMode) {
        this.canvas.isDrawingMode = false;
        this.cursor.remove(this.mousecursor);
      } else {
        this.canvas.isDrawingMode = true;
        this.cursor.remove(this.mousecursor);
        this.cursor.add(this.mousecursor);
      }
    },
    onClickPointerBtn() {
      this.canvas.isDrawingMode = false;
      this.cursor.remove(this.mousecursor);
    },
    onClickDrawingBtn() {
      this.canvas.isDrawingMode = true;
      this.cursor.remove(this.mousecursor);
      this.cursor.add(this.mousecursor);
    },
    onClickSaveImgBtn() {
      if (this.canvas.getActiveObject()) {
        const image = this.canvas.getActiveObject().toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "image";
        link.click();
      } else {
        const image = this.canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "image";
        link.click();
      }
    },
    onClickClearBtn() {
      this.canvas.clear();
    },
    clearSelection() {
      this.ungroupSelectedObjects();
    },
    endDrawing() {
      if (this.canvas.isDrawingMode) {
        this.selectAllObjects();
        this.groupSelectedObjects();
      }
    },
    selectAllObjects() {
      this.canvas.discardActiveObject();

      const selection = new fabric.ActiveSelection(this.canvas.getObjects(), {
        canvas: this.canvas,
      });

      this.canvas.setActiveObject(selection);
      this.canvas.requestRenderAll();
    },
    groupSelectedObjects() {
      if (!this.canvas.getActiveObject()) {
        return;
      }
      if (this.canvas.getActiveObject().type !== "activeSelection") {
        return;
      }
      this.canvas.getActiveObject().toGroup();
      this.canvas.requestRenderAll();
    },
    ungroupSelectedObjects() {
      if (!this.canvas.getActiveObject()) {
        return;
      }
      if (this.canvas.getActiveObject().type !== "group") {
        return;
      }
      this.canvas.getActiveObject().toActiveSelection();
      this.canvas.requestRenderAll();
    },
    discardSelection() {
      this.canvas.discardActiveObject();
      this.canvas.requestRenderAll();
    },
    onClickColorBtn(event) {
      this.onClickDrawingBtn();
      this.mousecursor
        .set({
          top: this.mousecursor.cacheHeight,
          left: this.mousecursor.cacheWidth,
          radius: this.rangeValue / 2,
        })
        .setCoords()
        .canvas.renderAll();

      const btnColor = event.target.style.backgroundColor;
      this.canvas.freeDrawingBrush.color = btnColor;
    },
    changeBrushSize(event) {
      this.rangeValue = parseInt(event.target.value);
      this.canvas.freeDrawingBrush.width = this.rangeValue;

      this.onClickDrawingBtn();

      this.mousecursor
        .set({
          top: this.mousecursor.cacheHeight,
          left: this.mousecursor.cacheWidth,
          radius: this.rangeValue / 2,
        })
        .setCoords()
        .canvas.renderAll();

      this.canvas.renderAll();
    },
    changeCursorDrawing(event) {
      const mouse = event.pointer;
      if (this.canvas.isDrawingMode) {
        this.mousecursor
          .set({
            top: mouse.y,
            left: mouse.x,
          })
          .setCoords()
          .canvas.renderAll();
      }
    },
    changeCursorOut() {
      if (this.canvas.isDrawingMode) {
        this.mousecursor.set({}).setCoords().canvas.renderAll();
      }
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
  width: 500px;
  height: 500px;
}

/*  Canvas Tools  *****************************************************************/

.cvs_tools {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: -20%;
}
.cvs_tools .tool_btn {
  width: 60px;
  height: 60px;
  position: relative;
  display: flex;
  margin: 20px;
  border-radius: 100%;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: $white;
  transition: all 0.1s ease-in-out;
  box-shadow: -6px -6px 10px rgba(255, 255, 255, 0.8),
    6px 6px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    opacity: 0.3;
    box-shadow: -6px -6px 10px rgba(255, 255, 255, 0.8),
      6px 6px 10px rgba(0, 0, 0, 0.2);
  }

  &:active {
    opacity: 1;
    box-shadow: inset -4px -4px 8px rgba(255, 255, 255, 0.5),
      inset 8px 8px 16px rgba(0, 0, 0, 0.1);
  }
}

.cvs_tools .tool_icon {
  width: 30px;
  height: 30px;
}

/*  Canvas  *****************************************************************/

.cvs {
  background-color: white;
  border-radius: 15px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
}

#cont {
  position: absolute;
  width: 500px;
  height: 500px;
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

/*  Canvas Colors  *****************************************************************/

.cvs_colors {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: -20%;
}

.cvs_colors .color_btn {
  width: 45px;
  height: 45px;
  border-radius: 25px;
  margin: 3px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 10px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.cvs_colors .color_btn:active {
  transform: scale(1.15);
}

/*  Canvas Brush size  *****************************************************************/

.brush-size {
  position: absolute;
  bottom: -10%;
  left: 50%;
  transform: translate(-50%);
  width: 300px;
}
</style>
