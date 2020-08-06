import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    canvas: "",
    cursor: "",
    mousecursor: ""
  },
  getters: {},
  mutations: {
    SWITCH_MODE(state) {
      if (state.canvas.isDrawingMode) {
        state.canvas.isDrawingMode = false;
        state.cursor.remove(state.mousecursor);
      } else {
        state.canvas.isDrawingMode = true;
        state.cursor.remove(state.mousecursor);
        state.cursor.add(state.mousecursor);
      }
    },
    CLICK_DRAWING_BTN(state) {
      state.canvas.isDrawingMode = true;
      state.cursor.remove(state.mousecursor);
      state.cursor.add(state.mousecursor);
    },
    REMOVE_SELECTED_OBJECTS(state) {
      if (state.canvas.getActiveObject()) {
        state.canvas.remove(state.canvas.getActiveObject());
      } else {
        state.canvas.clear();
      }
    },

    SELECT_ALL_OBJECTS(state) {
      state.canvas.discardActiveObject();

      const selection = new fabric.ActiveSelection(state.canvas.getObjects(), {
        canvas: state.canvas
      });

      state.canvas.setActiveObject(selection);
      state.canvas.requestRenderAll();
    },
    GROUP_SELECTED_OBJECTS(state) {
      if (!state.canvas.getActiveObject()) {
        return;
      }
      if (state.canvas.getActiveObject().type !== "activeSelection") {
        return;
      }
      state.canvas.getActiveObject().toGroup();
      state.canvas.requestRenderAll();
    },
    UNGROUP_SELECTED_OBJECTS(state) {
      if (!state.canvas.getActiveObject()) {
        return;
      }
      if (state.canvas.getActiveObject().type !== "group") {
        return;
      }
      state.canvas.getActiveObject().toActiveSelection();
      state.canvas.requestRenderAll();
    },
    DISCARD_SELECTION(state) {
      state.canvas.discardActiveObject();
      state.canvas.requestRenderAll();
    }
  },
  actions: {}
});
