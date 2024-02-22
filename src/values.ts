export type Values = {
  label1: string
  placeholder1: string
  label2: string
  placeholder2: string
  buttonText: string
  actionUrl: string
}

export const valuesDefault: Readonly<Values> = Object.freeze({
  label1: "Name",
  placeholder1: "Please enter application name",
  label2: "Type",
  placeholder2: "Please enter application type",
  buttonText: 'Register Now',
  actionUrl: "https://devapp.smartzhealth.com/api/tapplication/register",
})
