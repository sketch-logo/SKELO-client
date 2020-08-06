<template>
  <div class="menu-container">
    <div class="menu" :class="menuClosed">
      <div class="menu-btn" :class="menuClosed" @click="activeMenu">
        <font-awesome-icon v-if="menuClosed==''" icon="caret-right" class="menu-btn-icon"></font-awesome-icon>
        <font-awesome-icon v-else icon="caret-left" class="menu-btn-icon"></font-awesome-icon>
      </div>
      <div class="menu-content" v-if="menuClosed==''">
        <ul class="contents-list">
          <li class="content" @click="onClickImg">
            <img src="https://image.flaticon.com/icons/svg/607/607757.svg" class="content-img" />
          </li>
          <li class="content" @click="onClickImg">
            <img src="https://image.flaticon.com/icons/svg/149/149098.svg" class="content-img" />
          </li>
          <li class="content" @click="onClickImg">
            <img src="https://image.flaticon.com/icons/svg/607/607757.svg" class="content-img" />
          </li>
          <li class="content" @click="onClickImg">
            <img src="https://image.flaticon.com/icons/svg/607/607757.svg" class="content-img" />
          </li>
          <li class="content" @click="onClickImg">
            <img src="https://image.flaticon.com/icons/svg/607/607757.svg" class="content-img" />
          </li>
          <li class="content" @click="onClickImg">
            <img src="https://image.flaticon.com/icons/svg/607/607757.svg" class="content-img" />
          </li>
          <li class="content" @click="onClickImg">
            <img src="https://image.flaticon.com/icons/svg/607/607757.svg" class="content-img" />
          </li>
          <li class="content" @click="onClickImg">
            <img src="https://image.flaticon.com/icons/svg/607/607757.svg" class="content-img" />
          </li>
          <li class="content" @click="onClickImg">
            <img src="https://image.flaticon.com/icons/svg/607/607757.svg" class="content-img" />
          </li>
          <li class="content" @click="onClickImg">
            <img src="https://image.flaticon.com/icons/svg/607/607757.svg" class="content-img" />
          </li>
          <li class="content" @click="onClickImg">
            <img src="https://image.flaticon.com/icons/svg/607/607757.svg" class="content-img" />
          </li>
          <li class="content" @click="onClickImg">
            <img src="https://image.flaticon.com/icons/svg/607/607757.svg" class="content-img" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { library as faLibrary } from "@fortawesome/fontawesome-svg-core";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

faLibrary.add(faCaretLeft, faCaretRight);

export default {
  data() {
    return {
      menuClosed: "",
    };
  },
  components: {
    FontAwesomeIcon,
  },
  methods: {
    activeMenu() {
      if (this.menuClosed == "active") {
        this.menuClosed = "";
      } else {
        this.menuClosed = "active";
      }
    },
    onClickImg() {
      console.log("test");
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-container {
  .menu {
    position: absolute;
    right: 0;
    width: 400px;
    height: calc(100% - 70px);
    border-radius: 20px 0 0 20px;
    background-color: $gray;
    transition: 300ms width cubic-bezier(0.77, 0, 0.175, 1);

    &.active {
      width: 0;
    }

    .menu-btn {
      position: absolute;
      top: calc(50% - 50px);
      right: 400px;
      width: 20px;
      height: 100px;
      border-radius: 10px 0 0 10px;
      background-color: $gray;
      cursor: pointer;
      transition: 300ms right cubic-bezier(0.77, 0, 0.175, 1);

      &.active {
        right: 0;
      }

      .menu-btn-icon {
        position: absolute;
        color: $black;
        top: calc(50% - 10px);
        right: 5px;
        font-size: 18px;
      }
    }

    .menu-content {
      width: 100%;
      height: 100%;
      display: flex;
      padding: 20px;
      box-sizing: border-box;
      overflow: auto;

      .contents-list {
        width: 100%;

        .content {
          width: 150px;
          height: 150px;
          position: relative;
          float: left;
          margin: 10px;
          background-color: $white;
          border-radius: 15px;
          cursor: pointer;

          .content-img {
            margin: 20px;
          }
        }
      }
    }
  }
}
</style>