const {deployNodeJS} = require("@azure/api-management-custom-widgets-tools")

const serviceInformation = {
	"resourceId": "subscriptions/b6c083b7-9073-461d-8fc6-8b8bf82e100b/resourceGroups/SmartzAPPWestEurope/providers/Microsoft.ApiManagement/service/smartz-api",
	"managementApiEndpoint": "https://management.azure.com"
}
const name = "cw-register-application-form"
const fallbackConfigPath = "./static/config.msapim.json"
const config = {
	"interactiveBrowserCredentialOptions": {
		"redirectUri": "http://localhost:1337"
	}
}

deployNodeJS(serviceInformation, name, fallbackConfigPath, config)
