export type Values = {
  title: string
  label1: string
  label2: string
  placeholder: string
  actionUrl: string
}

export const valuesDefault: Readonly<Values> = Object.freeze({
  title: "Register Application",
  label1: "Name",
  label2: "Type",
  placeholder: "Please select application type",
  actionUrl: "https://httpbin.org/post",
})
