<style lang="scss" src="../../styles/editor.scss"></style>

<template>
  <div class="form">
    <div class="form-group">
      <label class="form-label">Title 1</label>
      <input type="text" class="form-control" v-model="title1" :placeholder="valuesDefault.title1" />
    </div>
    <div class="form-group">
      <label class="form-label">Title 2</label>
      <input type="text" class="form-control" v-model="title2"
             :placeholder="valuesDefault.title2" />
    </div>
    <div class="form-group">
      <label class="form-label">Label 1</label>
      <input type="text" class="form-control" v-model="label1" :placeholder="valuesDefault.label1" />
    </div>
    <div class="form-group">
      <label class="form-label">Placeholder 1</label>
      <input type="text" class="form-control" v-model="placeholder1"
             :placeholder="valuesDefault.placeholder1" />
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
      <input type="text" class="form-control" v-model="label3" :placeholder="valuesDefault.label3" />
    </div>
    <div class="form-group">
      <label class="form-label">Placeholder 3</label>
      <input type="text" class="form-control" v-model="placeholder3"
             :placeholder="valuesDefault.placeholder3" />
    </div>
    <div class="form-group">
      <label class="form-label">Label 4</label>
      <input type="text" class="form-control" v-model="label4" :placeholder="valuesDefault.label4" />
    </div>
    <div class="form-group">
      <label class="form-label">Placeholder 4</label>
      <input type="text" class="form-control" v-model="placeholder4"
             :placeholder="valuesDefault.placeholder4" />
    </div>
    <div class="form-group">
      <label class="form-label">Button Text</label>
      <input type="text" class="form-control" v-model="buttonText" :placeholder="valuesDefault.buttonText" />
    </div>
  </div>
</template>

<script lang="ts">
import {buildOnChange, getEditorValues} from "@azure/api-management-custom-widgets-tools"
import {Values, valuesDefault} from "../../values"

export default {
  data() {
    return {
      title1: 'Application List',
      title2: 'Register Application',
      label1: "Name",
      placeholder1: "Please enter application name",
      label2: "Type",
      placeholder2: "Please enter application type",
      label3: "Subscription Key",
      placeholder3: "Please enter your subscription key",
      label4: "Link Key",
      placeholder4: "Please enter organization's link key (optional)",
      buttonText: 'Register Now',
      valuesDefault
    }
  },

  async mounted(): Promise<void> {
    this.onChange = buildOnChange<Values>()

    const editorData = getEditorValues<Values>()

    this.title1 = editorData.title1
    this.title2 = editorData.title2
    this.label1 = editorData.label1
    this.placeholder1 = editorData.placeholder1
    this.label2 = editorData.label2
    this.placeholder2 = editorData.placeholder2
    this.label3 = editorData.label3
    this.placeholder3 = editorData.placeholder3
    this.label4 = editorData.label4
    this.placeholder4 = editorData.placeholder4
    this.buttonText = editorData.buttonText
  },

  watch: {
    title1(newValue: string): void {
      this.onChange({title1: newValue})
    },
    title2(newValue: string): void {
      this.onChange({title2: newValue})
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
    label3(newValue: string): void {
      this.onChange({label3: newValue})
    },
    placeholder3(newValue: string): void {
      this.onChange({placeholder3: newValue})
    },
    label4(newValue: string): void {
      this.onChange({label4: newValue})
    },
    placeholder4(newValue: string): void {
      this.onChange({placeholder4: newValue})
    },
    buttonText(newValue: string): void {
      this.onChange({buttonText: newValue})
    },
  },
}
</script>
