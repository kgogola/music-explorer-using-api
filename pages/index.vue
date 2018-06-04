<template>
  <div class = "page--mainpage">
    <search-part></search-part>
  </div>
</template>

<script>
import searchPart from "~/components/searchPart.vue";

export default {
  components: {
    searchPart
  }
};
</script>

<style>
body {
  background-color: rgb(218, 70, 70);
}
.page--mainpage {
  background-color: rgb(218, 70, 70);
  height: 30px;

}
</style>
