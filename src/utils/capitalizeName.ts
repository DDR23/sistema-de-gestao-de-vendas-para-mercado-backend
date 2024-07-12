//FUNÇÃO QUE FAZ O CAPITALIZE 
export default function capitalize(str: string) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}
