<script setup>
import { ref, onMounted } from 'vue';
import List from './List.vue';
import Button from './Button.vue';
import NoteDataService from '../services/noteService.ts';
import _ from 'lodash';

const title = ref('');
const content = ref('');
const isEditing = ref(false);
const isInputEmpty = ref(false);

const listItem = ref([]);

const addNote = async () => {
  if (title.value.trim()) {
    const data = await NoteDataService.addNote({
      title: title.value,
      content: content.value,
      isActive: true,
    });
    if (data) {
      listItem.value.push({
        id: data._id,
        title: data.title,
        content: data.content,
        isActive: data.isActive,
        isEditing: false,
      });
    }

    title.value = '';
    content.value = '';
    isInputEmpty.value = false;
  } else {
    isInputEmpty.value = true;
  }
};

const saveActiveState = _.debounce(async (id, activeState) => {
  const res = await NoteDataService.updateNote(id, {
    isActive: activeState,
  });
}, 500);

const toggleActiveState = (index) => {
  listItem.value[index].isActive = !listItem.value[index].isActive;
  saveActiveState(listItem.value[index].id, listItem.value[index].isActive);
};

const deleteItem = async (index) => {
  const deleteId = listItem.value[index].id;
  const response = await NoteDataService.deleteNote(deleteId);
  if (response.deletedCount) {
    listItem.value.splice(index, 1);
  }
};

const startEditing = (index) => {
  isEditing.value = true;
  listItem.value[index].isEditing = true;
  listItem.value[index].editedTitle = listItem.value[index].title;
  listItem.value[index].editedContent = listItem.value[index].content;
};

const saveEditChanges = async (index) => {
  const res = await NoteDataService.updateNote(listItem.value[index].id, {
    title: listItem.value[index].editedTitle,
    content: listItem.value[index].editedContent,
  });
  isEditing.value = false;
  listItem.value[index].isEditing = false;
  if (res) {
    listItem.value[index].title = listItem.value[index].editedTitle;
    listItem.value[index].content = listItem.value[index].editedContent;
  }
};

const cancelEditing = (index) => {
  isEditing.value = false;
  listItem.value[index].isEditing = false;
};

onMounted(async () => {
  const res = await NoteDataService.getAllNotes();
  _.forEach(res, (obj) => {
    listItem.value.push({
      id: obj._id,
      title: obj.title,
      content: obj.content,
      owner: obj.owner,
      createdAt: obj.createdAt,
      isActive: obj.isActive,
      isEditing: false,
    });
  });
});
</script>

<template>
  <div class="todo-box">
    <div class="center-content">
      <div class="form-row">
        <input
          class="input-box text"
          :class="{ 'input-reminder': isInputEmpty }"
          type="text"
          v-model="title"
          placeholder="Input note's title."
        />
        <p v-if="isInputEmpty" class="text-reminder">
          Please input your title.
        </p>
      </div>
      <div class="form-row">
        <textarea
          class="textarea-box text"
          v-model="content"
          placeholder="Input note's content if needed."
        />
      </div>
      <div class="form-row">
        <Button buttonText="Add" @on-button-click="addNote" />
      </div>
    </div>
    <div>
      <List
        :listItem="listItem"
        :isEditing="isEditing"
        @toggle-active-state="toggleActiveState"
        @delete-item="deleteItem"
        @start-editing="startEditing"
        @save-edit-changes="saveEditChanges"
        @cancel-editing="cancelEditing"
      />
    </div>
  </div>
</template>

<style scoped>
.todo-box {
  width: 800px;
  margin: 0 auto;
  justify-content: center;
  align-items: flex-start;
}

.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 80px;
}

.form-row {
  align-items: flex-start;
  padding: 5px;
}

.input-box.text,
.textarea-box.text {
  background-color: #ffffff;
  border-radius: 5px;
  font-family: 'Inter-SemiBold', Helvetica;
}

.input-box {
  height: 40px;
  width: 400px;
  font-size: 18px;
}

.input-box::placeholder,
.textarea-box::placeholder {
  font-family: 'Inter-SemiBold', Helvetica;
  font-size: 16px;
}

.input-reminder {
  border: 2px solid red;
}

.text-reminder {
  color: red;
  font-family: 'Inter-SemiBold', Helvetica;
  font-size: 16px;
}

.textarea-box {
  height: 80px;
  width: 400px;
  font-size: 16px;
}
</style>
