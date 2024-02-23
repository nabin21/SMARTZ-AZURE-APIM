<style lang="scss" src="../../styles/editor.scss"></style>

<template>
  <div class="form">
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
      <label class="form-label">Label 3</label>
      <input type="text" class="form-control" v-model="label2" :placeholder="valuesDefault.label3" />
    </div>
    <div class="form-group">
      <label class="form-label">Placeholder 3</label>
      <input type="text" class="form-control" v-model="placeholder3"
             :placeholder="valuesDefault.placeholder3" />
    </div>
    <div class="form-group">
      <label class="form-label">Button Text</label>
      <input type="text" class="form-control" v-model="buttonText" />
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
      label1: "Name",
      placeholder1: "Please enter application name",
      label2: "Type",
      placeholder2: "Please enter application type",
      label3: "Link Key",
      placeholder3: "Please enter link key (optional)",
      buttonText: 'Register Now',
      actionUrl: "https://devapp.smartzhealth.com/api/tapplication/register",
      valuesDefault
    }
  },

  async mounted(): Promise<void> {
    this.onChange = buildOnChange<Values>()

    const editorData = getEditorValues<Values>()

    this.label1 = editorData.label1
    this.placeholder1 = editorData.placeholder1
    this.label2 = editorData.label2
    this.placeholder2 = editorData.placeholder2
    this.label3 = editorData.label3
    this.placeholder3 = editorData.placeholder3
    this.buttonText = editorData.buttonText
    this.actionUrl = editorData.actionUrl
  },

  watch: {
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
    label3(newValue: string): void {
      this.onChange({label3: newValue})
    },
    placeholder3(newValue: string): void {
      this.onChange({placeholder3: newValue})
    },
    buttonText(newValue: string): void {
      this.onChange({buttonText: newValue})
    },
    actionUrl(newValue: string): void {
      this.onChange({actionUrl: newValue})
    },
  },
}
</script>
