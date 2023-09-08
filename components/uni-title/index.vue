<template>
  <span class="titles">
    <slot></slot>
    <span class="bg"></span>
  </span>
</template>

<style scoped lang="scss">
.titles {
  font-size: 16px;
  position: relative;
  font-weight: 600;
  display: inline-block;
}

.bg {
  width: 100%;
  height: 6px;
  background: linear-gradient(90deg, rgba(40, 120, 255, 0.8) 0%, rgba(40, 120, 255, 0) 100%);
  position: absolute;
  bottom: 10px;
  left: 0;
}
</style>
