<template>
  <div :class="classObj" class="app-wrapper">
    <tax-app-header :class="{'fixed-header':fixedHeader}" />
    <div class="main-container">
      <sidebar class="sidebar-container" />
      <app-main />
      <right-panel v-if="showSettings">
        <!-- <settings /> -->
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
import RightPanel from "tax-group-app/packages/components/RightPanel";
import TaxAppHeader from "tax-group-app/packages/components/TaxAppHeader";
import {
  Settings,
  Sidebar,
  AppMain,
  TagsView
} from "tax-group-app/packages/layout/components";
import { mapState } from "vuex";
// import ResizeMixin from 'tax-group-app/packages/layout/mixin/ResizeHandler'
// const{ Navbar, Sidebar, AppMain } = import('tax-group-app/packages/layout/components')
// const ResizeMixin = import('tax-group-app/packages/layout/mixin/ResizeHandler')
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
