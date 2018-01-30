<template>
  <span class="el-breadcrumb__item">
    <span class="el-breadcrumb__inner" ref="link" role="link">
      <slot></slot>
    </span>
    <i v-if="separatorClass" class="el-breadcrumb__separator" :class="separatorClass"></i>
    <span v-else class="el-breadcrumb__separator" role="presentation">{{separator}}</span>
  </span>
</template>
<script>
  export default {
    name: 'lxmBreadcrumbItem',
    props: {
      to: {},
      replace: Boolean
    },
    data() {
      return {
        separator: '',
        separatorClass: ''
      };
    },

    inject: ['lxmBreadcrumb'],

    mounted() {
      this.separator = this.lxmBreadcrumb.separator;
      this.separatorClass = this.lxmBreadcrumb.separatorClass;
      let self = this;
      if (this.to) {
        let link = this.$refs.link;
        link.setAttribute('role', 'link');
        link.addEventListener('click', _ => {
          let to = this.to;
          self.replace ? self.$router.replace(to)
            : self.$router.push(to);
        });
      }
    }
  };
</script>
