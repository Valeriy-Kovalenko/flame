<template>
  <div v-if="props.isModalVisible" @click="closeModal" class="backdrop"></div>
  <div class="modal" v-if="props.isModalVisible">
    <div class="modal__add" v-if="props.isModalForAdd">
      <h1>New character</h1>
      <div>
        <input type="text" v-model="name" placeholder="Name">
        <input type="text" v-model="height" inputmode="text" placeholder="Height">
        <input type="text" v-model="mass" inputmode="text" placeholder="Mass">
        <input type="text" v-model="hairColor" placeholder="Hair color">
        <button @click="addPerson">Add</button>
      </div>
      <button @click="closeModal" class="close-button">Close</button>
    </div>
    <div class="modal__delete" v-if="props.isModalForDelete">
      <h1>Delete character</h1>
      <input type="text" v-model="name" placeholder="Name">
      <button @click="deletePerson">Delete</button>
      <button @click="closeModal" class="close-button">Close</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref } from "vue";

const emit = defineEmits(["changePeopleList", "closeAllModals"]);
const props = defineProps({
  isModalVisible: Boolean,
  isModalForAdd: Boolean,
  isModalForDelete: Boolean,
});

const name = ref<string>("");
const height = ref<string>("");
const mass = ref<string>("");
const hairColor = ref<string>("");

const addPerson = () => {
  const isInputEmpty = name.value === "" && height.value === "0" && mass.value === "0" && hairColor.value === "";
  if (!isInputEmpty) {
    emit("changePeopleList", {
      name: name.value,
      height: Number(height.value),
      mass: Number(mass.value),
      hair_color: hairColor.value,
      isFavorite: false,
    });
    closeModal();
  } else {
    alert("Inputs are empty!");
  }
};

const deletePerson = (): void => {
  if (name.value !== "") {
    emit("changePeopleList", name.value);
    closeModal();
  } else {
    alert("Input is empty!");
  }
};

const closeModal = (): void => {
  name.value = "";
  height.value = "";
  mass.value = "";
  hairColor.value = "";
  emit("closeAllModals");
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 2;
}

.modal {
  position: fixed;
  top: 20vh;
  left: 20%;
  width: 60%;
  z-index: 3;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 16px;
  background-color: white;
}

.modal input {
  margin-right: 16px;
  border: 1px solid black;
  border-radius: 4px;
  padding: 2px;
}

.modal__add, .modal__delete {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal__delete input {
  margin-bottom: 8px;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
