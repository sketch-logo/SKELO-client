<template>
  <div style="margin:0" @contextmenu.prevent>
    <div class="header">
      <div class="header-container">
        <div class="left-menu">
          <router-link to="/" tag="button" class="left-menu-btn">
            <font-awesome-icon icon="bars" class="left-menu-btn-icon"></font-awesome-icon>
          </router-link>
        </div>

        <div class="center-menu">
          <router-link tag="a" to="/" class="center-button-link">
            <div class="center-logo">SKELO</div>
          </router-link>
        </div>

        <div class="right-menu">
          <router-link to="/" tag="button" class="right-menu-btn">
            <font-awesome-icon icon="user-circle" class="right-menu-btn-icon"></font-awesome-icon>
          </router-link>
        </div>
      </div>
    </div>
    <div class="head"></div>
  </div>
</template>

<script>
import { library as faLibrary } from "@fortawesome/fontawesome-svg-core";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

faLibrary.add(faBars, faUserCircle);

export default {
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Krona+One&display=swap");

.head {
  width: 100%;
  height: 60px;
  position: relative;
}

.header {
  position: fixed;
  display: flex;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  font-size: 16px;
  width: 100%;
  height: 50px;
  background: $white;
  z-index: 999;
  margin: 0 auto;
  padding: 0;
  border-bottom: 1px solid $black;
  color: $black;
  font-family: "Noto Serif KR", serif;
}

.header .header-container {
  width: 1080px;
  margin: 0 auto;
  position: relative;
  padding: 0;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
}

/*  Header Left  *****************************************************************/

.header .header-container .left-menu {
  flex: 1 0 25%;
  text-align: center;
  display: flex;
}

.left-menu .left-menu-btn {
  border: none;
  background: transparent;
  outline: none;
  color: $black;
  font-weight: bold;
  cursor: pointer;
  padding: 0 1rem;
}

.left-menu .left-menu-btn .left-menu-btn-icon {
  display: inline-block;
  opacity: 1;
  margin: 0 0.25rem 0 0;
  font-size: 1.5em;
  font-style: normal;
  font-weight: 400;
  text-decoration: inherit;
  text-align: center;
}

/*  Header Center  *****************************************************************/

.header .header-container .center-menu {
  width: 10rem;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}

.center-menu .center-button-link .center-logo {
  color: $black;
  font-family: "Krona One", serif;
  font-size: 20px;
  user-select: none;
  -ms-user-select: none;
}

/*  Header Right  *****************************************************************/

.header .header-container .right-menu {
  flex: 1 0 25%;
  text-align: right;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: end;
  justify-content: flex-end;
}

.right-menu {
  display: inline-block;
  min-height: 1em;
  border: none;
  vertical-align: baseline;
  background: transparent;
  text-align: center;
  font-size: 18px;
}

.right-menu .right-menu-btn {
  display: inline-block;
  opacity: 1;
  margin: 0 0.25rem 0 0;
  width: 1.5em;
  height: 1.5em;
  font-style: normal;
  font-weight: 400;
  text-decoration: inherit;
  text-align: center;
  border: none;
  background: transparent;
  outline: none;
  color: $black;
  font-weight: bold;
  cursor: pointer;
  padding: 0 1rem;
}

.right-menu .right-menu-btn .right-menu-btn-icon {
  display: inline-block;
  opacity: 1;
  margin: 0 0.25rem 0 0;
  font-size: 1.5em;
  font-style: normal;
  font-weight: 400;
  text-decoration: inherit;
  text-align: center;
}
</style>
