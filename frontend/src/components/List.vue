<script setup>
import ListItem from './ListItem.vue';
defineProps(['listItem', 'isEditing']);
defineEmits([
  'toggleActiveState',
  'deleteItem',
  'startEditing',
  'saveEditChanges',
  'cancelEditing',
]);
</script>

<template>
  <p v-for="(item, index) in listItem" :key="index">
    <ListItem
      :index="index"
      :item="item"
      :isEditing="isEditing"
      @toggle-active-state="$emit('toggleActiveState', index)"
      @delete-item="$emit('deleteItem', index)"
      @start-editing="$emit('startEditing', index)"
      @save-edit-changes="$emit('saveEditChanges', index)"
      @cancel-editing="$emit('cancelEditing', index)"
    />
  </p>
</template>
