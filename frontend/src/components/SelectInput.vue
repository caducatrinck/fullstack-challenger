<template>
  <div class="w-full max-w-xs mx-auto mt-10">
    <div class="relative">
      <div
        @click="toggleDropdown"
        class="w-full bg-white border border-gray-300 rounded shadow-sm p-2 flex items-center justify-between cursor-pointer"
      >
        <span class="text-gray-700">{{
          selectedOption ? selectedOption.label : 'Select an option'
        }}</span>
        <svg
          class="w-4 h-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <transition name="dropdown">
        <div
          v-if="isOpen"
          class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg"
        >
          <ul>
            <li
              v-for="option in options"
              :key="option.value"
              @click="selectOption(option)"
              class="p-2 cursor-pointer hover:bg-blue-100"
            >
              {{ option.label }}
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      selectedOption: null,
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
        { value: 'option4', label: 'Option 4' }
      ]
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isOpen = false;
    }
  }
};
</script>

<style>
/* Add Tailwind CSS transition classes */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.3s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
}
</style>
