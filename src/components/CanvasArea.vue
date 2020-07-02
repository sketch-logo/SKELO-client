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
    const canvas = new fabric.Canvas(ref, { isDrawingMode: true });

    canvas.setHeight(500);
    canvas.setWidth(500);
    canvas.on("mouse:up", function() {
      canvas.isDrawingMode = false;
    });

    const rect = new fabric.Rect({
      fill: "red",
      width: 20,
      height: 20
    });
    canvas.add(rect);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.cvs-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.cvs {
  background-color: white;
  border-radius: 15px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
}
</style>
