import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    canvas: "",
    cursor: "",
    mousecursor: "",
    selection: {
      width: 0,
      height: 0,
      top: 0,
      left: 0
    }
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
        const selection = state.canvas.getActiveObject();

        if (selection.type == "activeSelection") {
          selection.forEachObject(function(element) {
            state.canvas.remove(element);
          });
        } else {
          state.canvas.remove(selection);
        }
      } else {
        state.canvas.clear();
      }
    },
    SELECT_ALL_OBJECTS(state) {
      state.canvas.discardActiveObject();

      const selection = new fabric.ActiveSelection(state.canvas.getObjects(), {
        canvas: state.canvas
      });

      console.log("selection :>> ", selection);
      state.selection.width = selection.width;
      state.selection.height = selection.height;
      state.selection.top = selection.top;
      state.selection.left = selection.left;

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
    },
    REMOVE_SELECTION(state) {
      if (state.canvas.getActiveObject()) {
        const selection = state.canvas.getActiveObject();
        state.selection.width = selection.width;
        state.selection.height = selection.height;
        state.selection.top = selection.top;
        state.selection.left = selection.left;

        if (selection.type == "activeSelection") {
          selection.forEachObject(function(element) {
            state.canvas.remove(element);
          });
        } else {
          state.canvas.remove(selection);
        }
      }
    }
  },
  actions: {}
});
