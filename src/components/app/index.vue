<style src="../../styles/app.scss"></style>

<template>
  <div class="flex-columns-container register-app-form">
    <div class="title">{{ configs.title }}</div>
    <div class="form-group">
      <label for="name" class="form-label">{{ configs.label1 }}</label>
      <input id="name" class="form-control" name="name" :placeholder="configs.placeholder1"
             v-model="applicationName" />
    </div>
    <div class="form-group height-fill flex-columns-container">
      <label for="type" class="form-label">{{ configs.label2 }}</label>
      <input id="type" class="form-control" name="type" :placeholder="configs.placeholder2" v-model="applicationType" />
    </div>
    <div class="form-group">
      <button type="submit" class="button button-primary" @click="submit">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">
import {getValues} from "@azure/api-management-custom-widgets-tools"
import {valuesDefault} from "../../values"
import axios from 'axios';

export default {
  data() {
    return {
      configs: {
        title: '',
        label1: '',
        placeholder1: '',
        label2: '',
        placeholder2: '',
        actionUrl: '',
      },
      applicationName: null,
      applicationType: null
    }
  },

  inject: ["secretsPromise", "requestPromise"],

  async mounted(): Promise<void> {
    this.configs = getValues(valuesDefault)
  },

  methods: {
    submit() {
      axios.post(this.configs.actionUrl, {
        Name: this.applicationName,
        Type: this.applicationType
      }, {
        headers: {
          'x-context-user': '65b883e14634610a882015cf'
        }
      }).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>
