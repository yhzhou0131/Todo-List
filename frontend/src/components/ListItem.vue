<script setup lang="ts">
import Button from './Button.vue';

defineProps(['index', 'item', 'isEditing']);
defineEmits([
  'toggleActiveState',
  'deleteItem',
  'startEditing',
  'saveEditChanges',
  'cancelEditing',
]);
</script>

<template>
  <div
    v-if="!item.isEditing"
    class="note-container"
    :class="{ 'active-note': item.isActive, disable: !item.isActive }"
  >
    <div
      class="text-container pointer-cursor"
      @click="$emit('toggleActiveState')"
    >
      <h1 class="title-text">{{ item.title }}</h1>
      <p class="content-text">{{ item.content }}</p>
    </div>
    <div class="button-container">
      <Button
        :isEditing="isEditing"
        imgSrc="pencil.png"
        @click="$emit('startEditing')"
      />
      <Button imgSrc="clear.png" @click="$emit('deleteItem')" />
    </div>
  </div>

  <div v-else class="note-container">
    <div class="text-container">
      <input
        class="edit-container input"
        type="text"
        v-model="item.editedTitle"
      />
      <textarea class="edit-container textarea" v-model="item.editedContent" />
    </div>
    <div class="button-container">
      <Button
        imgSrc="check.png"
        @click="
          $emit('saveEditChanges', item.editedTitle, item.editedContent, index)
        "
      />
      <Button imgSrc="clear.png" @click="$emit('cancelEditing')" />
    </div>
  </div>
</template>

<style scoped>
.title-text {
  font-family: 'Inter-SemiBold', Helvetica;
  font-size: 20px;
}

.content-text {
  font-family: 'Inter-SemiBold', Helvetica;
  font-size: 16px;
}

.note-container {
  border-left: 5px solid #bebebe;
  padding: 10px;
  margin: 10px;
  display: flex;
  align-items: flex-start;
  text-align: left;
  border: 2px solid gray;
  border-radius: 15px;
}

.pointer-cursor {
  cursor: pointer;
}

.text-container {
  width: 750px;
}

.button-container {
  width: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.active-note {
  border-left: 8px solid #478058;
  padding-left: 20px;
}

.disable {
  text-decoration: line-through;
  text-decoration-thickness: 3px;
  color: #808080;
  border-left: 8px solid #808080;
  padding-left: 20px;
}

.edit-container {
  width: 600px;
  display: flex;
  margin: 5px;
  border-radius: 5px;
  font-family: 'Inter-SemiBold', Helvetica;
}

.edit-container.input {
  height: 30px;
  font-size: 18px;
}

.edit-container.textarea {
  height: 50px;
  font-size: 16px;
}
</style>
