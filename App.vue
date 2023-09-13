<script>
export default {
  onLaunch: function () {
    console.log('App Launch');
  },
  onShow: function () {
    console.log('App Show');
  },
  onHide: function () {
    console.log('App Hide');
  },
};
console.log(uni.$u.config.v, 'console.log(uni.$u.config.v);');
</script>

<style lang="scss">
/*每个页面公共css */
@import 'uview-plus/index.scss';
</style>
