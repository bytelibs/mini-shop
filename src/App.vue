<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
page {
  /*height: 100%;*/
  /*padding-bottom: constant(safe-area-inset-bottom);*/
  /*margin-bottom: 40px;*/
  background-color: #F8F8F8;
  /*background-color: #FFFFFF;*/
}
</style>
