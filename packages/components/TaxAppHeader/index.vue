<template>
  <el-header class="tax-app-header" height="105">
    <div class="logo">
      <img
        class="pic-404__child right"
        src="@tax/packages/assets/tax/images/logo/logo_gd.png"
        alt="404"
      />
    </div>
  </el-header>
</template>

<script>
export default {
  name: "TaxAppHeader",
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // toggleClick() {
    //   this.$emit("toggleClick");
    // }
  }
};
</script>
