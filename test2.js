const createStr = str1 => str2 => str1 + '//' + str2
const createStr2 = str1 => str2 => str1 + str2

function createMyAppString(appStringGenerator) {
  return appStringGenerator(
    Math.random()
  )(
    Math.random()
  )
}

console.log(
  createMyAppString(createStr),
  '\n',
  createMyAppString(createStr2),
)
