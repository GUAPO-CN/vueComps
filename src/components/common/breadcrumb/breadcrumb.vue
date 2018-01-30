<template>
  	<div class="el-breadcrumb" aria-label="Breadcrumb" role="navigation">
    	<slot></slot>
  	</div>
</template>
<script>
  export default {
    name: 'lxmBreadcrumb',

    props: {
      separator: {
        type: String,
        default: '/'
      },
      separatorClass: {
        type: String,
        default: ''
      }
    },

    provide() {
      return {
        lxmBreadcrumb: this
      };
    },

    mounted() {
      const items = this.$el.querySelectorAll('.el-breadcrumb__item');
      if (items.length) {
        items[items.length - 1].setAttribute('aria-current', 'page');
      }
    }
  };
</script>
