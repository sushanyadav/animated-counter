export function isNumeric(str: string | number) {
  return (
    !isNaN(str as number) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str as string))
  ); // ...and ensure strings of whitespace fail
}
