<style lang="scss" src="../../styles/editor.scss"></style>

<template>
  <div class="form">
    <div class="form-group">
      <label class="form-label">Title</label>
      <input type="text" class="form-control" v-model="title" placeholder="Please enter title" />
    </div>
    <div class="form-group">
      <label class="form-label">Label 1</label>
      <input type="text" class="form-control" v-model="label1" :placeholder="valuesDefault.label1" />
    </div>
    <div class="form-group">
      <label class="form-label">Placeholder 1</label>
      <input type="text" class="form-control" v-model="placeholder1"
             :placeholder="valuesDefault.placeholder2" />
    </div>
    <div class="form-group">
      <label class="form-label">Label 2</label>
      <input type="text" class="form-control" v-model="label2" :placeholder="valuesDefault.label2" />
    </div>
    <div class="form-group">
      <label class="form-label">Placeholder 2</label>
      <input type="text" class="form-control" v-model="placeholder2"
             :placeholder="valuesDefault.placeholder2" />
    </div>
    <div class="form-group">
      <label class="form-label">Action URL</label>
      <input type="text" class="form-control" v-model="actionUrl"
             :placeholder="valuesDefault.actionUrl" />
    </div>
  </div>
</template>

<script lang="ts">
import {buildOnChange, getEditorValues} from "@azure/api-management-custom-widgets-tools"
import {Values, valuesDefault} from "../../values"

export default {
  data() {
    return {
      title: "Register Application",
      label1: "Name",
      placeholder1: "Please select application name",
      label2: "Type",
      placeholder2: "Please select application type",
      actionUrl: "https://httpbin.org/post",
      valuesDefault
    }
  },

  async mounted(): Promise<void> {
    this.onChange = buildOnChange<Values>()

    const editorData = getEditorValues<Values>()

    this.title = editorData.title
    this.label1 = editorData.label1
    this.placeholder1 = editorData.placeholder1
    this.label2 = editorData.label2
    this.placeholder2 = editorData.placeholder2
    this.actionUrl = editorData.actionUrl
  },

  watch: {
    title(newValue: string): void {
      this.onChange({title: newValue})
    },
    label1(newValue: string): void {
      this.onChange({label1: newValue})
    },
    placeholder1(newValue: string): void {
      this.onChange({placeholder1: newValue})
    },
    label2(newValue: string): void {
      this.onChange({label2: newValue})
    },
    placeholder2(newValue: string): void {
      this.onChange({placeholder2: newValue})
    },
    actionUrl(newValue: string): void {
      this.onChange({actionUrl: newValue})
    },
  },
}
</script>
