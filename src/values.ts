export type Values = {
  title1: string
  title2: string
  label1: string
  placeholder1: string
  label2: string
  placeholder2: string
  label3: string
  placeholder3: string
  label4: string
  placeholder4: string
  buttonText: string
}

export const valuesDefault: Readonly<Values> = Object.freeze({
  title1: 'Application List',
  title2: 'Register Application',
  label1: "Name",
  placeholder1: "Please enter application name",
  label2: "Type",
  placeholder2: "Please enter application type",
  label3: "Subscription Key",
  placeholder3: "Please enter your subscription key",
  label4: "Link Key",
  placeholder4: "Please enter organisation's link key (optional)",
  buttonText: 'Register Now',
})
