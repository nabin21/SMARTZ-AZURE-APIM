<style src="../../styles/app.scss"></style>

<template>
    <h1 class="section-title">{{ title }}</h1>
    <EasyDataTable :headers="headers" :items="items" :rows-per-page="10" :loading="loading" :hide-rows-per-page="true"
        class="application-list">
        <template #item-Name="{ Name, Organisations }">
            <span class="application-name">{{ Name }}</span>
            <Popper :hover="true" class="poper">
                <svg t="1708941334668" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="1513" width="16" height="16" fill="#a7a7a7">
                    <path
                        d="M925.928 337.299c-22.574-53.371-54.884-101.295-96.031-142.443-41.147-41.148-89.072-73.458-142.442-96.032C632.182 75.446 573.487 63.593 513 63.593S393.818 75.446 338.546 98.824c-53.371 22.574-101.295 54.883-142.443 96.031s-73.458 89.073-96.031 142.443C76.694 392.571 64.84 451.265 64.84 511.752c0 60.487 11.854 119.181 35.232 174.454 22.574 53.37 54.883 101.295 96.031 142.443 41.148 41.147 89.072 73.457 142.443 96.031 55.272 23.378 113.966 35.231 174.454 35.231s119.182-11.854 174.454-35.231c53.37-22.574 101.295-54.884 142.442-96.031 41.147-41.148 73.457-89.073 96.031-142.443 23.378-55.272 35.231-113.967 35.231-174.454 0.001-60.487-11.852-119.181-35.23-174.453zM562.707 774.763c0 22.227-5.283 39.015-15.85 50.394-10.567 11.379-23.978 17.084-40.234 17.084s-29.468-5.837-39.621-17.483c-10.168-11.645-15.244-28.315-15.244-49.995V457.368c0-21.946 5.076-38.468 15.244-49.581 10.153-11.113 23.365-16.67 39.621-16.67s29.668 5.557 40.234 16.67c10.567 11.113 15.85 26.557 15.85 46.33v320.646z m-16.256-449.677c-10.84 9.621-23.712 14.424-38.609 14.424-15.443 0-28.648-4.744-39.628-14.217-10.966-9.488-16.456-22.906-16.456-40.242 0-15.709 5.623-28.655 16.87-38.808 11.239-10.168 24.31-15.237 39.214-15.237 14.357 0 27.089 4.596 38.202 13.803 11.106 9.222 16.663 22.626 16.663 40.242 0 17.07-5.424 30.415-16.256 40.035z"
                        p-id="1514"></path>
                </svg>
                <template #content>
                    <div class="poper-content">
                        <div class="title">Associated Organizations:</div>
                        <div v-if="Organisations.length">
                            <div class="org-item" v-for="item in Organisations">{{ item.Name }}</div>
                        </div>
                        <div class="no-data" v-else>
                            No Organisations
                        </div>
                    </div>
                </template>
            </Popper>
        </template>
        <template #item-Key="{ AppId, Key, ShowKey }">
            <div v-if="ShowKey" @click="toogleShowKey(AppId)">{{ Key }} <span class="text-a">hidden</span></div>
            <div v-else @click="toogleShowKey(AppId)">****** <span class="text-a">show</span></div>
        </template>
        <template #item-Action="{ AppId }">
            <button class="button button-primary small-button" style="margin-right: 5px;"
                @click.stop="linkOrgnisation(AppId)">
                Link Organisation
            </button>
            <button class="button button-danger small-button" @click.stop="removeApp(AppId)">
                Remove Application
            </button>
        </template>
    </EasyDataTable>
</template>

<script lang="ts">
import { getValues } from "@azure/api-management-custom-widgets-tools"
import { valuesDefault } from "../../values"
import Swal from 'sweetalert2'
import { useToast } from "vue-toastification";
import Popper from "vue3-popper";
import api from "../../api"

interface Item {
    AppId: string;
    Name: string;
    Type: string;
    Key: string;
    Action: string;
    ShowKey: boolean;
    Organisations: Array<{
        OrganisationId: string;
        Name: string;
    }>;
}

export default {
    data() {
        return {
            loading: false,
            title: '',
            headers: [
                { text: "Application ID", value: "AppId" },
                { text: "Application Name", value: "Name" },
                { text: "Application Type", value: "Type" },
                { text: "Application Key", value: "Key" },
                { text: "Action", value: "Action" }
            ],
            items: [] as Item[],
        }
    },
    props: {
        userId: {
            type: String,
            required: true,
            default: ''
        }
    },
    components: {
        Popper
    },
    async mounted(): Promise<void> {
        let configs = getValues(valuesDefault)
        this.title = configs.title1
        this.getList()
    },
    methods: {
        getList() {
            this.loading = true
            api.getApplications(this.userId).then((response) => {
                this.loading = false
                if (response.data.success) {
                    this.items = response.data.data.map((item: any) => {
                        return {
                            ...item,
                            ShowKey: false
                        }
                    })
                } else {
                    this.items = []
                    useToast().error(response.data.msg)
                }
            }).catch(() => {
                this.loading = false
                useToast().error('OOps, something went wrong')
            })
        },
        toogleShowKey(id: any) {
            this.items = this.items.map(item => {
                return {
                    ...item,
                    ShowKey: item.AppId === id ? !item.ShowKey : item.ShowKey
                }
            })
        },
        linkOrgnisation(id: any) {
            Swal.fire({
                title: "Link Organisation",
                input: "text",
                inputAttributes: {
                    autocapitalize: "off",
                    placeholder: `Please enter organisation's link key`
                },
                showCancelButton: true,
                confirmButtonText: "Link",
                showLoaderOnConfirm: true,
                preConfirm: async (linkKey) => {
                    try {
                        const response = await api.linkOrganisation({
                            AppId: id,
                            LinkKey: linkKey
                        }, this.userId);
                        if (!response.data.success) {
                            return Swal.showValidationMessage(`${response.data.msg}`);
                        } else {
                            this.getList()
                        }
                        return response.data;
                    } catch (error) {
                        Swal.showValidationMessage(`
                        Request failed: ${error}
                    `);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    const toast = useToast()
                    toast.success('Link success')
                }
            });
        },
        removeApp(id: any) {
            Swal.fire({
                title: "Are you sure?",
                text: "You're about to remove this application!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, remove it!",
                cancelButtonText: "No, cancel please!",
                showLoaderOnConfirm: true,
                allowOutsideClick: () => !Swal.isLoading(),
                preConfirm: () => {
                    return api.removeApplication(id, this.userId);
                },
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.getList()
                    }
                })
                .catch((error) => {
                    Swal.showValidationMessage(`Request failed: ${error.data.message}`);
                    Swal.hideLoading();
                });
        }
    }
}
</script>
