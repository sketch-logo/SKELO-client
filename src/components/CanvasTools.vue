<template>
  <div class="cvs_tools">
    <div class="tool_btn" @click="switchMode">
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
</template>

<script>
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
  components: {
    FontAwesomeIcon,
  },
  methods: {
    switchMode() {
      this.$store.commit("SWITCH_MODE");
    },
    onClickDrawingBtn() {
      this.$store.commit("CLICK_DRAWING_BTN");
    },
    onClickSaveImgBtn() {
      if (this.$store.state.canvas.getActiveObject()) {
        const image = this.$store.state.canvas
          .getActiveObject()
          .toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "image";
        link.click();
      } else {
        const image = this.$store.state.canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "image";
        link.click();
      }
    },
    onClickClearBtn() {
      this.$store.commit("REMOVE_SELECTED_OBJECTS");
    },
  },
};
</script>

<style lang="scss" scoped>
.cvs_tools {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: -30%;
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
</style>