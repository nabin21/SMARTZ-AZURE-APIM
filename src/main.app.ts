import {createApp} from "vue"
import {askForSecrets} from "@azure/api-management-custom-widgets-tools"
import App from "./components/app/index.vue"
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const secretsPromise = askForSecrets("app")
const requestPromise = new Promise(async (resolve) => {
  const secrets = await secretsPromise
  resolve((url: string) => fetch(
    `${secrets.managementApiUrl}${url}?api-version=${secrets.apiVersion}`,
    secrets.token ? {headers: {Authorization: secrets.token}} : undefined,
  ))
})

const app = createApp(App)
  .provide("secretsPromise", secretsPromise)
  .provide("requestPromise", requestPromise)
  
app.use(Toast, {});
app.component('EasyDataTable', Vue3EasyDataTable);
app.mount("#root")
