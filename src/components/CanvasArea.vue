<template>
  <div class="cvs-container">
    <canvas class="cvs" id="cvs" ref="cvs"></canvas>
  </div>
</template>

<script>
import { fabric } from "fabric";
export default {
  mounted() {
    const ref = this.$refs.cvs;
    const canvas = new fabric.Canvas(ref);
    const rect = new fabric.Rect({
      fill: "red",
      width: 20,
      height: 20
    });
    canvas.add(rect);
  }
};
</script>

<style lang="scss" scoped>
.cvs-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.cvs {
  width: 500px;
  height: 500px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
}
</style>
