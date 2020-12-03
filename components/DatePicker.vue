<template lang="pug">
  .date-picker
    .days-wrapper.bg-secondary(v-if="isOpen")
      .months
        span(@click="prevMonth") &lt;
        div {{months[selectedMonth-1]}} {{selectedYear}}
        span(@click="nextMonth") &gt;
      .days
        .day Mo
        .day Tu
        .day We
        .day Th
        .day Fr
        .day Sa
        .day Su
        div(v-for="emptyDay of (startsWith-1)" :key="-emptyDay")
        .day(v-for="day of countOfDays" :key="day" @click="changeCurrentDate(day)")
          span.currentDay(v-if="day == currentDay && currentMonth === selectedMonth") {{day}}
          span(v-else) {{day}}
    button.current-date.btn.btn-info(@click="isOpen = !isOpen") {{currentDate}}
    input(v-bind:value="value" v-on:input="updateValue($event.target.value)" hidden)
</template>

<script>
export default {
  name: "DatePicker",
  props: {
    // Значение даты передаваемое с директивой v-model
    value: {
      type: String,
    },
  },
  data() {
    return {
      // Открытие и закрытие календаря
      isOpen: false,

      // Данные по выбраной дате
      currentDay: "",
      currentYear: "",
      currentMonth: "",

      // Данные по просматриваемой сетке календаря (открытые месяц и год в календаре)
      selectedMonth: "",
      selectedYear: "",

      // Список месяцев для нахождения порядкового номера нужного месяца(индекс месяца в массиве + 1)
      months: [
        "January",
        "Februrary",
        "March",
        "April",
        "May",
        "June",
        "Jule",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],

      // С какого дня недели начинается календарь (По умолчанию выбрано значение для декабря 2020. От него вычисляются остальные.)
      startsWith: 2,
    };
  },
  mounted() {
    // Получаем данные о текущей дате
    // let date = new Date(this.value);

    // let date = this.value
    // this.currentDay = date.getDate();
    // this.currentMonth = this.selectedMonth = date.getMonth() + 1;
    // this.currentYear = this.selectedYear = date.getFullYear();
    let date = this.value.split('/')
    this.currentDay = date[0];
    this.currentMonth = this.selectedMonth = date[1];
    this.currentYear = this.selectedYear = date[2];

  },
  computed: {
    currentDate() {
      return this.currentDay + "/" + this.currentMonth + "/" + this.currentYear;
    },
    // Определяем количество дней исходя из месяца
    countOfDays() {
      if (
        this.selectedMonth === 4 ||
        this.selectedMonth === 6 ||
        this.selectedMonth === 9 ||
        this.selectedMonth === 11
      ) {
        return 30;
      } else if (this.selectedMonth === 2) {
        return 28; // Февраль
      } else {
        return 31;
      }
    },
  },
  methods: {
    // Переход на следующий месяц в календаре
    prevMonth() {
      // Сначала меняем день недели, с которого будет предыдущий следующий месяц,
      // в зависимости от количества дней в текущем просматриваемом месяце
      if (this.countOfDays === 31) {
        switch (this.startsWith) {
          case 1:
            this.startsWith = 6;
            break;
          case 2:
            this.startsWith = 7;
            break;
          default:
            this.startsWith -= 2;
            break;
        }
      } else if (this.countOfDays === 30) {
        switch (this.startsWith) {
          case 1:
            this.startsWith = 5;
            break;
          case 2:
            this.startsWith = 6;
            break;
          case 3:
            this.startsWith = 7;
            break;
          default:
            this.startsWith -= 3;
            break;
        }
      }
      // Меняем месяц и при необходимости год
      this.selectedMonth--;
      if (this.selectedMonth < 1) {
        this.selectedMonth = 12;
        this.selectedYear--;
      }
    },
    // Переход на предыдущий месяц в календаре
    nextMonth() {
      // Сначала меняем день недели, с которого будет начинаться следующий месяц,
      // в зависимости от количества дней в текущем просматриваемом месяце
      // (в случае февраля (countOfDays === 28), день остается таким же)
      if (this.countOfDays === 31) {
        switch (this.startsWith) {
          case 5:
            this.startsWith = 1;
            break;
          case 6:
            this.startsWith = 2;
            break;
          case 7:
            this.startsWith = 3;
            break;
          default:
            this.startsWith += 3;
            break;
        }
      } else if (this.countOfDays === 30) {
        switch (this.startsWith) {
          case 6:
            this.startsWith = 1;
            break;
          case 7:
            this.startsWith = 2;
            break;
          default:
            this.startsWith += 2;
            break;
        }
      }
      // Меняем месяц и при необходимости год
      this.selectedMonth++;
      if (this.selectedMonth > 12) {
        this.selectedMonth = 1;
        this.selectedYear++;
      }
    },

    // Меняем выбранную дату
    changeCurrentDate(day) {
      this.currentDay = day;
      this.currentMonth = this.selectedMonth;
      this.currentYear = this.selectedYear;
    },

    // Для работы директивы v-model
    updateValue: function (value) {
      this.$emit("input", value);
    },
  },
  watch: {
    currentDate() {
      this.$emit("input", this.currentDate);
    }
  }
};
</script>

<style lang="stylus">
  .date-picker 
    position: fixed;
    right: 100px;
    bottom: 20px;

  .current-date 
    width: 200px;
    height: 60px;

  .days-wrapper 
    width: 200px;
    height: 200px;
    color: #fff;

  .months 
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 1px solid #fff;

    span 
      cursor: pointer;

  .days 
    display: grid;
    grid-template-columns: repeat(7, 1fr);

  .day 
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

  .day:hover 
    background: #aeaeae;

  .currentDay 
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: #17a2b8;
</style>