<script setup>
defineProps(['buttonText', 'imgSrc', 'isEditing']);
defineEmits(['onButtonClick']);

const getImageUrl = (name) => {
  return new URL(`../assets/${name}`, import.meta.url).href;
};
</script>

<template>
  <div v-if="buttonText">
    <button class="text-button" @click="$emit('onButtonClick')">
      {{ buttonText }}
    </button>
  </div>
  <div v-else>
    <button
      :disabled="isEditing"
      @click="$emit('onButtonClick')"
      class="icon-button"
      :class="{ disabled: isEditing }"
    >
      <img :src="getImageUrl(imgSrc)" width="25" height="25" />
    </button>
  </div>
</template>

<style scoped>
.icon-button {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  width: 25px;
  height: 25px;
}

.disabled {
  filter: grayscale(100%);
  opacity: 0.5;
  cursor: not-allowed;
}

.text-button {
  background-color: #e3e7ea;
  border-radius: 10px;
  border: 2px solid #0f2c18;
  height: 35px;
  width: 90px;
  font-family: 'Inter-SemiBold', Helvetica;
  font-size: 20px;
}

.text-button:hover {
  background-color: #a1b08d;
  cursor: pointer;
}
</style>
