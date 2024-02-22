export type Values = {
  title: string
  label1: string
  placeholder1: string
  label2: string
  placeholder2: string
  actionUrl: string
}

export const valuesDefault: Readonly<Values> = Object.freeze({
  title: "Register Application",
  label1: "Name",
  placeholder1: "Please select application name",
  label2: "Type",
  placeholder2: "Please select application type",
  actionUrl: "https://devapp.smartzhealth.com/api/tapplication/register",
})
