<template>
  <div>
    <div class="page-subtitle">
      <h4>Редактировать</h4>
    </div>
    <form>
      <div class="input-field">
        <select ref="catSelect">
          {{categories}}
          <option
            v-for="item in categories"
            :key="item.id"
            :value="item.id"
          >{{ item.title }}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <div class="input-field">
        <input type="text" id="name" />
        <label for="name">Название</label>
        <span class="helper-text invalid">TITLE</span>
      </div>

      <div class="input-field">
        <input id="limit" type="number" />
        <label for="limit">Лимит</label>
        <span class="helper-text invalid">LIMIT</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['categories'],
  data: () => ({
    select: null
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.catSelect);
  },
  beforeDestroy() {
    this.select.destroy()
  }
};
</script>

<style>
</style>
