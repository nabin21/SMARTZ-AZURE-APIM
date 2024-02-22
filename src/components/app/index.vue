<style src="../../styles/app.scss"></style>

<template>
  <div class="flex-columns-container register-app-form">
    <div class="form-group required" :class="{ 'has-warning': warning.name }">
      <label for="name" class="form-label">{{ configs.label1 }}</label>
      <input id="name" class="form-control" name="name" :placeholder="configs.placeholder1" v-model="applicationName"
        @blur="applicationNameChanged" />
      <div v-if="warning.name" class="warning-message">Application name is required!</div>
    </div>
    <div class="form-group required" :class="{ 'has-warning': warning.type }">
      <label for="type" class="form-label">{{ configs.label2 }}</label>
      <input id="type" class="form-control" name="type" :placeholder="configs.placeholder2" v-model="applicationType"
        @blur="applicationTypeChanged" />
      <div v-if="warning.type" class="warning-message">Application type is required!</div>
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
import axios from 'axios';
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      configs: {
        label1: '',
        placeholder1: '',
        label2: '',
        placeholder2: '',
        buttonText: '',
        actionUrl: '',
      },
      applicationName: null,
      applicationType: null,
      loading: false,
      warning: {
        name: false,
        type: false
      }
    }
  },

  inject: ["secretsPromise", "requestPromise"],

  async mounted(): Promise<void> {
    this.configs = getValues(valuesDefault)
  },

  methods: {
    applicationNameChanged() {
      this.warning.name = !this.applicationName
    },
    applicationTypeChanged() {
      this.warning.type = !this.applicationType
    },
    submit() {
      const toast = useToast();
      if (!this.applicationName || !this.applicationType) {
        this.warning = {
          name: !this.applicationName,
          type: !this.applicationType
        }
        return;
      }
      this.loading = true
      axios.post(this.configs.actionUrl, {
        Name: this.applicationName,
        Type: this.applicationType
      }, {
        headers: {
          'x-context-user': '65b883e14634610a882015cf'
        }
      }).then((response) => {
        this.loading = false
        toast.success('Registration success');
      }).catch(() => {
        this.loading = false
        toast.error('Registration failed');
      })
    }
  }
}
</script>
