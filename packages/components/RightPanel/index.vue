<template>
  <div ref="rightPanel" :class="{show:show}" class="tax-app-rightPanel-container">
    <div class="rightPanel-background" />
    <div class="rightPanel">
      <div
        class="handle-button"
        :style="{'top':buttonTop+'px'}"
        @click="show=!show"
      >
        <i :class="`icon iconfont ${show?'fsicon-close':'fsicon-shezhi'}`" />
      </div>
      <div class="rightPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { addClass, removeClass } from "@ttk/vue/lib/utils";

export default {
  name: "RightPanel",
  props: {
    clickNotClose: {
      default: false,
      type: Boolean
    },
    buttonTop: {
      default: 250,
      type: Number
    }
  },
  data() {
    return {
      show: false
    };
  },
  watch: {
    show(value) {
      if (value && !this.clickNotClose) {
        this.addEventClick();
      }
      if (value) {
        addClass(document.body, "showRightPanel");
      } else {
        removeClass(document.body, "showRightPanel");
      }
    }
  },
  mounted() {
    this.insertToBody();
  },
  beforeDestroy() {
    const elx = this.$refs.rightPanel;
    elx.remove();
  },
  methods: {
    addEventClick() {
      window.addEventListener("click", this.closeSidebar);
    },
    closeSidebar(evt) {
      const parent = evt.target.closest(".rightPanel");
      if (!parent) {
        this.show = false;
        window.removeEventListener("click", this.closeSidebar);
      }
    },
    insertToBody() {
      const elx = this.$refs.rightPanel;
      const body = document.querySelector("body");
      body.insertBefore(elx, body.firstChild);
    }
  }
};
</script>
