<style src="../../styles/app.scss"></style>

<template>
    <h1 class="section-title">{{ title }}</h1>
    <EasyDataTable :headers="headers" :items="items" @click-row="showRow">
        <template #item-key="{ id, key, showKey }">
            <div v-if="showKey" @click="toogleShowKey(id)">{{ key }} <span class="text-a">hidden</span></div>
            <div v-else @click="toogleShowKey(id)">****** <span class="text-a">show</span></div>
        </template>
    </EasyDataTable>
</template>

<script lang="ts">
import { getValues } from "@azure/api-management-custom-widgets-tools"
import { valuesDefault } from "../../values"
import type { Header, Item, ClickRowArgument } from "vue3-easy-data-table";

export default {
    data() {
        return {
            title: '',
            headers: [
                { text: "Application ID", value: "id" },
                { text: "Application Name", value: "name" },
                { text: "Application Type", value: "type" },
                { text: "Application Key", value: "key" },
            ],
            items: [
                { id: 1, name: "Application 1", type: "APP", key: '123456', showKey: false },
                { id: 2, name: "Application 2", type: "APP", key: '123456', showKey: false },
                { id: 3, name: "Application 3", type: "APP", key: '123456', showKey: false },
                { id: 4, name: "Application 4", type: "WEB", key: '123456', showKey: false },
            ],
        }
    },
    async mounted(): Promise<void> {
        let configs = getValues(valuesDefault)
        this.title = configs.title1
    },
    methods: {
        toogleShowKey(id: any) {
            this.items = this.items.map(item => {
                return {
                    ...item,
                    showKey: item.id === id ? !item.showKey : item.showKey
                }
            })
        },
        showRow(item: ClickRowArgument) {
            console.log(item)
        }
    }
}
</script>
