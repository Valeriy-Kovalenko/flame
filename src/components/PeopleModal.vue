<template>
  <div v-if="props.isModalVisible" @click="closeModal" class="backdrop"></div>
  <div class="modal" v-if="props.isModalVisible">
    <div class="modal__add" v-if="props.isModalForAdd">
      <h1>New character</h1>
      <div>
        <input type="text" v-model="name" :class="{ invalid: validationText }" placeholder="Name">
        <input type="text" v-model="height" :class="{ invalid: validationText }" placeholder="Height">
        <input type="text" v-model="mass" :class="{ invalid: validationText }" placeholder="Mass">
        <input type="text" v-model="hairColor" :class="{ invalid: validationText }" placeholder="Hair color">
        <button @click="addPerson">Add</button>
      </div>
      <div v-if="validationText" class="add-validation">{{ validationText }}</div>
      <button @click="closeModal" class="close-button">Close</button>
    </div>
    <div class="modal__delete" v-if="props.isModalForDelete">
      <h1>Delete character</h1>
      <input type="text" v-model="name" :class="{ invalid: validationText }" placeholder="Name">
      <div v-if="validationText" class="delete-validation">{{ validationText }}</div>
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

const validationText = ref<string>("");

const addPerson = () => {
  const areInputsValid = validateInputs();

  if (areInputsValid) {
    emit("changePeopleList", {
      name: name.value,
      height: Number(height.value),
      mass: Number(mass.value),
      hair_color: hairColor.value,
      isFavorite: false,
    });
    closeModal();
  } else {
    validationText.value = "Your inputs are invalid. They shouldn't be empty. Also values of height and mass should be numbers and value of hair color shouldn't contain digits.";
  }
};

const validateInputs = () => {
  const areInputsEmpty = name.value !== "" && height.value !== "" && mass.value !== "" && hairColor.value !== "";
  const areNameValid = name.value !== "";
  const areHeightValid = height.value !== "" && height.value.split("").every((char) => !isNaN(Number(char)));
  const areMassValid = mass.value !== "" && mass.value.split("").every((char) => !isNaN(Number(char)));
  const areHairColorValid = hairColor.value !== "" && hairColor.value.split("").every((char) => isNaN(Number(char)));

  return areInputsEmpty && areNameValid && areHeightValid && areMassValid && areHairColorValid;
};

const deletePerson = (): void => {
  if (name.value !== "") {
    emit("changePeopleList", name.value);
    closeModal();
  } else {
    validationText.value = "Your input is invalid. It shouldn't be empty.";
  }
};

const closeModal = (): void => {
  name.value = "";
  height.value = "";
  mass.value = "";
  hairColor.value = "";
  validationText.value = "";
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
  padding: 34px;
  background-color: white;
}

.modal input {
  margin-right: 16px;
  border: 1px solid black;
  border-radius: 4px;
  padding: 2px;
}

.modal .invalid {
  border: 1px solid indianred;
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

.add-validation, .delete-validation {
  font-size: 12px;
  color: indianred;
  margin-top: 8px;
  align-self: start;
}

.delete-validation {
  margin: 0 0 8px 0;
  align-self: center;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
