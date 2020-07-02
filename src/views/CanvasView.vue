<template>
  <div class="container">
    <header-bar></header-bar>
    <canvas-area></canvas-area>
  </div>
</template>

<script>
import HeaderBar from "../components/HeaderBar";
import CanvasArea from "../components/CanvasArea";

export default {
  components: {
    HeaderBar,
    CanvasArea
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
