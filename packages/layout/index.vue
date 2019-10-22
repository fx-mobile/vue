<template>
  <div :class="classObj" class="app-wrapper">
    <tax-app-header :class="{'fixed-header':fixedHeader}" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
    <!-- <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      
    </div>-->
  </div>
</template>

<script>
import RightPanel from "@ttk/vue/packages/components/RightPanel";
import TaxAppHeader from "@ttk/vue/packages/components/TaxAppHeader";
import {
  Settings,
  Sidebar,
  AppMain,
  TagsView
} from "@ttk/vue/packages/layout/components";
import { mapState } from "vuex";
// import ResizeMixin from '@ttk/vue/packages/layout/mixin/ResizeHandler'
// const{ Navbar, Sidebar, AppMain } = import('@ttk/vue/packages/layout/components')
// const ResizeMixin = import('@ttk/vue/packages/layout/mixin/ResizeHandler')
export default {
  name: "Layout",
  components: {
    RightPanel,
    TaxAppHeader,
    Settings,
    Sidebar,
    AppMain,
    TagsView
  },
  // mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.tax_app.sidebar,
      device: state => state.tax_app.device,
      showSettings: state => state.tax_settings.showSettings,
      needTagsView: state => state.tax_settings.tagsView,
      fixedHeader: state => state.tax_settings.fixedHeader
    }),
    sidebar() {
      return this.$store.state.tax_app.sidebar;
    },
    device() {
      return this.$store.state.tax_app.device;
    },
    fixedHeader() {
      return this.$store.state.tax_settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: false, // !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    }
  }
};
</script>
