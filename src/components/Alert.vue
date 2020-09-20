<template>
  <div class="alert">
    <i @click="closeAlert()" class="fas fa-times"></i>
    <span>{{ alertMessage }}</span>
  </div>
</template>

<script>
export default {
  props: [
    'alertMessage',
  ],
  methods: {
    closeAlert() {
      this.$emit('close-alert');
    },
  }
}
</script>

<style scoped>
.alert {
  box-sizing: border-box;
  position: fixed;
  top: 80px;
  left: 20px;
  width: 50vw;
  max-width: 510px;
  padding: 10px 10px 35px 10px;
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #155724;
  border-radius: 5px;
  text-transform: capitalize;
  display: flex;
  flex-direction: column;
  z-index: 1;
}

.fas {
  align-self: flex-end;
  font-size: 16px;
  width: 10px;
  cursor: pointer;
}

span {
  margin: 10px 0 0 0;
  align-self: center;
}

</style>