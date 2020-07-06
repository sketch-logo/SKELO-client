<template>
  <div class="cvs-container">
    <div class="cvs_tools">
      <div class="tool_btn" @click="onClickPointerBtn">
        <font-awesome-icon icon="arrows-alt" class="tool_icon"></font-awesome-icon>
      </div>
      <div class="tool_btn" @click="onClickDrawingBtn">
        <font-awesome-icon icon="pen" class="tool_icon"></font-awesome-icon>
      </div>
    </div>
    <canvas class="cvs" id="cvs" ref="cvs"></canvas>
  </div>
</template>

<script>
import { fabric } from "fabric";

import { library as faLibrary } from "@fortawesome/fontawesome-svg-core";
import { faArrowsAlt, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

faLibrary.add(faArrowsAlt, faPen);

export default {
  data() {
    return {
      canvas: ""
    };
  },
  components: {
    FontAwesomeIcon
  },
  mounted() {
    const ref = this.$refs.cvs;
    this.canvas = new fabric.Canvas(ref, { isDrawingMode: true });

    this.canvas.setHeight(500);
    this.canvas.setWidth(500);
  },
  methods: {
    onClickPointerBtn() {
      this.canvas.isDrawingMode = false;
    },
    onClickDrawingBtn() {
      this.canvas.isDrawingMode = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.cvs-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

/*  Canvas Tools  *****************************************************************/

.cvs_tools {
  display: flex;
  flex-direction: column;
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
</style>
