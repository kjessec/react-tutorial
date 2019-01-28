function helloworld(props) {
  const { yes, no, myCurrentState } = props
  console.log(
    myCurrentState ? yes : no
  )
}

const yes = 'yes'
const no = 'no'

helloworld({ yes, no, myCurrentState: true })
helloworld({ yes, no, myCurrentState: false })
