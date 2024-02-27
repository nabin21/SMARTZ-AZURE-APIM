<style src="../../styles/app.scss"></style>

<template>
  <applicationList ref="applicationList" />
  <h1 class="section-title">{{ configs.title2 }}</h1>
  <div class="flex-columns-container register-app-form">
    <div class="form-group required" :class="{ 'has-warning': warning.name }">
      <label for="name" class="form-label">{{ configs.label1 }}</label>
      <input id="name" class="form-control" name="name" :placeholder="configs.placeholder1" v-model="form.name"
        @blur="applicationNameChanged" />
      <div v-if="warning.name" class="warning-message">Application name is required!</div>
    </div>
    <div class="form-group required" :class="{ 'has-warning': warning.type }">
      <label for="type" class="form-label">{{ configs.label2 }}</label>
      <input id="type" class="form-control" name="type" :placeholder="configs.placeholder2" v-model="form.type"
        @blur="applicationTypeChanged" />
      <div v-if="warning.type" class="warning-message">Application type is required!</div>
    </div>
    <div class="form-group">
      <label for="linkKey" class="form-label">{{ configs.label3 }}</label>
      <input id="linkKey" class="form-control" name="linkKey" :placeholder="configs.placeholder3" v-model="form.linkKey" />
    </div>
    <div class="form-group text-center">
      <button class="button button-primary submit-button" @click="submit" :disabled="loading">
        <span v-if="loading" class="spinner"></span>
        <span v-else>{{ configs.buttonText }}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { getValues } from "@azure/api-management-custom-widgets-tools"
import { valuesDefault } from "../../values"
import { useToast } from "vue-toastification";
import applicationList from "./applicationList.vue";
import api from "../../api"

export default {
  data() {
    return {
      configs: {
        title1: '',
        title2: '',
        label1: '',
        placeholder1: '',
        label2: '',
        placeholder2: '',
        label3: '',
        placeholder3: '',
        buttonText: '',
      },
      form: {
        name: null,
        type: null,
        linkKey: null
      },
      loading: false,
      warning: {
        name: false,
        type: false
      }
    }
  },

  components: {
    applicationList
  },

  inject: ["secretsPromise", "requestPromise"],

  async mounted(): Promise<void> {
    this.configs = getValues(valuesDefault)
  },

  methods: {
    applicationNameChanged() {
      this.warning.name = !this.form.name
    },
    applicationTypeChanged() {
      this.warning.type = !this.form.type
    },
    submit() {
      const toast = useToast();
      if (!this.form.name || !this.form.type) {
        this.warning = {
          name: !this.form.name,
          type: !this.form.type
        }
        return;
      }
      this.loading = true
      api.registerApplication({
        Name: this.form.name,
        Type: this.form.type,
        LinkKey: this.form.linkKey
      }, '65b883e14634610a882015cf').then((response) => {
        this.loading = false
        toast.success('Registration success')
        this.resetForm()
        this.$refs.applicationList.getList()
      }).catch(() => {
        this.loading = false
        toast.error('Registration failed')
      })
    },
    resetForm() {
      this.form = {
        name: null,
        type: null,
        linkKey: null
      }
    }
  }
}
</script>
