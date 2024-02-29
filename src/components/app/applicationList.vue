<style src="../../styles/app.scss"></style>

<template>
    <h1 class="section-title">{{ title }}</h1>
    <EasyDataTable :headers="headers" :items="items" :rows-per-page="10" :loading="loading" :hide-rows-per-page="true"
        class="application-list">
        <template #item-Name="{ Name, Organisations }">
            <div style="display: flex; align-items: center;">
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
            </div>
        </template>
        <template #item-Key="{ AppId, Key, ShowKey }">
            <div v-if="ShowKey" class="key-box">{{ Key }} <span class="text-a" @click="toogleShowKey(AppId)">hidden</span></div>
            <div v-else @click="toogleShowKey(AppId)">****** <span class="text-a">show</span></div>
        </template>
        <template #item-Action="{ AppId }">
            <button class="button operator-button" style="margin-right: 5px;"
                @click.stop="linkOrgnisation(AppId)">
                <svg t="1709121353253" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4235" width="14" height="14"><path d="M331.502964 331.496564c-11.110365 11.110365-11.110365 29.107109 0 40.191874l321.816594 321.790994c11.110365 11.161565 29.107109 11.110365 40.191874 0.0256 11.110365-11.110365 11.110365-29.081509 0-40.191874L371.720439 331.496564C360.610073 320.411799 342.61333 320.411799 331.502964 331.496564z" p-id="4236" fill="#ffffff"></path><path d="M96.2141 59.958213 59.990213 96.2077c-79.97415 79.97415-79.99975 209.637745 0 289.611895l126.719604 126.719604c62.668604 62.719804 155.749913 75.878163 231.602476 40.243074 0.281599-0.128 0.537598-0.230399 0.844797-0.332799 0.537598-0.255999 1.177596-0.486398 1.715195-0.742398-0.0512-0.128 0.0512 0.128 0 0 2.713592-1.356796 5.171184-3.07199 7.449577-5.350383 11.238365-11.238365 11.238365-29.491108 0-40.755073-9.036772-9.011172-22.24633-10.598367-33.049497-5.171184-0.0512-0.1536 0.0768 0.1536 0 0-56.575823 25.72792-125.849207 15.180753-172.364261-31.359902L103.433277 349.621308c-59.980613-60.006212-59.980613-157.234709 0-217.215321L132.386787 103.426877c59.980613-59.980613 157.234709-59.955013 217.215321 0l119.474827 119.474827c47.283052 47.257452 57.292621 117.810832 30.131106 174.847454 0 0 0.0256-0.0256 0 0-0.0768 0.204799 0.1024-0.204799 0 0 0.0512 0.0256-0.0256-0.0256 0 0-3.839988 10.239968-2.227193 22.707129 6.015981 30.950303 11.238365 11.238365 29.491108 11.263965 40.755073 0 2.303993-2.303993 4.377586-4.915185 5.759982-7.679976 0.1536 0.0256-0.179199-0.0256 0 0 37.196684-76.313361 24.217524-170.905066-39.167878-234.316068l-126.719604-126.719604C305.851844-19.990337 176.16265-19.990337 96.2141 59.958213z" p-id="4237" fill="#ffffff"></path><path d="M963.411389 927.155503l-36.249487 36.223887c-79.97415 79.97415-209.637745 79.97415-289.611895-0.0256l-126.719604-126.694004c-62.668604-62.668604-75.878163-155.775513-40.217474-231.602476 0.128-0.281599 0.230399-0.537598 0.332799-0.844797 0.255999-0.537598 0.511998-1.203196 0.742398-1.715195 0.128 0.0512-0.128-0.0512 0 0 1.356796-2.713592 3.07199-5.171184 5.350383-7.449577 11.238365-11.238365 29.491108-11.238365 40.780673 0 8.985572 9.011172 10.572767 22.220731 5.119984 33.049497 0.179199 0.0768-0.128-0.0768 0 0-25.72792 56.601423-15.155153 125.823607 31.385502 172.364261l119.474827 119.449227c60.006212 60.006212 157.234709 60.006212 217.215321 0l28.95351-28.95351c60.006212-60.006212 59.980613-157.234709 0-217.189721l-119.449227-119.474827c-47.283052-47.257452-117.810832-57.292621-174.847454-30.131106-0.0256 0 0.0256 0 0 0-0.204799 0.128 0.230399-0.0768 0 0-0.0256 0 0.0256 0.0256 0 0-10.239968 3.865588-22.707129 2.252793-30.950303-6.015981-11.238365-11.263965-11.238365-29.491108-0.0256-40.755073 2.303993-2.278393 4.889585-4.351986 7.705576-5.734382-0.0256-0.128 0.0256 0.179199 0 0 76.313361-37.222284 170.905066-24.217524 234.290468 39.167878l126.719604 126.719604C1043.359939 717.492158 1043.359939 847.181353 963.411389 927.155503z" p-id="4238" fill="#ffffff"></path></svg>
            </button>
            <button class="button operator-button danger" @click.stop="removeApp(AppId)">
                <svg t="1709121437438" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5258" width="14" height="14"><path d="M804.414 123.434h-156.903c-7.827-67.871-65.572-120.767-135.51-120.767-69.935 0-127.672 52.893-135.499 120.767h-156.911c-63.498 0-115.15 51.667-115.15 115.163v5.909c0 48.523 30.213 90.055 72.775 106.977v544.022c0 63.498 51.659 115.163 115.152 115.163h439.272c63.495 0 115.15-51.67 115.15-115.163v-544.02c42.559-16.924 72.775-58.456 72.775-106.977v-5.909c0-63.498-51.657-115.165-115.15-115.165zM512 57.282c39.777 0 72.978 28.51 80.324 66.151h-160.633c7.344-37.643 40.547-66.151 80.309-66.151zM792.174 895.504c0 33.385-27.163 60.55-60.537 60.55h-439.272c-33.374 0-60.537-27.167-60.537-60.55v-535.836h560.347v535.836zM864.948 244.505c0 33.385-27.163 60.55-60.537 60.55h-584.822c-33.374 0-60.537-27.165-60.537-60.55v-5.909c0-33.385 27.163-60.55 60.537-60.55h584.824c33.374 0 60.537 27.165 60.537 60.55v5.909zM365.594 886.209c15.082 0 27.307-12.23 27.307-27.305v-307.468c0-15.078-12.227-27.309-27.307-27.309s-27.307 12.232-27.307 27.309v307.468c-0.002 15.08 12.225 27.305 27.307 27.305zM512 886.209c15.082 0 27.309-12.23 27.309-27.305v-307.468c0-15.078-12.232-27.309-27.309-27.309-15.08 0-27.307 12.232-27.307 27.309v307.468c0 15.08 12.225 27.305 27.307 27.305zM658.406 886.209c15.08 0 27.305-12.23 27.305-27.305v-307.468c0-15.078-12.227-27.309-27.305-27.309-15.084 0-27.309 12.232-27.309 27.309v307.468c-0.002 15.08 12.23 27.305 27.309 27.305z" fill="#ffffff" p-id="5259"></path></svg>
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
                { text: "Action", value: "Action", width: 150 }
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
