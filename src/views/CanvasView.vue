<template>
  <div class="container">
    <header-bar></header-bar>
    <image-list></image-list>
    <canvas-area></canvas-area>
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar";
import CanvasArea from "../components/CanvasArea";
import ImageList from "../components/ImageList";

export default {
  components: {
    HeaderBar,
    CanvasArea,
    ImageList,
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
