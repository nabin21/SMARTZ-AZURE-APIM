<style src="../../styles/app.scss"></style>

<template>
  <form :action="actionUrl" method="post" target="_blank"
        class="flex-columns-container register-app-form">
    <div class="title">{{ title }}</div>
    <div class="form-group">
      <label for="email" class="form-label">{{ label1 }}</label>
      <input id="email" type="email" class="form-control" name="email" placeholder="Please enter application name"
             v-model="applicationName" />
    </div>
    <div class="form-group height-fill flex-columns-container">
      <label for="message" class="form-label">{{ label2 }}</label>
      <input id="message" class="form-control" name="message" :placeholder="placeholder" />
    </div>
    <div class="form-group">
      <button type="submit" class="button button-primary">Submit</button>
    </div>
  </form>
</template>

<script lang="ts">
import {getValues} from "@azure/api-management-custom-widgets-tools"
import {valuesDefault} from "../../values"

export default {
  data() {
    return {
      title: null,
      label1: null,
      label2: null,
      placeholder: null,
      actionUrl: null,
      applicationName: null,
      applicationType: null
    }
  },

  inject: ["secretsPromise", "requestPromise"],

  async mounted(): Promise<void> {
    const editorData = getValues(valuesDefault)
    this.title = editorData.title
    this.label1 = editorData.label1
    this.label2 = editorData.label2
    this.placeholder = editorData.placeholder
    this.actionUrl = editorData.actionUrl
  },
}
</script>
